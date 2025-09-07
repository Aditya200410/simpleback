const ExtraCategory = require('../models/ExtraCategory');
const Course = require('../models/Course');

// @desc    Create a new extra category assignment
// @route   POST /api/extra-categories
// @access  Private
const createExtraCategory = async (req, res) => {
  try {
    const { courseId, categoryType, priority, discountPercentage, originalPrice, discountedPrice, reason, startDate, endDate } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if this course is already assigned to this category type
    const existingAssignment = await ExtraCategory.findOne({ courseId, categoryType });
    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: `Course is already assigned to ${categoryType} category`
      });
    }

    const extraCategoryData = {
      courseId,
      categoryType,
      priority: priority || 0,
      reason: reason || '',
      createdBy: req.userId
    };

    // Add discount-specific fields if category type is 'discounted'
    if (categoryType === 'discounted') {
      if (!discountPercentage || !originalPrice || !discountedPrice) {
        return res.status(400).json({
          success: false,
          message: 'Discount percentage, original price, and discounted price are required for discounted courses'
        });
      }
      extraCategoryData.discountPercentage = discountPercentage;
      extraCategoryData.originalPrice = originalPrice;
      extraCategoryData.discountedPrice = discountedPrice;
    }

    // Add date fields if provided
    if (startDate) extraCategoryData.startDate = new Date(startDate);
    if (endDate) extraCategoryData.endDate = new Date(endDate);

    const extraCategory = new ExtraCategory(extraCategoryData);
    await extraCategory.save();

    // Populate course details
    await extraCategory.populate('courseId', 'courseName category description amount level averageRating totalReviews enrolledStudents');
    await extraCategory.populate('createdBy', 'email');

    res.status(201).json({
      success: true,
      message: 'Extra category assignment created successfully',
      extraCategory
    });
  } catch (error) {
    console.error('Create extra category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create extra category assignment'
    });
  }
};

// @desc    Get all extra categories with optional filters
// @route   GET /api/extra-categories
// @access  Private
const getAllExtraCategories = async (req, res) => {
  try {
    const { categoryType, isActive, limit, page } = req.query;
    
    // Build filter object
    const filter = {};
    if (categoryType) filter.categoryType = categoryType;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    // Add date filter for active assignments
    const now = new Date();
    if (isActive === 'true') {
      filter.$or = [
        { endDate: { $exists: false } },
        { endDate: null },
        { endDate: { $gte: now } }
      ];
      filter.startDate = { $lte: now };
    }

    // Pagination
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const extraCategories = await ExtraCategory.find(filter)
      .populate('courseId', 'courseName category description amount level averageRating totalReviews enrolledStudents startDate endDate status')
      .populate('createdBy', 'email')
      .sort({ priority: -1, createdAt: -1 })
      .limit(limitNumber)
      .skip(skip);

    const total = await ExtraCategory.countDocuments(filter);

    res.json({
      success: true,
      extraCategories,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
        totalItems: total,
        hasNext: pageNumber < Math.ceil(total / limitNumber),
        hasPrev: pageNumber > 1
      }
    });
  } catch (error) {
    console.error('Get extra categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch extra categories'
    });
  }
};

// @desc    Get extra categories by type (public access)
// @route   GET /api/extra-categories/public/:type
// @access  Public
const getExtraCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { limit } = req.query;

    if (!['best', 'recommended', 'discounted'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category type'
      });
    }

    const limitNumber = parseInt(limit) || 10;
    const now = new Date();

    const extraCategories = await ExtraCategory.find({
      categoryType: type,
      isActive: true,
      startDate: { $lte: now },
      $or: [
        { endDate: { $exists: false } },
        { endDate: null },
        { endDate: { $gte: now } }
      ]
    })
    .populate('courseId', 'courseName category description amount shortDescription level averageRating totalReviews enrolledStudents startDate endDate status skillsYouWillLearn')
    .sort({ priority: -1, createdAt: -1 })
    .limit(limitNumber);

    // Filter out courses that don't exist or are inactive
    const validExtraCategories = extraCategories.filter(ec => 
      ec.courseId && ec.courseId.status === 'Active'
    );

    res.json({
      success: true,
      categoryType: type,
      courses: validExtraCategories,
      count: validExtraCategories.length
    });
  } catch (error) {
    console.error('Get extra categories by type error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses by category type'
    });
  }
};

// @desc    Get extra category by ID
// @route   GET /api/extra-categories/:id
// @access  Private
const getExtraCategoryById = async (req, res) => {
  try {
    const extraCategory = await ExtraCategory.findById(req.params.id)
      .populate('courseId')
      .populate('createdBy', 'email');

    if (!extraCategory) {
      return res.status(404).json({
        success: false,
        message: 'Extra category assignment not found'
      });
    }

    res.json({
      success: true,
      extraCategory
    });
  } catch (error) {
    console.error('Get extra category by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch extra category assignment'
    });
  }
};

// @desc    Update extra category
// @route   PUT /api/extra-categories/:id
// @access  Private
const updateExtraCategory = async (req, res) => {
  try {
    const { priority, discountPercentage, originalPrice, discountedPrice, reason, isActive, startDate, endDate } = req.body;

    const extraCategory = await ExtraCategory.findById(req.params.id);
    if (!extraCategory) {
      return res.status(404).json({
        success: false,
        message: 'Extra category assignment not found'
      });
    }

    // Update fields
    if (priority !== undefined) extraCategory.priority = priority;
    if (reason !== undefined) extraCategory.reason = reason;
    if (isActive !== undefined) extraCategory.isActive = isActive;
    if (startDate !== undefined) extraCategory.startDate = startDate ? new Date(startDate) : null;
    if (endDate !== undefined) extraCategory.endDate = endDate ? new Date(endDate) : null;

    // Update discount-specific fields if category type is 'discounted'
    if (extraCategory.categoryType === 'discounted') {
      if (discountPercentage !== undefined) extraCategory.discountPercentage = discountPercentage;
      if (originalPrice !== undefined) extraCategory.originalPrice = originalPrice;
      if (discountedPrice !== undefined) extraCategory.discountedPrice = discountedPrice;
    }

    await extraCategory.save();

    // Populate course details
    await extraCategory.populate('courseId', 'courseName category description amount level averageRating totalReviews enrolledStudents');
    await extraCategory.populate('createdBy', 'email');

    res.json({
      success: true,
      message: 'Extra category assignment updated successfully',
      extraCategory
    });
  } catch (error) {
    console.error('Update extra category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update extra category assignment'
    });
  }
};

// @desc    Delete extra category
// @route   DELETE /api/extra-categories/:id
// @access  Private
const deleteExtraCategory = async (req, res) => {
  try {
    const extraCategory = await ExtraCategory.findById(req.params.id);
    if (!extraCategory) {
      return res.status(404).json({
        success: false,
        message: 'Extra category assignment not found'
      });
    }

    await ExtraCategory.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Extra category assignment deleted successfully'
    });
  } catch (error) {
    console.error('Delete extra category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete extra category assignment'
    });
  }
};

// @desc    Get available courses for extra category assignment
// @route   GET /api/extra-categories/available-courses
// @access  Private
const getAvailableCourses = async (req, res) => {
  try {
    const { categoryType } = req.query;

    // Get all active courses
    const allCourses = await Course.find({ status: 'Active' })
      .select('courseName category description amount level averageRating totalReviews enrolledStudents')
      .sort({ courseName: 1 });

    // If categoryType is specified, filter out courses already assigned to that category
    let availableCourses = allCourses;
    if (categoryType) {
      const assignedCourseIds = await ExtraCategory.find({ 
        categoryType, 
        isActive: true 
      }).distinct('courseId');
      
      availableCourses = allCourses.filter(course => 
        !assignedCourseIds.some(id => id.toString() === course._id.toString())
      );
    }

    res.json({
      success: true,
      courses: availableCourses,
      count: availableCourses.length
    });
  } catch (error) {
    console.error('Get available courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available courses'
    });
  }
};

module.exports = {
  createExtraCategory,
  getAllExtraCategories,
  getExtraCategoriesByType,
  getExtraCategoryById,
  updateExtraCategory,
  deleteExtraCategory,
  getAvailableCourses
};
