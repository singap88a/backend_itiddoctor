const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

// GET بدون حماية
router.get('/', getDoctors);
router.get('/:id', getDoctor);

// POST و PUT و DELETE بحماية
router.post('/', authMiddleware, createDoctor);
router.put('/:id', authMiddleware, updateDoctor);
router.delete('/:id', authMiddleware, deleteDoctor);

module.exports = router;
