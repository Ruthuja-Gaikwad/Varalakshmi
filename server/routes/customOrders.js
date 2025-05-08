const express = require('express');
const CustomOrder = require('../models/CustomOrder');
const router = express.Router();

// Create a custom order
router.post('/', async (req, res) => {
  const { name, phoneOrEmail, productType, designDescription, designImage } = req.body;
  try {
    const newOrder = new CustomOrder({ name, phoneOrEmail, productType, designDescription, designImage });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
