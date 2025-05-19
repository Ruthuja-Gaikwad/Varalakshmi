const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer'); // <-- Import multer here
const path = require('path');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

const ADMIN_EMAIL = 'varalakshmi@gmail.com';
const ADMIN_PASSWORD = 'vara731';

// Multer config (same as in server.js)
const uploadsDir = path.join(__dirname, '..', 'uploads');

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

// Admin login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  }

  return res.status(400).json({ error: 'Invalid credentials' });
});

// Admin dashboard
router.get('/dashboard', authenticateAdmin, (req, res) => {
  res.status(200).json({ message: `Welcome Admin: ${req.user.email}` });
});

// Get all products
router.get('/products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get all orders
// Get all orders
router.get('/orders', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders in admin route:", err);
    res.status(500).json({ 
      error: 'Failed to fetch orders', 
      details: err.message  // <-- Send exact error message for debugging
    });
  }
});

// Submit a new order with file upload
router.post('/orders', authenticateAdmin, upload.single('file'), async (req, res) => {
  try {
    const { name, contact, type, description } = req.body;
    const file = req.file ? req.file.filename : null;

    const newOrder = new Order({
      name,
      contact,
      type,
      description,
      file,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order submitted successfully', order: newOrder });
  } catch (error) {
    console.error('Order submission error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
