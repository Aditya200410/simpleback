const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  // Student Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },

  // Course Information
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
  courseAmount: {
    type: Number,
    required: [true, 'Course amount is required'],
    min: [0, 'Course amount must be positive']
  },

  // Batch Information
  batchId: {
    type: String,
    trim: true
  },
  batchName: {
    type: String,
    trim: true
  },
  batchStartDate: {
    type: Date
  },
  batchEndDate: {
    type: Date
  },
  batchStatus: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  enrollmentType: {
    type: String,
    enum: ['online', 'offline', 'corporate'],
    default: 'online'
  },

  // Enrollment Details
  experience: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  motivation: {
    type: String,
    trim: true,
    maxlength: [500, 'Motivation cannot exceed 500 characters']
  },
  learningGoals: {
    type: String,
    trim: true,
    maxlength: [500, 'Learning goals cannot exceed 500 characters']
  },
  preferredStartDate: {
    type: Date
  },
  howDidYouHear: {
    type: String,
    enum: ['Google Search', 'Social Media', 'Friend/Colleague', 'Advertisement', 'Other', ''],
    default: ''
  },

  // Status and Payment
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded', 'Free'],
    default: function() {
      return this.courseAmount === 0 ? 'Free' : 'Pending';
    }
  },
  paymentId: {
    type: String,
    trim: true
  },

  // Timestamps and Metadata
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  approvedDate: {
    type: Date
  },
  completionDate: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Additional Information
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },

  // Progress Tracking
  progress: {
    type: Number,
    min: [0, 'Progress cannot be negative'],
    max: [100, 'Progress cannot exceed 100%'],
    default: 0
  },
  lastAccessDate: {
    type: Date
  },
  
  // Certificate Information
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateIssuedDate: {
    type: Date
  },
  certificateId: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
enrollmentSchema.index({ email: 1 });
enrollmentSchema.index({ courseId: 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ paymentStatus: 1 });
enrollmentSchema.index({ enrollmentDate: -1 });
enrollmentSchema.index({ email: 1, courseId: 1 }, { unique: true }); // Prevent duplicate enrollments

// Virtual for enrollment ID display
enrollmentSchema.virtual('enrollmentId').get(function() {
  return `ENR-${this._id.toString().slice(-8).toUpperCase()}`;
});

// Virtual to check if enrollment is active
enrollmentSchema.virtual('isActive').get(function() {
  return ['Approved', 'Completed'].includes(this.status);
});

// Pre-save middleware to set approval date
enrollmentSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'Approved' && !this.approvedDate) {
    this.approvedDate = new Date();
  }
  
  if (this.isModified('status') && this.status === 'Completed' && !this.completionDate) {
    this.completionDate = new Date();
    this.progress = 100;
  }
  
  next();
});

// Static method to get enrollment statistics
enrollmentSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const paymentStats = await this.aggregate([
    {
      $group: {
        _id: '$paymentStatus',
        count: { $sum: 1 },
        totalAmount: { $sum: '$courseAmount' }
      }
    }
  ]);

  const formattedStats = {
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    completed: 0,
    cancelled: 0
  };

  const formattedPaymentStats = {
    totalRevenue: 0,
    pending: 0,
    paid: 0,
    failed: 0,
    free: 0
  };

  stats.forEach(stat => {
    formattedStats.total += stat.count;
    formattedStats[stat._id.toLowerCase()] = stat.count;
  });

  paymentStats.forEach(stat => {
    formattedPaymentStats.totalRevenue += stat.totalAmount;
    formattedPaymentStats[stat._id.toLowerCase()] = stat.count;
  });

  return {
    enrollmentStats: formattedStats,
    paymentStats: formattedPaymentStats
  };
};

// Instance method to generate certificate
enrollmentSchema.methods.generateCertificate = function() {
  if (this.status === 'Completed' && !this.certificateIssued) {
    this.certificateIssued = true;
    this.certificateIssuedDate = new Date();
    this.certificateId = `CERT-${this._id.toString().slice(-8).toUpperCase()}-${Date.now()}`;
    return this.save();
  }
  return Promise.resolve(this);
};

module.exports = mongoose.model('Enrollment', enrollmentSchema);
