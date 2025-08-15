const mongoose = require('mongoose');

const SocialIconSchema = new mongoose.Schema({
  iconClass: {
    type: String,
    required: true
  }
}, { _id: false });

const DepartmentTranslationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { _id: false });

const DepartmentSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true
  },
  translations: {
    en: DepartmentTranslationSchema,
    ar: DepartmentTranslationSchema
  },
  hero_img: {
    type: String
  },
  socialIcons: {
    type: [SocialIconSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);