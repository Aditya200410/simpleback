const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
    match: [/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d\-\s\(\)]{8,20}$/, 'Please enter a valid phone number']
  },
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Enrolled', 'Completed', 'Dropped'],
      default: 'Enrolled'
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  }],
  certificates: [{
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    issuedDate: {
      type: Date,
      default: Date.now
    },
    certificateId: {
      type: String,
      sparse: true
    }
  }],
  totalAmountPaid: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Graduated'],
    default: 'Active'
  }
}, {
  timestamps: true
});

// Index for better query performance
studentSchema.index({ email: 1 });
studentSchema.index({ status: 1 });
studentSchema.index({ 'enrolledCourses.course': 1 });

// Generate certificate ID
studentSchema.pre('save', function(next) {
  this.certificates.forEach(cert => {
    if (cert.course && !cert.certificateId) {
      cert.certificateId = 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
  });
  next();
});

module.exports = mongoose.model('Student', studentSchema);
