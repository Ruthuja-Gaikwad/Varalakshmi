// server/models/Product.js
const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  weight: { type: Number, required: true },
  designCode: { type: String, required: true },
  category: { type: String, required: true }, // E.g., Earrings, Chains, Rings
});

module.exports = mongoose.model('Product', productSchema); // Export model
