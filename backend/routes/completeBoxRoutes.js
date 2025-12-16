const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const completeBoxController = require('../controllers/completeBoxController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Create directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../frontend/public/images/products/complete-boxes');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|jfif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'image/jfif';
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public routes
router.get('/', completeBoxController.getAllCompleteBoxes);
router.get('/:id', completeBoxController.getCompleteBoxById);

// Admin only routes
router.post('/', authenticate, isAdmin, upload.single('image'), completeBoxController.createCompleteBox);
router.put('/:id', authenticate, isAdmin, completeBoxController.updateCompleteBox);
router.delete('/:id', authenticate, isAdmin, completeBoxController.deleteCompleteBox);
router.patch('/:id/toggle-stock', authenticate, isAdmin, completeBoxController.toggleStockStatus);
router.patch('/:id/toggle-most-loved', authenticate, isAdmin, completeBoxController.toggleMostLoved);

module.exports = router;
