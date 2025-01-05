const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
  empName: String,
  empDesignation: String,
  empLocation: String,
  empSalary: Number // Corrected key name
});

const empData = mongoose.model('emp', empSchema);
module.exports = empData;