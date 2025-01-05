const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
require('./db/connection');

// Middleware
app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static("public"));

// Navigation menu
const nav = [
  { link: '/employees', name: 'Home' },
  { link: '/employees/addform', name: "Add Employees" }
];

// Routes
const employeeRoutes = require('./routes/employeeRoutes')(nav);
app.use('/employees', employeeRoutes);

// Redirect root to /employees
app.get('/', (req, res) => {
  res.redirect('/employees');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
