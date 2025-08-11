const Department = require('../models/Department'); // موديل الأقسام
const Doctor = require('../models/Doctor');         // موديل الأطباء

// إنشاء قسم جديد
exports.createDepartment = async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.status(201).json({ success: true, data: newDepartment });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// جلب جميع الأقسام
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// جلب قسم محدد مع الأطباء الموجودين فيه
exports.getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    const doctors = await Doctor.find({ department: req.params.id });
    res.status(200).json({ success: true, data: { department, doctors } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// تعديل بيانات قسم
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    res.status(200).json({ success: true, data: department });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// حذف قسم (مع التحقق من عدم وجود أطباء فيه)
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    const doctorsCount = await Doctor.countDocuments({ department: req.params.id });
    if (doctorsCount > 0) {
      return res.status(400).json({ success: false, error: 'Cannot delete department with doctors. Remove doctors first.' });
    }
    await department.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
