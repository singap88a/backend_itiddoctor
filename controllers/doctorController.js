const Doctor = require('../models/Doctor');
const Department = require('../models/Department');

// إنشاء أخصائي جديد
exports.createDoctor = async (req, res) => {
  try {
    const department = await Department.findById(req.body.department);
    if (!department) {
      return res.status(404).json({
        success: false,
        error: {
          en: 'Department not found',
          ar: 'القسم غير موجود'
        }
      });
    }

    const requiredFields = ['name', 'jobTitle', 'specialty', 'bio'];
    for (const lang of ['en', 'ar']) {
      for (const field of requiredFields) {
        if (!req.body.translations?.[lang]?.[field]) {
          return res.status(400).json({
            success: false,
            error: {
              en: `${field} is required in ${lang} translation`,
              ar: `حقل ${field} مطلوب في الترجمة ${lang === 'en' ? 'الإنجليزية' : 'العربية'}`
            }
          });
        }
      }
    }

    const newDoctor = new Doctor({
      department: req.body.department,
      translations: {
        en: {
          name: req.body.translations.en.name,
          jobTitle: req.body.translations.en.jobTitle,
          specialty: req.body.translations.en.specialty,
          bio: req.body.translations.en.bio,
          workingHoursTitle: req.body.translations.en.workingHoursTitle || 'Working Hours',
          qualificationsTitle: req.body.translations.en.qualificationsTitle || 'Qualifications',
          experiencesTitle: req.body.translations.en.experiencesTitle || 'Work Experience',
          awardsTitle: req.body.translations.en.awardsTitle || 'Awards & Honors'
        },
        ar: {
          name: req.body.translations.ar.name,
          jobTitle: req.body.translations.ar.jobTitle,
          specialty: req.body.translations.ar.specialty,
          bio: req.body.translations.ar.bio,
          workingHoursTitle: req.body.translations.ar.workingHoursTitle || 'مواعيد العمل',
          qualificationsTitle: req.body.translations.ar.qualificationsTitle || 'المؤهلات العلمية',
          experiencesTitle: req.body.translations.ar.experiencesTitle || 'الخبرات العملية',
          awardsTitle: req.body.translations.ar.awardsTitle || 'الجوائز والتكريمات'
        }
      },
      image: req.body.image || '',
      contactInfo: {
        phone: req.body.contactInfo?.phone || '',
        email: req.body.contactInfo?.email || ''
      },
      socialMedia: req.body.socialMedia || {},
      workingHours: req.body.workingHours || [],
      qualifications: req.body.qualifications || [],
      experiences: req.body.experiences || [],
      awards: req.body.awards || [],
      isFeatured: req.body.isFeatured || false
    });

    await newDoctor.save();

    res.status(201).json({
      success: true,
      data: newDoctor,
      message: {
        en: 'Specialist created successfully',
        ar: 'تم إنشاء الأخصائي بنجاح'
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
      message: {
        en: 'Error creating specialist',
        ar: 'حدث خطأ أثناء إنشاء الأخصائي'
      }
    });
  }
};

// جلب جميع الأخصائيين (بدون تنسيق - نفس هيكل POSTMAN)
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('department', 'translations');
    
    res.status(200).json({
      success: true,
      data: doctors,
      message: {
        en: 'Specialists retrieved successfully',
        ar: 'تم جلب الأخصائيين بنجاح'
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: {
        en: 'Error retrieving specialists',
        ar: 'حدث خطأ أثناء جلب الأخصائيين'
      }
    });
  }
};

// جلب أخصائي محدد (بدون تنسيق - نفس هيكل POSTMAN)
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('department', 'translations');
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: {
          en: 'Specialist not found',
          ar: 'الأخصائي غير موجود'
        }
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
      message: {
        en: 'Specialist retrieved successfully',
        ar: 'تم جلب الأخصائي بنجاح'
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: {
        en: 'Error retrieving specialist',
        ar: 'حدث خطأ أثناء جلب الأخصائي'
      }
    });
  }
};

// جلب أخصائي محدد مع الترجمة (اختياري)
exports.getDoctorTranslated = async (req, res) => {
  try {
    const lang = req.query.lang || 'ar';
    const doctor = await Doctor.findById(req.params.id).populate('department', 'translations');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: {
          en: 'Specialist not found',
          ar: 'الأخصائي غير موجود'
        }
      });
    }

    const translatedDoctor = {
      ...doctor.toObject(),
      name: doctor.translations[lang].name,
      jobTitle: doctor.translations[lang].jobTitle,
      specialty: doctor.translations[lang].specialty,
      bio: doctor.translations[lang].bio,
      workingHoursTitle: doctor.translations[lang].workingHoursTitle,
      qualificationsTitle: doctor.translations[lang].qualificationsTitle,
      experiencesTitle: doctor.translations[lang].experiencesTitle,
      awardsTitle: doctor.translations[lang].awardsTitle,
      workingHours: doctor.workingHours.map(wh => ({
        day: wh.day[lang],
        time: wh.time[lang]
      })),
      qualifications: doctor.qualifications.map(q => ({
        degree: q.degree[lang],
        institution: q.institution[lang],
        year: q.year
      })),
      experiences: doctor.experiences.map(exp => ({
        position: exp.position[lang],
        organization: exp.organization[lang],
        duration: exp.duration[lang]
      })),
      awards: doctor.awards.map(award => ({
        title: award.title[lang],
        year: award.year
      })),
      department: {
        _id: doctor.department._id,
        name: doctor.department.translations[lang].title
      }
    };

    res.status(200).json({
      success: true,
      data: translatedDoctor,
      message: {
        en: 'Specialist retrieved successfully',
        ar: 'تم جلب الأخصائي بنجاح'
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: {
        en: 'Error retrieving specialist',
        ar: 'حدث خطأ أثناء جلب الأخصائي'
      }
    });
  }
};

// تحديث بيانات الأخصائي
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: {
          en: 'Specialist not found',
          ar: 'الأخصائي غير موجود'
        }
      });
    }

    if (req.body.translations) {
      if (req.body.translations.en) {
        doctor.translations.en = {
          ...doctor.translations.en,
          ...req.body.translations.en
        };
      }
      if (req.body.translations.ar) {
        doctor.translations.ar = {
          ...doctor.translations.ar,
          ...req.body.translations.ar
        };
      }
    }

    const updatableFields = [
      'department', 'image', 'contactInfo', 'socialMedia',
      'workingHours', 'qualifications', 'experiences', 'awards', 'isFeatured'
    ];
    
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        doctor[field] = req.body[field];
      }
    });

    await doctor.save();

    res.status(200).json({
      success: true,
      data: doctor,
      message: {
        en: 'Specialist updated successfully',
        ar: 'تم تحديث الأخصائي بنجاح'
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
      message: {
        en: 'Error updating specialist',
        ar: 'حدث خطأ أثناء تحديث الأخصائي'
      }
    });
  }
};

// حذف أخصائي
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        error: {
          en: 'Specialist not found',
          ar: 'الأخصائي غير موجود'
        }
      });
    }
    res.status(200).json({
      success: true,
      data: {},
      message: {
        en: 'Specialist deleted successfully',
        ar: 'تم حذف الأخصائي بنجاح'
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: {
        en: 'Error deleting specialist',
        ar: 'حدث خطأ أثناء حذف الأخصائي'
      }
    });
  }
};