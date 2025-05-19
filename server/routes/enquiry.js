const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Enquiry = require('../models/Enquiry');
const { authenticateAdmin } = require('../middleware/auth');

// GET /api/enquiries — List all enquiries with pagination
router.get('/', authenticateAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const enquiries = await Enquiry.find()
      .populate('product', 'name price')
      .skip((page - 1) * limit)
      .limit(Number(limit));  // ensure limit is a number

    res.status(200).json(enquiries);
  } catch (err) {
    console.error('Failed to fetch enquiries:', err);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

// POST /api/enquiries — Submit a new enquiry or order
router.post('/', authenticateAdmin, async (req, res) => {
  const { name, email, phone, message, quantity, address, product } = req.body;

  if (!name || !email || !phone || !product) {
    return res.status(400).json({ error: 'Name, email, phone, and product are required.' });
  }

  if (!mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const isOrder = !!quantity;

  if (!isOrder && !message) {
    return res.status(400).json({ error: 'Message is required for enquiries.' });
  }

  if (isOrder && (!quantity || !address)) {
    return res.status(400).json({ error: 'Quantity and address are required for orders.' });
  }

  try {
    const enquiry = new Enquiry({
      name,
      email,
      phone,
      product,
      isOrder,
      ...(isOrder ? { quantity, address } : { message })
    });

    await enquiry.save();

    const populated = await enquiry.populate('product', 'name price');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Failed to submit enquiry:', err);
    res.status(500).json({ error: 'Failed to submit enquiry or order' });
  }
});

// DELETE /api/enquiries/:id — Delete an enquiry
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid enquiry ID' });
  }

  try {
    await Enquiry.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    console.error('Failed to delete enquiry:', err);
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
});

module.exports = router;
