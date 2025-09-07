const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Student name cannot exceed 100 characters']
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true,
    maxlength: [50, 'Student ID cannot exceed 50 characters']
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  certificateName: {
    type: String,
    required: [true, 'Certificate name is required'],
    trim: true,
    maxlength: [200, 'Certificate name cannot exceed 200 characters']
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    validate: {
      validator: function(value) {
        if (!value) return true; // Optional field
        return value > this.issueDate;
      },
      message: 'Expiry date must be after issue date'
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Issued'],
    default: 'Pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  rejectedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectedAt: {
    type: Date
  },
  rejectionReason: {
    type: String,
    trim: true,
    maxlength: [500, 'Rejection reason cannot exceed 500 characters']
  },
  certificateNumber: {
    type: String,
    unique: true,
    sparse: true // Only unique if not null
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'Pass', 'Fail'],
    default: 'Pass'
  },
  completionPercentage: {
    type: Number,
    min: [0, 'Completion percentage cannot be negative'],
    max: [100, 'Completion percentage cannot exceed 100'],
    default: 100
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow null for public certificate requests
  }
}, {
  timestamps: true
});

// Index for better query performance
certificateSchema.index({ studentId: 1 });
certificateSchema.index({ studentEmail: 1 });
certificateSchema.index({ status: 1 });
certificateSchema.index({ courseId: 1 });
certificateSchema.index({ issueDate: -1 });
certificateSchema.index({ createdAt: -1 });

// Compound indexes
certificateSchema.index({ studentEmail: 1, courseId: 1 }, { unique: true });
certificateSchema.index({ status: 1, createdAt: -1 });

// Pre-save middleware to generate certificate number
certificateSchema.pre('save', async function(next) {
  if (this.status === 'Approved' && !this.certificateNumber) {
    // Generate certificate number format: CERT-YYYY-MMDD-XXXX
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Find the last certificate number for today
    const todayStart = new Date(year, now.getMonth(), now.getDate());
    const todayEnd = new Date(year, now.getMonth(), now.getDate() + 1);
    
    const lastCert = await this.constructor.findOne({
      certificateNumber: { $regex: `^CERT-${year}-${month}${day}-` },
      createdAt: { $gte: todayStart, $lt: todayEnd }
    }).sort({ certificateNumber: -1 });
    
    let sequence = 1;
    if (lastCert) {
      const lastSequence = parseInt(lastCert.certificateNumber.split('-')[3]);
      sequence = lastSequence + 1;
    }
    
    this.certificateNumber = `CERT-${year}-${month}${day}-${String(sequence).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Certificate', certificateSchema);
