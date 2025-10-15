const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters'],
    match: [/^[A-Za-z\s]+$/, 'Full name can only contain letters and spaces']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  // Either course or GRC service will be provided
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  courseName: {
    type: String,
    trim: true
  },
  grcServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GRCService'
  },
  grcServiceName: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    maxlength: [2000, 'Question cannot exceed 2000 characters']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  response: {
    type: String,
    trim: true,
    maxlength: [5000, 'Response cannot exceed 5000 characters']
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
querySchema.index({ courseId: 1, status: 1, createdAt: -1 });
querySchema.index({ grcServiceId: 1, status: 1, createdAt: -1 });
querySchema.index({ email: 1, createdAt: -1 });
querySchema.index({ status: 1, priority: 1, createdAt: -1 });

// Virtual for query age
querySchema.virtual('ageInDays').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Method to mark as resolved
querySchema.methods.markAsResolved = function(response, respondedBy) {
  this.status = 'Resolved';
  this.response = response;
  this.respondedBy = respondedBy;
  this.respondedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Query', querySchema);
