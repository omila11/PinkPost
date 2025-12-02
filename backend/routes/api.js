const express = require('express');
const router = express.Router();
const giftboxController = require('../controllers/giftboxController');
const authRoutes = require('./authRoutes');
const giftItemRoutes = require('./giftItemRoutes');

// Auth routes
router.use('/auth', authRoutes);

// Gift item routes
router.use('/gift-items', giftItemRoutes);

// Giftbox routes
router.get('/giftboxes', giftboxController.getAllGiftboxes);
router.post('/giftboxes', giftboxController.createGiftbox);

// Health check
router.get('/health', (req, res) => res.json({ ok: true }));

module.exports = router;
