// server/server.js (or index.js)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Import routes
const productRoutes = require('./routes/products');
const customOrderRoutes = require('./routes/customOrders');

const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or fallback to 5000
const MONGO_URI = process.env.MONGO_URI; // Use MongoDB URI from .env

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Varalakshmi Workshop API');
});

// Register routes
app.use('/api/products', productRoutes); // Products API route
app.use('/api/customOrders', customOrderRoutes); // Custom Orders API route

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
