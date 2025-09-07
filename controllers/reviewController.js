const Review = require('../models/Review');
const Course = require('../models/Course');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { courseId, studentName, studentEmail, rating, reviewText } = req.body;

    // Validate required fields
    if (!courseId || !studentName || !studentEmail || !rating || !reviewText) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: courseId, studentName, studentEmail, rating, reviewText'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if review already exists for this email and course
    const existingReview = await Review.findOne({ courseId, studentEmail });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a review for this course'
      });
    }

    // Create new review
    const review = new Review({
      courseId,
      studentName,
      studentEmail,
      rating,
      reviewText,
      createdBy: req.userId
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully. It will be visible after approval.',
      review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create review'
    });
  }
};

// Get all reviews for a course
const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { includeUnapproved = false } = req.query;

    // Build filter
    const filter = { courseId };
    if (!includeUnapproved) {
      filter.isApproved = true;
    }

    const reviews = await Review.find(filter)
      .populate('approvedBy', 'email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
      total: reviews.length
    });
  } catch (error) {
    console.error('Get course reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
};

// Get all reviews (admin)
const getAllReviews = async (req, res) => {
  try {
    const { status, courseId } = req.query;

    // Build filter
    const filter = {};
    if (status === 'approved') filter.isApproved = true;
    if (status === 'pending') filter.isApproved = false;
    if (courseId) filter.courseId = courseId;

    const reviews = await Review.find(filter)
      .populate('courseId', 'courseName')
      .populate('approvedBy', 'email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
      total: reviews.length
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
};

// Approve/Reject review
const updateReviewStatus = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { isApproved } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.isApproved = isApproved;
    if (isApproved) {
      review.approvedBy = req.userId;
      review.approvedAt = new Date();
    } else {
      review.approvedBy = undefined;
      review.approvedAt = undefined;
    }

    await review.save();

    // Update course rating if approved
    if (isApproved) {
      await updateCourseRating(review.courseId);
    }

    res.json({
      success: true,
      message: `Review ${isApproved ? 'approved' : 'rejected'} successfully`,
      review
    });
  } catch (error) {
    console.error('Update review status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review status'
    });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const courseId = review.courseId;
    await Review.findByIdAndDelete(reviewId);

    // Update course rating after deletion
    await updateCourseRating(courseId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review'
    });
  }
};

// Helper function to update course rating
const updateCourseRating = async (courseId) => {
  try {
    const reviews = await Review.find({ courseId, isApproved: true });
    
    const course = await Course.findById(courseId);
    if (!course) return;

    if (reviews.length === 0) {
      course.averageRating = 0;
      course.totalReviews = 0;
    } else {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      course.averageRating = Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal
      course.totalReviews = reviews.length;
    }

    await course.save();
  } catch (error) {
    console.error('Update course rating error:', error);
  }
};

module.exports = {
  createReview,
  getCourseReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
};
