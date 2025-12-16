const CompleteBox = require('../models/completeBoxModel');

// Get all complete boxes (with optional filters)
exports.getAllCompleteBoxes = async (req, res) => {
  try {
    const { category, isMostLoved, isFeatured, inStock } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (isMostLoved !== undefined) filter.isMostLoved = isMostLoved === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const boxes = await CompleteBox.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: boxes.length,
      boxes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching complete boxes', 
      error: error.message 
    });
  }
};

// Get single complete box by ID
exports.getCompleteBoxById = async (req, res) => {
  try {
    const box = await CompleteBox.findById(req.params.id);
    
    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complete box not found' 
      });
    }

    res.json({
      success: true,
      box
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching complete box', 
      error: error.message 
    });
  }
};

// Create new complete box (admin only)
exports.createCompleteBox = async (req, res) => {
  try {
    const { name, description, price, category, items, isMostLoved, isFeatured, inStock, stock } = req.body;

    // Validate required fields
    if (!name || !price || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, price, and category are required'
      });
    }

    // Handle image path
    let imagePath = '';
    if (req.file) {
      imagePath = `/images/products/complete-boxes/${req.file.filename}`;
    } else {
      imagePath = '/images/products/complete-boxes/placeholder.jpg';
    }

    // Parse items if it's a string
    let parsedItems = [];
    if (items) {
      try {
        parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
      } catch (e) {
        parsedItems = [];
      }
    }

    const box = new CompleteBox({
      name,
      description,
      price: parseFloat(price),
      category,
      image: imagePath,
      items: parsedItems,
      isMostLoved: isMostLoved === 'true',
      isFeatured: isFeatured === 'true',
      inStock: inStock === 'true',
      stockQuantity: parseInt(stock) || 50
    });

    await box.save();

    res.status(201).json({
      success: true,
      message: 'Complete box created successfully',
      box
    });
  } catch (error) {
    console.error('Error creating complete box:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating complete box', 
      error: error.message 
    });
  }
};

// Update complete box (admin only)
exports.updateCompleteBox = async (req, res) => {
  try {
    const box = await CompleteBox.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complete box not found' 
      });
    }

    res.json({
      success: true,
      message: 'Complete box updated successfully',
      box
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating complete box', 
      error: error.message 
    });
  }
};

// Delete complete box (admin only)
exports.deleteCompleteBox = async (req, res) => {
  try {
    const box = await CompleteBox.findByIdAndDelete(req.params.id);

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complete box not found' 
      });
    }

    res.json({
      success: true,
      message: 'Complete box deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting complete box', 
      error: error.message 
    });
  }
};

// Toggle stock status (admin only)
exports.toggleStockStatus = async (req, res) => {
  try {
    const box = await CompleteBox.findById(req.params.id);

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complete box not found' 
      });
    }

    box.inStock = !box.inStock;
    await box.save();

    res.json({
      success: true,
      message: `Complete box ${box.inStock ? 'marked as in stock' : 'marked as out of stock'}`,
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

// Toggle most loved status (admin only)
exports.toggleMostLoved = async (req, res) => {
  try {
    const box = await CompleteBox.findById(req.params.id);

    if (!box) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complete box not found' 
      });
    }

    box.isMostLoved = !box.isMostLoved;
    await box.save();

    res.json({
      success: true,
      message: `Complete box ${box.isMostLoved ? 'marked as most loved' : 'unmarked as most loved'}`,
      box
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error toggling most loved status', 
      error: error.message 
    });
  }
};
