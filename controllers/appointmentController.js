const Appointment = require('../models/Appointment'); // استيراد موديل المواعيد

// إنشاء موعد جديد
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body); // إنشاء كائن موعد من البيانات المرسلة
    await newAppointment.save(); // حفظ الموعد في قاعدة البيانات
    res.status(201).json({ success: true, data: newAppointment }); // إرجاع الموعد الجديد
  } catch (err) {
    res.status(400).json({ success: false, error: err.message }); // في حالة وجود خطأ
  }
};

// جلب جميع المواعيد
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }); // جلب المواعيد بترتيب تنازلي
    res.status(200).json({ success: true, data: appointments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// تحديث حالة الموعد
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params; // رقم الموعد
    const { status } = req.body; // الحالة الجديدة
    
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true } // يرجع البيانات بعد التحديث
    );
    
    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    
    res.status(200).json({ success: true, data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
