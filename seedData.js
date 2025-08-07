const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');
const Department = require('./models/Department');
const Doctor = require('./models/Doctor');

// Sample data for departments
const departmentsData = [
  {
    icon: "fa-solid fa-hospital",
    title: "departments.emergency.title",
    description: "departments.emergency.description",
    socialIcons: [
      { iconClass: "fa-brands fa-facebook" },
      { iconClass: "fa-brands fa-linkedin" },
      { iconClass: "fa-brands fa-twitter" }
    ]
  },
  {
    icon: "fa-solid fa-stethoscope",
    title: "departments.dermatology.title",
    description: "departments.dermatology.description",
    socialIcons: [
      { iconClass: "fa-brands fa-facebook" },
      { iconClass: "fa-brands fa-linkedin" },
      { iconClass: "fa-brands fa-twitter" }
    ]
  },
  {
    icon: "fa-solid fa-baby",
    title: "departments.pediatric.title",
    description: "departments.pediatric.description",
    socialIcons: [
      { iconClass: "fa-brands fa-facebook" },
      { iconClass: "fa-brands fa-linkedin" },
      { iconClass: "fa-brands fa-twitter" }
    ]
  },
  {
    icon: "fa-solid fa-bone",
    title: "departments.orthopedic.title",
    description: "departments.orthopedic.description",
    socialIcons: [
      { iconClass: "fa-brands fa-facebook" },
      { iconClass: "fa-brands fa-linkedin" },
      { iconClass: "fa-brands fa-twitter" }
    ]
  },
  {
    icon: "fa-solid fa-brain",
    title: "departments.neurology.title",
    description: "departments.neurology.description",
    socialIcons: [
      { iconClass: "fa-brands fa-facebook" },
      { iconClass: "fa-brands fa-linkedin" },
      { iconClass: "fa-brands fa-twitter" }
    ]
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Clear existing data
    await Department.deleteMany({});
    await Doctor.deleteMany({});
    
    console.log('Previous data cleared');
    
    // Insert departments
    const createdDepartments = await Department.insertMany(departmentsData);
    console.log(`${createdDepartments.length} departments inserted`);
    
    // Sample doctor data
    const doctorsData = [
      {
        department: createdDepartments[0]._id, // Emergency
        departmentName: createdDepartments[0].title,
        title: "Dr. Lisa Chen, MD",
        job: "Emergency Medicine Specialist",
        category: "Emergency",
        description: "Dr. Chen has over 10 years of experience in emergency medicine and is board certified in emergency medicine. She has a special interest in critical care and trauma management.",
        contactInfo: {
          phone: "+1-800-123-4567",
          email: "dr.chen@hospital.com"
        },
        appointmentSchedules: [
          { day: "Monday", time: "9:00 AM - 12:00 PM" },
          { day: "Wednesday", time: "1:00 PM - 4:00 PM" },
          { day: "Friday", time: "2:00 PM - 5:00 PM" }
        ],
        degrees: [
          { degree: "MD", institution: "Harvard Medical School", year: "2010" },
          { degree: "Board Certified in Emergency Medicine", institution: "American Board of Emergency Medicine", year: "2012" }
        ],
        experiences: [
          { position: "Emergency Medicine Specialist", hospital: "General Hospital", years: "10" },
          { position: "Attending Physician", hospital: "City Emergency Care", years: "3" }
        ],
        awards: [
          { award: "Emergency Medicine Excellence Award", year: "2018" },
          { award: "Best Medical Practitioner", year: "2020" }
        ],
        icon: [
          { iconClass: "fa-brands fa-facebook" },
          { iconClass: "fa-brands fa-linkedin" },
          { iconClass: "fa-brands fa-twitter" },
          { iconClass: "fa-brands fa-whatsapp" }
        ]
      },
      {
        department: createdDepartments[1]._id, // Dermatology
        departmentName: createdDepartments[1].title,
        title: "Dr. Michael Johnson, MD",
        job: "Dermatologist",
        category: "Dermatology",
        description: "Dr. Johnson is a board-certified dermatologist with expertise in treating skin conditions, performing cosmetic procedures, and diagnosing skin cancers.",
        contactInfo: {
          phone: "+1-800-234-5678",
          email: "dr.johnson@hospital.com"
        },
        appointmentSchedules: [
          { day: "Tuesday", time: "10:00 AM - 2:00 PM" },
          { day: "Thursday", time: "1:00 PM - 5:00 PM" }
        ],
        degrees: [
          { degree: "MD", institution: "Johns Hopkins University", year: "2008" },
          { degree: "Board Certified in Dermatology", institution: "American Board of Dermatology", year: "2011" }
        ],
        experiences: [
          { position: "Dermatologist", hospital: "Skin Care Clinic", years: "12" },
          { position: "Research Fellow", hospital: "Dermatology Research Institute", years: "2" }
        ],
        awards: [
          { award: "Excellence in Dermatology Research", year: "2015" },
          { award: "Patient's Choice Award", year: "2019" }
        ],
        icon: [
          { iconClass: "fa-brands fa-facebook" },
          { iconClass: "fa-brands fa-linkedin" },
          { iconClass: "fa-brands fa-twitter" },
          { iconClass: "fa-brands fa-whatsapp" }
        ]
      },
      {
        department: createdDepartments[2]._id, // Pediatric
        departmentName: createdDepartments[2].title,
        title: "Dr. Sarah Williams, MD",
        job: "Pediatrician",
        category: "Pediatric",
        description: "Dr. Williams specializes in the care of infants, children, and adolescents. She has a particular interest in childhood development and preventive care.",
        contactInfo: {
          phone: "+1-800-345-6789",
          email: "dr.williams@hospital.com"
        },
        appointmentSchedules: [
          { day: "Monday", time: "8:00 AM - 12:00 PM" },
          { day: "Wednesday", time: "8:00 AM - 12:00 PM" },
          { day: "Friday", time: "8:00 AM - 12:00 PM" }
        ],
        degrees: [
          { degree: "MD", institution: "Stanford University School of Medicine", year: "2012" },
          { degree: "Board Certified in Pediatrics", institution: "American Board of Pediatrics", year: "2015" }
        ],
        experiences: [
          { position: "Pediatrician", hospital: "Children's Medical Center", years: "8" },
          { position: "Pediatric Resident", hospital: "University Hospital", years: "3" }
        ],
        awards: [
          { award: "Compassionate Doctor Award", year: "2017" },
          { award: "Top Pediatrician", year: "2021" }
        ],
        icon: [
          { iconClass: "fa-brands fa-facebook" },
          { iconClass: "fa-brands fa-linkedin" },
          { iconClass: "fa-brands fa-twitter" },
          { iconClass: "fa-brands fa-whatsapp" }
        ]
      }
    ];
    
    // Insert doctors
    const createdDoctors = await Doctor.insertMany(doctorsData);
    console.log(`${createdDoctors.length} doctors inserted`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();