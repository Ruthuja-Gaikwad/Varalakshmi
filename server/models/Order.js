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
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 },
      // You can add other fields like price, etc.
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
