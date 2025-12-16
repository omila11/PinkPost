const express = require('express');
const router = express.Router();
const giftboxController = require('../controllers/giftboxController');
const authRoutes = require('./authRoutes');
const giftItemRoutes = require('./giftItemRoutes');
const boxRoutes = require('./boxRoutes');
const completeBoxRoutes = require('./completeBoxRoutes');

// Auth routes
router.use('/auth', authRoutes);

// Gift item routes
router.use('/gift-items', giftItemRoutes);

// Box routes
router.use('/boxes', boxRoutes);

// Complete box routes
router.use('/complete-boxes', completeBoxRoutes);

// Giftbox routes
router.get('/giftboxes', giftboxController.getAllGiftboxes);
router.post('/giftboxes', giftboxController.createGiftbox);

// Health check
router.get('/health', (req, res) => res.json({ ok: true }));

module.exports = router;
