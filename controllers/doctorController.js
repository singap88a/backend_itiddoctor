const Doctor = require('../models/Doctor');       // موديل الأطباء
const Department = require('../models/Department'); // موديل الأقسام

// إنشاء طبيب جديد (مع التأكد من أن القسم موجود)
exports.createDoctor = async (req, res) => {
  try {
    const department = await Department.findById(req.body.department);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    req.body.departmentName = department.title; // إضافة اسم القسم للطبيب
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ success: true, data: newDoctor });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// جلب جميع الأطباء (مع إمكانية التصفية حسب القسم)
exports.getDoctors = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) {
      filter.department = req.query.department;
    }
    const doctors = await Doctor.find(filter).populate('department', 'title icon');
    res.status(200).json({ success: true, data: doctors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// جلب طبيب محدد
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('department', 'title icon');
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// تعديل بيانات طبيب (مع التأكد من صحة القسم إذا تم تغييره)
exports.updateDoctor = async (req, res) => {
  try {
    if (req.body.department) {
      const department = await Department.findById(req.body.department);
      if (!department) {
        return res.status(404).json({ success: false, error: 'Department not found' });
      }
      req.body.departmentName = department.title;
    }
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }
    res.status(200).json({ success: true, data: doctor });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// حذف طبيب
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }
    await doctor.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
