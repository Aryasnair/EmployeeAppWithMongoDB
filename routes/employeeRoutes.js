const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const employeeData = require('../model/EmpData');

// Define routes
function employeeroutes(nav) {
  // Home Route
  router.get('/', async (req, res) => {
    try {
      const data = await employeeData.find();
      res.render('Home', {
        title: 'Employees',
        data,
        nav
      });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(404).send('Data not found');
    }
  });

  // Add Employee Form
  router.get('/addform', (req, res) => {
    res.render('AddEmp', {
      data: {},
      nav
    });
  });

  // Add Employee
  router.post('/addemployee', async (req, res) => {
    try {
      const newEmployee = new employeeData(req.body);
      await newEmployee.save();
      res.redirect('/employees');
    } catch (error) {
      console.error('Error adding employee:', error.message);
      res.status(404).send('Post unsuccessful');
    }
  });

  // Update Employee Form
  router.get('/updatepage/:id', async (req, res) => {
    try {
      const data = await employeeData.findById(req.params.id);
      res.render('UpdateEmp', {
        nav,
        data,
        employeeid: req.params.id
      });
    } catch (error) {
      console.error('Error fetching employee data:', error.message);
      res.status(404).send('Data not found');
    }
  });

  // Update Employee
  router.post('/edit/:id', async (req, res) => {
    try {
      await employeeData.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/employees");
    } catch (error) {
      console.error('Error updating employee:', error.message);
      res.status(404).send('Update unsuccessful');
    }
  });

  // Delete Employee
  router.get('/delete/:id', async (req, res) => {
    try {
      await employeeData.findByIdAndDelete(req.params.id);
      res.redirect("/employees");
    } catch (error) {
      console.error('Error deleting employee:', error.message);
      res.status(404).send('Delete unsuccessful');
    }
  });

  return router;
}

module.exports = employeeroutes;
