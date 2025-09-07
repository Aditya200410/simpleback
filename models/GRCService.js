const mongoose = require('mongoose');

const grcServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true
  },
  detailedDescription: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    default: '🛡️'
  },
  features: [{
    type: String,
    required: true
  }],
  benefits: [{
    title: String,
    description: String
  }],
  process: [{
    step: Number,
    title: String,
    description: String,
    duration: String
  }],
  requirements: [{
    type: String,
    required: true
  }],
  deliverables: [{
    type: String,
    required: true
  }],
  pricing: {
    startingFrom: Number,
    currency: {
      type: String,
      default: 'INR'
    },
    includes: [String],
    excludes: [String]
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  industry: [{
    type: String,
    trim: true
  }],
  compliance: [{
    type: String,
    trim: true
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  testimonials: [{
    name: String,
    company: String,
    position: String,
    content: String,
    rating: Number
  }],
  caseStudies: [{
    title: String,
    description: String,
    industry: String,
    results: [String]
  }],
  relatedServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GRCService'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better performance
grcServiceSchema.index({ category: 1, isActive: 1 });
grcServiceSchema.index({ slug: 1 });
grcServiceSchema.index({ industry: 1, isActive: 1 });
grcServiceSchema.index({ title: 'text', shortDescription: 'text', detailedDescription: 'text' });

module.exports = mongoose.model('GRCService', grcServiceSchema);
