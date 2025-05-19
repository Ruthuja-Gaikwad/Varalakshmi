const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Create HTTP server for Socket.IO
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// ✅ CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(helmet());

// ✅ Adjust Content Security Policy (CSP)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'http://localhost:3000'],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      imgSrc: ["'self'", 'http://localhost:3000'], // Allow images from frontend
      connectSrc: ["'self'", 'http://localhost:3000'], // Allow API requests from frontend
    },
  })
);

// ✅ Adjust Cross-Origin Resource Policy (CORP)
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // Allow cross-origin resource sharing
  next();
});

// ✅ Handle socket connection
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.emit('welcome', 'Welcome to the server!');

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected:', socket.id);
  });
});

// ✅ Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// ✅ Serve static files from uploads folder with CORS headers
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin image loading
  }
}));

// ✅ Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg and .png files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Import Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const enquiryRoutes = require('./routes/enquiry');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

// ✅ Use Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);  // Updated to /api/admin
app.use('/api/contact', contactRoutes);

// ✅ Health check
app.get('/', (req, res) => {
  res.send('🟢 Server is running...');
});

// ✅ Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ filePath: fileUrl });
});

// ✅ MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
