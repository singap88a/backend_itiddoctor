require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const appointments = require('./routes/appointments');
const departments = require('./routes/departments');
const doctors = require('./routes/doctors');
const auth = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express(); // ← لازم ييجي هنا قبل أي app.use()

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', auth);
app.use('/api/appointments', authMiddleware, appointments);
app.use('/api/departments', authMiddleware, departments);
app.use('/api/doctors', authMiddleware, doctors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
