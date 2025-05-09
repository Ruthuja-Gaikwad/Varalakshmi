// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: String,
  contact: String,
  type: String,
  description: String,
  file: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
