const GiftItem = require('../models/giftItemModel');

// Get all gift items (with optional filters)
exports.getAllGiftItems = async (req, res) => {
  try {
    const { category, subcategory, inStock } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const items = await GiftItem.find(filter).sort({ category: 1, subcategory: 1, name: 1 });
    
    res.json({
      success: true,
      count: items.length,
      items
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching gift items', 
      error: error.message 
    });
  }
};

// Get single gift item by ID
exports.getGiftItemById = async (req, res) => {
  try {
    const item = await GiftItem.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gift item not found' 
      });
    }

    res.json({
      success: true,
      item
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching gift item', 
      error: error.message 
    });
  }
};

// Create new gift item (admin only)
exports.createGiftItem = async (req, res) => {
  try {
    const { name, price, category, subcategory, inStock, stock, description } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, and category are required'
      });
    }

    // Handle image path
    let imagePath = '';
    if (req.file) {
      imagePath = `/images/products/${req.file.filename}`;
    } else {
      // Use a default placeholder image
      imagePath = '/images/products/placeholder.jpg';
    }

    const item = new GiftItem({
      name,
      price: parseFloat(price),
      category,
      subcategory: subcategory || '',
      image: imagePath,
      bg: '#ff6b9d',
      inStock: inStock === 'true',
      stockQuantity: parseInt(stock) || 100,
      description: description || ''
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: 'Gift item created successfully',
      item
    });
  } catch (error) {
    console.error('Error creating gift item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating gift item', 
      error: error.message 
    });
  }
};

// Update gift item (admin only)
exports.updateGiftItem = async (req, res) => {
  try {
    const { name, price, category, subcategory, image, bg, inStock, stockQuantity } = req.body;

    const item = await GiftItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        subcategory,
        image,
        bg,
        inStock,
        stockQuantity
      },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gift item not found' 
      });
    }

    res.json({
      success: true,
      message: 'Gift item updated successfully',
      item
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error updating gift item', 
      error: error.message 
    });
  }
};

// Delete gift item (admin only)
exports.deleteGiftItem = async (req, res) => {
  try {
    const item = await GiftItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gift item not found' 
      });
    }

    res.json({
      success: true,
      message: 'Gift item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting gift item', 
      error: error.message 
    });
  }
};

// Toggle stock status (admin only)
exports.toggleStockStatus = async (req, res) => {
  try {
    const item = await GiftItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ 
        success: false, 
        message: 'Gift item not found' 
      });
    }

    item.inStock = !item.inStock;
    await item.save();

    res.json({
      success: true,
      message: `Item ${item.inStock ? 'marked as in stock' : 'marked as out of stock'}`,
      item
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error toggling stock status', 
      error: error.message 
    });
  }
};

// Bulk import items (admin only)
exports.bulkImportItems = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Items array is required and must not be empty' 
      });
    }

    const createdItems = await GiftItem.insertMany(items);

    res.status(201).json({
      success: true,
      message: `${createdItems.length} items imported successfully`,
      count: createdItems.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error importing items', 
      error: error.message 
    });
  }
};
