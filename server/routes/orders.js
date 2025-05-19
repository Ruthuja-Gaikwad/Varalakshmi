const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const multer = require('multer');
const path = require('path');
const { authenticateAdmin } = require('../middleware/auth');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/**
 * @route   POST /api/orders
 * @desc    Submit a new order (admin only)
 */
router.post('/', authenticateAdmin, upload.single('file'), async (req, res) => {
  const { name, contact, type, description } = req.body;
  const file = req.file ? req.file.filename : null;
  const status = 'Pending';

  try {
    const newOrder = new Order({
      name,
      contact,
      type,
      description,
      file,
      status,
    });

    await newOrder.save();

    res.status(201).json({
      ...newOrder.toObject(),
      imageUrl: file ? `/uploads/${file}` : null,
    });
  } catch (error) {
    console.error('❌ Failed to submit order:', error);
    res.status(500).json({ error: 'Failed to submit order' });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders (admin only)
 */
router.get('/', authenticateAdmin, async (req, res) => {
  console.log('Reached /api/orders route handler');
  console.log('📥 GET /api/orders hit');
  console.log('🧑 Authenticated user:', req.user);

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    console.log('✅ Orders fetched:', orders.length);

    const ordersWithImageUrls = orders.map(order => {
      const plain = order.toObject();
      return {
        ...plain,
        imageUrl: plain.file ? `/uploads/${plain.file}` : null,
      };
    });

    res.json(ordersWithImageUrls);
  } catch (error) {
    console.error('🔥 Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status (admin only)
 */
router.patch('/:id/status', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({
      ...order.toObject(),
      imageUrl: order.file ? `/uploads/${order.file}` : null,
    });
  } catch (error) {
    console.error('❌ Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order by ID (admin only)
 */

router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await Order.findByIdAndDelete(id);


    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
