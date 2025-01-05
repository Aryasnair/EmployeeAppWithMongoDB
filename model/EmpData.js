const mongoose = require('mongoose');

// Define Employee Schema
const employeeSchema = mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeDesignation: { type: String, required: true },
  employeeLocation: { type: String, required: true },
  employeeSalary: { type: Number, required: true },
});

// Create and export model
const employeeData = mongoose.model('employees', employeeSchema);
module.exports = employeeData;
