// راوتر لإدارة الأقسام (إضافة - عرض - تعديل - حذف)
const express = require('express');
const router = express.Router();

const {
  createDepartment,   // إنشاء قسم جديد
  getDepartments,     // عرض جميع الأقسام
  getDepartment,      // عرض قسم محدد
  updateDepartment,   // تعديل قسم
  deleteDepartment    // حذف قسم
} = require('../controllers/departmentController');

// تعريف المسارات
router.post('/', createDepartment);
router.get('/', getDepartments);
router.get('/:id', getDepartment);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;
