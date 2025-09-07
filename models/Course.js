const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true,
    maxlength: [100, 'Course name cannot exceed 100 characters']
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
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
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
    enum: ['Beginner', 'Intermediate', 'Advanced'],
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
courseSchema.index({ category: 1 });
courseSchema.index({ status: 1 });
courseSchema.index({ startDate: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Course', courseSchema);
