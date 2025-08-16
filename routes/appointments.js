const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');

const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus
} = require('../controllers/appointmentController');

// GET بدون حماية
router.get('/', getAppointments);

// POST و PUT بحماية
router.post('/',   createAppointment);
router.put('/:id/status',   updateAppointmentStatus);

module.exports = router;
