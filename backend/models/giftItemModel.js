const mongoose = require('mongoose');

const giftItemSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
    enum: [
      'Sweet Treats',
      'Drinks',
      'Beauty',
      'Lifestyle Items',
      'Soft Items',
      'Handmade',
      'Accessories',
      'Tech',
      'Snacks',
      'Flowers'
    ]
  },
  subcategory: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  bg: {
    type: String,
    default: '#ffffff'
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
giftItemSchema.index({ category: 1, subcategory: 1, inStock: 1 });

module.exports = mongoose.model('GiftItem', giftItemSchema);
