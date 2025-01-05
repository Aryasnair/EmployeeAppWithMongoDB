const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
//const employeeRoutes = require('./routes/employeeRoutes');
const employeeRoutes = require('./routes/employeeRoutes')

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', employeeRoutes);

// EJS Configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/add', (req, res) => {
    res.render('addEmployee');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
