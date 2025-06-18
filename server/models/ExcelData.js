const mongoose = require('mongoose');

const excelDataSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    required: true
  },
  uploadedBy: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExcelData', excelDataSchema); 