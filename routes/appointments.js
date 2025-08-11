const express = require('express'); // استيراد إكسبريس
const router = express.Router(); // إنشاء راوتر

// استيراد دوال المواعيد من الكنترولر
const {
  createAppointment,  // إنشاء موعد
  getAppointments,    // عرض المواعيد
  updateAppointmentStatus // تحديث حالة الموعد
} = require('../controllers/appointmentController');

// تعريف المسارات
router.post('/', createAppointment);           // إضافة موعد جديد
router.get('/', getAppointments);              // جلب المواعيد
router.put('/:id/status', updateAppointmentStatus); // تحديث حالة موعد

module.exports = router; // تصدير الراوتر
