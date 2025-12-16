const mongoose = require('mongoose');

const completeBoxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Birthday', 'Anniversary', 'Wedding', 'Baby Shower', 'Graduation', 'Thank You', 'Get Well', 'Sympathy', 'Holiday', 'Just Because']
  },
  image: {
    type: String,
    required: true
  },
  items: [{
    name: String,
    quantity: Number
  }],
  isMostLoved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 50
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
completeBoxSchema.index({ category: 1, isMostLoved: 1, isFeatured: 1, inStock: 1 });

module.exports = mongoose.model('CompleteBox', completeBoxSchema);
