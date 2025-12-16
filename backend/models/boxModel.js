const mongoose = require('mongoose');

const boxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ffc0cb'
  },
  image: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

// Index for faster queries
boxSchema.index({ inStock: 1 });

module.exports = mongoose.model('Box', boxSchema);
