const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new employee
router.post('/employees', async (req, res) => {
    const { name, designation, location, salary } = req.body;
    try {
        const newEmployee = new Employee({ name, designation, location, salary });
        await newEmployee.save();
        res.json(newEmployee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update an employee
router.put('/employees/:id', async (req, res) => {
    const { name, designation, location, salary } = req.body;
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            { name, designation, location, salary },
            { new: true }
        );
        res.json(employee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
