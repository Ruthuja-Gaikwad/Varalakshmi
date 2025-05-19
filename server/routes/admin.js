const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticateAdmin } = require('../middleware/auth');  // import middleware

const router = express.Router();

const ADMIN_EMAIL = 'varalakshmi@gmail.com';
const ADMIN_PASSWORD = 'vara731';

// Admin login route (no auth needed here)
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

// Protected admin dashboard route
router.get('/dashboard', authenticateAdmin, (req, res) => {
  res.status(200).json({ message: `Welcome Admin: ${req.user.email}` });
});

// Protected route: get all products
router.get('/products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Protected route: get all orders
router.get('/orders', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
