const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const boxController = require('../controllers/boxController');
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/images/products/ebox'));
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
router.get('/', boxController.getAllBoxes);
router.get('/:id', boxController.getBoxById);

// Admin only routes
router.post('/', authenticate, isAdmin, upload.single('image'), boxController.createBox);
router.put('/:id', authenticate, isAdmin, boxController.updateBox);
router.delete('/:id', authenticate, isAdmin, boxController.deleteBox);
router.patch('/:id/toggle-stock', authenticate, isAdmin, boxController.toggleStockStatus);

module.exports = router;
