const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Missing');
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Missing');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    process.exit(0);
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message);
    process.exit(1);
  });
