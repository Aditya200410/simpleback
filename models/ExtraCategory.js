const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course ID is required']
  },
  categoryType: {
    type: String,
    enum: ['best', 'recommended', 'discounted'],
    required: [true, 'Category type is required']
  },
  priority: {
    type: Number,
    default: 0,
    min: 0
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  discountedPrice: {
    type: Number,
    min: 0
  },
  reason: {
    type: String,
    trim: true,
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
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
extraCategorySchema.index({ categoryType: 1 });
extraCategorySchema.index({ courseId: 1 });
extraCategorySchema.index({ isActive: 1 });
extraCategorySchema.index({ priority: -1 });
extraCategorySchema.index({ startDate: 1, endDate: 1 });

// Compound index for unique course per category type
extraCategorySchema.index({ courseId: 1, categoryType: 1 }, { unique: true });

// Validation for discounted courses
extraCategorySchema.pre('save', function(next) {
  if (this.categoryType === 'discounted') {
    if (!this.discountPercentage || this.discountPercentage <= 0) {
      return next(new Error('Discount percentage is required for discounted courses'));
    }
    if (!this.originalPrice || this.originalPrice <= 0) {
      return next(new Error('Original price is required for discounted courses'));
    }
    if (!this.discountedPrice || this.discountedPrice <= 0) {
      return next(new Error('Discounted price is required for discounted courses'));
    }
    if (this.discountedPrice >= this.originalPrice) {
      return next(new Error('Discounted price must be less than original price'));
    }
  }
  next();
});

// Virtual for calculating actual discount percentage
extraCategorySchema.virtual('actualDiscountPercentage').get(function() {
  if (this.originalPrice && this.discountedPrice && this.originalPrice > 0) {
    return Math.round(((this.originalPrice - this.discountedPrice) / this.originalPrice) * 100);
  }
  return 0;
});

module.exports = mongoose.model('ExtraCategory', extraCategorySchema);
