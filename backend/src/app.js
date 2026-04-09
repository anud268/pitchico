const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Pitchico Store API is running...');
});

module.exports = app;
