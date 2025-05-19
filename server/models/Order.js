const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  contact: String,
  type: String,
  description: String,
  file: String,
  status: {
    type: String,
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
