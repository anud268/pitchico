require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the Express server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
  });
});
