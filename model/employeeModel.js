const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: Number, required: true },
});

  const empdata=mongoose.model('Employee', employeeSchema);
  module.exports = empdata;


