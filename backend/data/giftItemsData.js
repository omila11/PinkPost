// This file contains gift items data ready for database import
// Copy the gifts array from GiftSelector.jsx and modify it to remove the 'id' field

module.exports = [
  // Example format - remove 'id' field, database will auto-generate _id
  {
    name: 'Artisan Chocolate Box',
    price: 8.00,
    category: 'Sweet Treats',
    subcategory: 'Chocolates',
    image: '/images/products/Sweet_Treats/Chocolates/chocolate1.jpg',
    bg: '#3d2817',
    inStock: true,
    stockQuantity: 100
  },
  // Add all your 422 items here...
  // You can copy from GiftSelector.jsx and remove the id field
  // The import script will handle adding them to MongoDB
];

// To use this file:
// 1. Copy all gift items from GiftSelector.jsx
// 2. Remove the 'id:' field from each item
// 3. Add 'inStock: true' and 'stockQuantity: 100' to each item
// 4. Run: node scripts/importGiftItems.js
