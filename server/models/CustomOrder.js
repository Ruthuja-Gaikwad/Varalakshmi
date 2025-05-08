const mongoose = require('mongoose');

const customOrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneOrEmail: { type: String, required: true },
  productType: { type: String, required: true },
  designDescription: { type: String, required: true },
  designImage: { type: String, required: false },
});

module.exports = mongoose.model('CustomOrder', customOrderSchema);
