const express = require('express');
const router = express.Router();
const giftItemController = require('../controllers/giftItemController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', giftItemController.getAllGiftItems);
router.get('/:id', giftItemController.getGiftItemById);

// Admin only routes
router.post('/', authenticate, isAdmin, giftItemController.createGiftItem);
router.put('/:id', authenticate, isAdmin, giftItemController.updateGiftItem);
router.delete('/:id', authenticate, isAdmin, giftItemController.deleteGiftItem);
router.patch('/:id/toggle-stock', authenticate, isAdmin, giftItemController.toggleStockStatus);
router.post('/bulk-import', authenticate, isAdmin, giftItemController.bulkImportItems);

module.exports = router;
