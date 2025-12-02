const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Pink Post API is running');
});

module.exports = app;