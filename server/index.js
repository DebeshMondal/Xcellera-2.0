const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xcellera';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const excelDataRoutes = require('./routes/excelData');
app.use('/api/excel', excelDataRoutes);

const aiSummarizeRoutes = require('./routes/aiSummarize');
app.use('/api/ai', aiSummarizeRoutes);

// Simple admin email list for demo purposes
const ADMIN_EMAILS = [
  'admin@example.com', // Replace with your admin email(s)
];

module.exports.ADMIN_EMAILS = ADMIN_EMAILS;

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Xcellera API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 