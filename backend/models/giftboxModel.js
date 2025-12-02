const mongoose = require('mongoose');

const GiftBoxSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [{ name: String, quantity: { type: Number, default: 1 } }],
  price: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GiftBox', GiftBoxSchema);
