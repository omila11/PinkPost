const GiftBox = require('../models/giftboxModel');

exports.getAllGiftboxes = async (req, res) => {
  try {
    const boxes = await GiftBox.find().lean();
    res.json(boxes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createGiftbox = async (req, res) => {
  try {
    const { title, items = [], price = 0 } = req.body;
    const box = new GiftBox({ title, items, price });
    await box.save();
    res.status(201).json(box);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
