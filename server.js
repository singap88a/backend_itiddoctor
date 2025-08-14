require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const appointments = require('./routes/appointments');
const departments = require('./routes/departments');
const doctors = require('./routes/doctors');
const auth = require('./routes/auth');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', auth);
app.use('/api/appointments', appointments);
app.use('/api/departments', departments);
app.use('/api/doctors', doctors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
