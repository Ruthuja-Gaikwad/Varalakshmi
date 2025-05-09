const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const multer = require('multer');
const path = require('path');

// Multer setup (same as in server.js for file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// @POST /api/orders - Submit a new order
router.post('/', upload.single('file'), async (req, res) => {
  const { name, contact, type, description } = req.body;
  const file = req.file ? req.file.filename : null;

  try {
    const newOrder = new Order({ name, contact, type, description, file });

    await newOrder.save();

    // Return the order object with the image URL included
    const orderWithImageUrl = {
      ...newOrder.toObject(),
      imageUrl: file ? `/uploads/${file}` : null,
    };

    res.status(201).json(orderWithImageUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit order' });
  }
});

// @GET /api/orders - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    // Add imageUrl to each order's data
    const ordersWithImageUrls = orders.map((order) => ({
      ...order.toObject(),
      imageUrl: order.file ? `/uploads/${order.file}` : null,
    }));

    res.json(ordersWithImageUrls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
