const express = require('express');
const router = express.Router();
const ExcelData = require('../models/ExcelData');

// --- ADMIN MIDDLEWARE ---
const adminEmails = [
  'admin@example.com', // Replace with your admin emails
];
function isAdmin(req, res, next) {
  // Clerk user info is expected in req.user (set by auth middleware)
  // For now, check req.headers["x-user-email"] for simplicity
  const userEmail = req.headers["x-user-email"];
  if (adminEmails.includes(userEmail)) {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
}

// Get all Excel data
router.get('/', async (req, res) => {
  try {
    const data = await ExcelData.find().sort({ uploadedAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save Excel data
router.post('/', async (req, res) => {
  const excelData = new ExcelData({
    fileName: req.body.fileName,
    data: req.body.data,
    headers: req.body.headers,
    uploadedBy: req.body.uploadedBy
  });

  try {
    const newExcelData = await excelData.save();
    res.status(201).json(newExcelData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get specific Excel data by ID
router.get('/:id', async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Excel data
router.delete('/:id', async (req, res) => {
  try {
    const data = await ExcelData.findById(req.params.id);
    if (data) {
      await data.deleteOne();
      res.json({ message: 'Data deleted successfully' });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN: Get all uploads (admin only)
router.get('/admin/all', isAdmin, async (req, res) => {
  try {
    const uploads = await ExcelData.find().sort({ createdAt: -1 });
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

module.exports = router; 