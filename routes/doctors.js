// راوتر لإدارة الأطباء (إضافة - عرض - تعديل - حذف)
const express = require('express');
const router = express.Router();

const {
  createDoctor,   // إنشاء طبيب جديد
  getDoctors,     // عرض جميع الأطباء
  getDoctor,      // عرض طبيب محدد
  updateDoctor,   // تعديل بيانات طبيب
  deleteDoctor    // حذف طبيب
} = require('../controllers/doctorController');

// تعريف المسارات
router.post('/', createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
