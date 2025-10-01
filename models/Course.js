const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
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
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  // Pricing for different enrollment types
  pricing: {
    online: {
      amount: {
        type: Number,
        required: [true, 'Online amount is required'],
        min: [0, 'Online amount must be positive']
      },
      hasEMI: {
        type: Boolean,
        default: false
      },
      description: {
        type: [String],
        required: [true, 'Online description is required']
      }
    },
    offline: {
      amount: {
        type: Number,
        required: [true, 'Offline amount is required'],
        min: [0, 'Offline amount must be positive']
      },
      status: {
        type: String,
        enum: ['coming_soon', 'opened', 'not_available'],
        default: 'not_available'
      },
      location: {
        type: String,
        default: ''
      },
      description: {
        type: [String],
        required: [true, 'Offline description is required']
      }
    },
    corporate: {
      amount: {
        type: Number,
        required: [true, 'Corporate amount is required'],
        min: [0, 'Corporate amount must be positive']
      },
      description: {
        type: [String],
        required: [true, 'Corporate description is required']
      }
    }
  },
  // Legacy amount field for backward compatibility
  amount: {
    type: Number,
    min: [0, 'Amount must be positive']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  totalHours: {
    type: Number,
    required: [true, 'Total hours is required'],
    min: [1, 'Total hours must be at least 1']
  },
  // New fields
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
    required: [true, 'Course level is required']
  },
  skillsYouWillLearn: [{
    type: String,
    trim: true,
    maxlength: [100, 'Each skill cannot exceed 100 characters']
  }],
  whoShouldTakeThisCourse: {
    type: String,
    trim: true,
    maxlength: [500, 'Target audience description cannot exceed 500 characters']
  },
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
    enum: ['Draft', 'Active', 'Completed', 'Cancelled'],
    default: 'Active'
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  // Instructor details
  instructorName: {
    type: String,
    trim: true,
    maxlength: [100, 'Instructor name cannot exceed 100 characters']
  },
  instructorBio: {
    type: String,
    trim: true,
    maxlength: [500, 'Instructor bio cannot exceed 500 characters']
  },
  instructorExperience: {
    type: String,
    trim: true,
    maxlength: [200, 'Instructor experience cannot exceed 200 characters']
  },
  instructorQualifications: {
    type: String,
    trim: true,
    maxlength: [300, 'Instructor qualifications cannot exceed 300 characters']
  },
  // Course batches
  batches: [{
    batchName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Batch name cannot exceed 100 characters']
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function(value) {
          return value > this.startDate;
        },
        message: 'Batch end date must be after start date'
      }
    },
    maxStudents: {
      type: Number,
      default: 30,
      min: [1, 'Max students must be at least 1']
    },
    enrolledStudents: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Upcoming'
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Batch description cannot exceed 200 characters']
    }
  }],
  
  // New fields from InfosecTrain analysis
  vendor: {
    type: String,
    trim: true,
    maxlength: [100, 'Vendor name cannot exceed 100 characters'],
    default: 'CyberAtrix',
    // Treat empty strings as undefined so default applies
    set: v => (v && v.trim() !== '' ? v : undefined)
  },
  certificationBody: {
    type: String,
    trim: true,
    maxlength: [100, 'Certification body cannot exceed 100 characters'],
    default: 'CyberAtrix',
    // Treat empty strings as undefined so default applies
    set: v => (v && v.trim() !== '' ? v : undefined)
  },
  certificationName: {
    type: String,
    trim: true,
    maxlength: [200, 'Certification name cannot exceed 200 characters'],
    default:'CyberAtrix'
  },
  examDetails: {
    examFormat: {
      type: String,
      // optional
    },
    examDuration: {
      type: Number, // in minutes
      min: [0, 'Exam duration must be positive']
    },
    passingScore: {
      type: Number,
      min: [0, 'Passing score must be between 0-100'],
      max: [100, 'Passing score must be between 0-100']
    },
    totalQuestions: {
      type: Number,
      min: [0, 'Total questions must be positive']
    },
    examLanguage: {
      type: [String],
      default: ['English']
    }
  },
  prerequisites: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each prerequisite cannot exceed 200 characters']
  }],
  learningObjectives: [{
    type: String,
    trim: true,
    maxlength: [300, 'Each learning objective cannot exceed 300 characters']
  }],
  courseModules: [{
    moduleName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Module name cannot exceed 100 characters']
    },
    moduleDescription: {
      type: String,
      trim: true,
      maxlength: [500, 'Module description cannot exceed 500 characters']
    },
    duration: {
      type: Number, // in hours
      min: [0, 'Module duration must be positive']
    },
    topics: [{
      type: String,
      trim: true,
      maxlength: [200, 'Each topic cannot exceed 200 characters']
    }]
  }],
  careerBenefits: {
    jobRoles: [{
      type: String,
      trim: true,
      maxlength: [100, 'Each job role cannot exceed 100 characters']
    }],
    averageSalary: {
      type: String,
      trim: true,
      maxlength: [50, 'Average salary cannot exceed 50 characters']
    },
    careerPath: {
      type: String,
      trim: true,
      maxlength: [500, 'Career path cannot exceed 500 characters']
    }
  },
  courseMaterials: {
    included: [{
      type: String,
      trim: true,
      maxlength: [100, 'Each material cannot exceed 100 characters']
    }],
    additionalCost: {
      type: Number,
      default: 0,
      min: [0, 'Additional cost must be positive']
    }
  },
  learningMode: {
    type: [String],
    enum: ['Live Online', 'Self-Paced', 'Classroom', 'Hybrid', 'Instructor-Led', 'Live Instructor-Led', 'Self-Practice'],
    // optional
  },
  courseLanguage: {
    type: [String],
    default: ['English']
  },
  refundPolicy: {
    policy: {
      type: String,
      trim: true,
      maxlength: [500, 'Refund policy cannot exceed 500 characters']
    },
    validityDays: {
      type: Number,
      default: 7,
      min: [0, 'Refund validity must be positive']
    }
  },
  courseHighlights: [{
    type: String,
    trim: true,
    maxlength: [200, 'Each highlight cannot exceed 200 characters']
  }],
  targetAudience: [{
    type: String,
    trim: true,
    maxlength: [100, 'Each target audience cannot exceed 100 characters']
  }],
  courseFormat: {
    type: String,
    enum: ['Video', 'Live Sessions', 'Text', 'Interactive', 'Mixed', 'Hybrid', 'Live & Practical'],
    // optional
  },
  accessDuration: {
    type: Number, // in days
    default: 365,
    min: [1, 'Access duration must be at least 1 day']
  },
  supportDetails: {
    supportType: {
      type: [String],
      enum: ['Email', 'Phone', 'Live Chat', 'Forum', 'Mentor', 'Slack community', 'Weekly live office hours', 'Dedicated mentor support', 'Weekly feedback calls', 'Peer practice groups', 'One-to-one coaching slots'],
      // optional
    },
    supportHours: {
      type: String,
      trim: true,
      maxlength: [100, 'Support hours cannot exceed 100 characters']
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
// Pre-save middleware to generate slug if not provided
courseSchema.pre('save', function(next) {
  if (!this.slug && this.courseName) {
    this.slug = this.courseName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens
  }
  next();
});

courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ startDate: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ averageRating: -1 });
courseSchema.index({ slug: 1 });

module.exports = mongoose.model('Course', courseSchema);
