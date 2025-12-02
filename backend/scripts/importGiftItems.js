const mongoose = require('mongoose');
const GiftItem = require('./models/giftItemModel');
require('dotenv').config();

// Import your gift items data here
const giftItems = require('./data/giftItemsData');

const importGiftItems = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB connected');

    // Clear existing items (optional - comment out if you want to keep existing items)
    // await GiftItem.deleteMany({});
    // console.log('Existing items cleared');

    // Import new items
    const items = await GiftItem.insertMany(giftItems);

    console.log(`✅ ${items.length} gift items imported successfully!`);

    process.exit(0);
  } catch (error) {
    console.error('Error importing gift items:', error);
    process.exit(1);
  }
};

importGiftItems();
