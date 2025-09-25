const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  solutionName: {
    type: String,
    required: [true, 'Solution name is required'],
    trim: true,
    maxlength: [100, 'Solution name cannot exceed 100 characters']
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
    trim: true,
    enum: [
      'Software development',
      'Website Development',
      'Infra Hardening Solutions ( Cloud, Network , System)',
      'MDM/AV solutions',
      'Awareness Training',
      'Red, Blue, Purple Team Assessment'
    ]
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  detailedDescription: {
    type: String,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  icon: {
    type: String,
    required: true,
    default: '🚀'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  complexity: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Advanced', 'Enterprise'],
    required: [true, 'Solution complexity is required']
  },
  features: [{
    type: String,
    trim: true,
    maxlength: [100, 'Each feature cannot exceed 100 characters']
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
    trim: true
  }],
  deliverables: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each deliverable cannot exceed 200 characters']
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
  industry: [{
    type: String,
    trim: true
  }],
  compliance: [{
    type: String,
    trim: true
  }],
  faq: [{
    question: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, 'Question cannot exceed 200 characters']
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, 'Answer cannot exceed 1000 characters']
    }
  }],
  caseStudies: [{
    title: String,
    description: String,
    industry: String,
    results: [String]
  }],
  relatedSolutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Solution'
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Completed', 'Archived'],
    default: 'Active'
  },
  clientsServed: {
    type: Number,
    default: 0
  },
  // Solution provider details
  providerName: {
    type: String,
    trim: true,
    maxlength: [100, 'Provider name cannot exceed 100 characters']
  },
  providerBio: {
    type: String,
    trim: true,
    maxlength: [500, 'Provider bio cannot exceed 500 characters']
  },
  providerExperience: {
    type: String,
    trim: true,
    maxlength: [200, 'Provider experience cannot exceed 200 characters']
  },
  providerQualifications: {
    type: String,
    trim: true,
    maxlength: [300, 'Provider qualifications cannot exceed 300 characters']
  },
  targetAudience: {
    type: String,
    trim: true,
    maxlength: [500, 'Target audience description cannot exceed 500 characters']
  },
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
solutionSchema.index({ solutionName: 'text', shortDescription: 'text', detailedDescription: 'text' });
solutionSchema.index({ status: 1 });
solutionSchema.index({ complexity: 1 });
solutionSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Solution', solutionSchema);
