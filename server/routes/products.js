// server/routes/products.js
const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from database
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const { name, image, weight, designCode, category } = req.body;

  // Validate required fields
  if (!name || !image || !weight || !designCode || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newProduct = new Product({
      name, 
      image, 
      weight, 
      designCode, 
      category
    });

    await newProduct.save(); // Save product to DB
    res.status(201).json(newProduct); // Return the created product
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

module.exports = router; // Export the routes
