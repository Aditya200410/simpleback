require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

const courseUpdates = [
  {
    courseName: 'GRC Masterclass',
    updates: {
      'pricing.online.amount': 25000,
      'pricing.online.hasEMI': true,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'Spoken English and Professional Skill',
    updates: {
      'pricing.online.amount': 12000,
      'pricing.online.hasEMI': false,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'Corporate HR & Leadership Training',
    updates: {
      'pricing.online.amount': 12000,
      'pricing.online.hasEMI': false,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'AI and Machine Learning',
    updates: {
      'pricing.online.amount': 20000,
      'pricing.online.hasEMI': false,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'AWS Cloud Mastery',
    updates: {
      'pricing.online.amount': 20000,
      'pricing.online.hasEMI': false,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'Azure Cloud Mastery',
    updates: {
      'pricing.online.amount': 20000,
      'pricing.online.hasEMI': false,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'CISA',
    updates: {
      'pricing.online.amount': 50000,
      'pricing.online.hasEMI': true,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'CISSP',
    updates: {
      'pricing.online.amount': 50000,
      'pricing.online.hasEMI': true,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'ISO 27001 Practitioner',
    updates: {
      'pricing.online.amount': 30000,
      'pricing.online.hasEMI': true,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  },
  {
    courseName: 'SOC 2 Practitioner with Training Project',
    updates: {
      'pricing.online.amount': 30000,
      'pricing.online.hasEMI': true,
      'pricing.offline.status': 'coming_soon',
      'pricing.offline.location': 'Mangalore'
    }
  }
];

const updateCourses = async () => {
  try {
    await connectDB();

    for (const courseUpdate of courseUpdates) {
      const course = await Course.findOne({ 
        courseName: { $regex: new RegExp(courseUpdate.courseName, 'i') }
      });
      
      if (!course) {
        console.log(`Course not found: ${courseUpdate.courseName}`);
        continue;
      }

      await Course.updateOne(
        { _id: course._id },
        { $set: courseUpdate.updates }
      );

      console.log(`Updated course: ${courseUpdate.courseName}`);
    }

    console.log('All courses updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateCourses();