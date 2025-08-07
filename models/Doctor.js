const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
  facebook: {
    type: String,
    default: ''
  },
  twitter: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  whatsapp: {
    type: String,
    default: ''
  }
}, { _id: false });

const DoctorSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  departmentName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  socialMedia: {
    type: SocialMediaSchema,
    default: {}
  },
  appointmentSchedules: [
    {
      day: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      }
    }
  ],
  degrees: [
    {
      degree: {
        type: String,
        required: true
      },
      institution: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      }
    }
  ],
  experiences: [
    {
      position: {
        type: String,
        required: true
      },
      hospital: {
        type: String,
        required: true
      },
      years: {
        type: String,
        required: true
      }
    }
  ],
  awards: [
    {
      award: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      }
    }
  ],
  icon: [
    {
      iconClass: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);