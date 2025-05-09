const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images from /uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Multer storage configuration (save file with unique name)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname); // e.g., 1715283722.png
    cb(null, uniqueName);
  }
});
const upload = multer({ storage }); // use this in routes

// Make upload available to routes
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// ✅ Routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders'); // ✅ Import orders route
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // ✅ Use orders route

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
