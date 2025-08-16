const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
  facebook: { type: String, default: '' },
  twitter: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  whatsapp: { type: String, default: '' }
}, { _id: false });

const WorkingHoursSchema = new mongoose.Schema({
  day: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  time: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  }
}, { _id: false });

const QualificationSchema = new mongoose.Schema({
  degree: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  institution: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  year: { type: String, required: true }
}, { _id: false });

const ExperienceSchema = new mongoose.Schema({
  position: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  organization: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  duration: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  }
}, { _id: false });

const AwardSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  year: { type: String, required: true }
}, { _id: false });

const DoctorSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required']
  },
  translations: {
    en: {
      name: { type: String, required: [true, 'English name is required'] },
      jobTitle: { type: String, required: [true, 'English job title is required'] },
      specialty: { type: String, required: [true, 'English specialty is required'] },
      bio: { type: String, required: [true, 'English bio is required'] },
      workingHoursTitle: { type: String, default: 'Working Hours' },
      qualificationsTitle: { type: String, default: 'Qualifications' },
      experiencesTitle: { type: String, default: 'Work Experience' },
      awardsTitle: { type: String, default: 'Awards & Honors' }
    },
    ar: {
      name: { type: String, required: [true, 'Arabic name is required'] },
      jobTitle: { type: String, required: [true, 'Arabic job title is required'] },
      specialty: { type: String, required: [true, 'Arabic specialty is required'] },
      bio: { type: String, required: [true, 'Arabic bio is required'] },
      workingHoursTitle: { type: String, default: 'مواعيد العمل' },
      qualificationsTitle: { type: String, default: 'المؤهلات العلمية' },
      experiencesTitle: { type: String, default: 'الخبرات العملية' },
      awardsTitle: { type: String, default: 'الجوائز والتكريمات' }
    }
  },
  image: { type: String },
  contactInfo: {
    phone: { type: String, required: [true, 'Phone number is required'] },
    email: { type: String, required: [true, 'Email is required'] }
  },
  socialMedia: { type: SocialMediaSchema, default: {} },
  workingHours: { type: [WorkingHoursSchema], default: [] },
  qualifications: { type: [QualificationSchema], default: [] },
  experiences: { type: [ExperienceSchema], default: [] },
  awards: { type: [AwardSchema], default: [] },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);