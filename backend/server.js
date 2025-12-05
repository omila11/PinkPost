const app = require('./app');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 5000;

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Start server immediately
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('✓ MongoDB connected successfully');
  } catch (err) {
    console.error('✗ MongoDB connection error:', err.message);
    console.log('⚠ Server running without database. Please check:');
    console.log('  1. MongoDB Atlas IP whitelist includes your IP');
    console.log('  2. MONGO_URI in .env is correct');
    console.log('  3. Your internet connection is active');
    console.log('Retrying in 10 seconds...');
    setTimeout(connectDB, 10000); // Retry after 10 seconds
  }
};

connectDB();