const Box = require('../models/boxModel');

// Get all boxes (with optional filters)
exports.getAllBoxes = async (req, res) => {
  try {
    const { inStock } = req.query;
    
    let filter = {};
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const boxes = await Box.find(filter).sort({ name: 1 });
    
    res.json({
      success: true,
      count: boxes.length,
      boxes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching boxes', 
      error: error.message 
    });
  }
};

// Get single box by ID
exports.getBoxById = async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);
    
    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Box not found' 
      });
    }

    res.json({
      success: true,
      box
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching box', 
      error: error.message 
    });
  }
};

// Create new box (admin only)
exports.createBox = async (req, res) => {
  try {
    const { name, price, size, color, inStock, stock } = req.body;

    // Validate required fields
    if (!name || !price || !size) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and size are required'
      });
    }

    // Handle image path
    let imagePath = '';
    if (req.file) {
      imagePath = `/images/products/ebox/${req.file.filename}`;
    } else {
      imagePath = '/images/products/ebox/placeholder.jpg';
    }

    const box = new Box({
      name,
      price: parseFloat(price),
      size,
      color: color || '#ffc0cb',
      image: imagePath,
      inStock: inStock === 'true',
      stockQuantity: parseInt(stock) || 100
    });

    await box.save();

    res.status(201).json({
      success: true,
      message: 'Box created successfully',
      box
    });
  } catch (error) {
    console.error('Error creating box:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating box', 
      error: error.message 
    });
  }
};

// Update box (admin only)
exports.updateBox = async (req, res) => {
  try {
    const box = await Box.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Box not found' 
      });
    }

    res.json({
      success: true,
      message: 'Box updated successfully',
      box
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating box', 
      error: error.message 
    });
  }
};

// Delete box (admin only)
exports.deleteBox = async (req, res) => {
  try {
    const box = await Box.findByIdAndDelete(req.params.id);

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Box not found' 
      });
    }

    res.json({
      success: true,
      message: 'Box deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting box', 
      error: error.message 
    });
  }
};

// Toggle stock status (admin only)
exports.toggleStockStatus = async (req, res) => {
  try {
    const box = await Box.findById(req.params.id);

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Box not found' 
      });
    }

    box.inStock = !box.inStock;
    await box.save();

    res.json({
      success: true,
      message: `Box ${box.inStock ? 'marked as in stock' : 'marked as out of stock'}`,
      box
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error toggling stock status', 
      error: error.message 
    });
  }
};
