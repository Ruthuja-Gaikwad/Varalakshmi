const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  // Common fields
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },

  // Enquiry-only field
  message: {
    type: String,
    trim: true,
  },

  // Order-only fields
  quantity: {
    type: Number,
    min: [1, 'Quantity must be at least 1'],
  },
  address: {
    type: String,
    trim: true,
  },

  // Product reference
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required'],
  },

  // Flags and timestamps
  isOrder: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
