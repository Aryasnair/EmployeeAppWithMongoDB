const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config(); // Load environment variables

const uri = process.env.mongoDB_URL; // MongoDB URL from .env
const dbName = 'employeesDB';
let db;

// Connect to MongoDB
MongoClient.connect(uri)
  .then(client => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
function employeeroutes(nav) {
  // Home Route
  router.get('/', async (req, res) => {
    try {
      const data = await db.collection('employees').find().toArray();
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
      const newEmployee = req.body;
      await db.collection('employees').insertOne(newEmployee);
      res.redirect('/employees');
    } catch (error) {
      console.error('Error adding employee:', error.message);
      res.status(404).send('Post unsuccessful');
    }
  });

  // Update Employee Form
  router.get('/updatepage/:id', async (req, res) => {
    try {
      const data = await db.collection('employees').findOne({ _id: new ObjectId(req.params.id) });
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
      await db.collection('employees').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.redirect('/employees');
    } catch (error) {
      console.error('Error updating employee:', error.message);
      res.status(404).send('Update unsuccessful');
    }
  });

  // Delete Employee
  router.get('/delete/:id', async (req, res) => {
    try {
      await db.collection('employees').deleteOne({ _id: new ObjectId(req.params.id) });
      res.redirect('/employees');
    } catch (error) {
      console.error('Error deleting employee:', error.message);
      res.status(404).send('Delete unsuccessful');
    }
  });

  return router;
}

module.exports = employeeroutes;
