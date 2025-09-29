const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
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
    required: [true, 'Category is required'],
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
  duration: {
    type: String,
    required: true,
    trim: true
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
  paymentDetails: {
    moneyBackGuarantee: {
      type: String,
      default: '30 days Money back guarantee'
    },
    emiFacilities: {
      type: String,
      default: 'EMI facilities also available 3-6 months for startups companies'
    },
    termsAndConditions: {
      type: String,
      default: '*terms and conditions apply'
    }
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
  caseStudies: [{
    title: String,
    description: String,
    industry: String,
    results: [String]
  }],
  // Keep original field for backward compatibility
  relatedServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  // Preferred field name aligned with frontend usage
  relatedSolutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
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
solutionSchema.index({ category: 1, isActive: 1 });
solutionSchema.index({ slug: 1 });
solutionSchema.index({ industry: 1, isActive: 1 });
solutionSchema.index({ title: 'text', shortDescription: 'text', detailedDescription: 'text' });

module.exports = mongoose.model('Solution', solutionSchema);
