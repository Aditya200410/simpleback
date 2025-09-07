const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createReview,
  getCourseReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview
} = require('../controllers/reviewController');

// All routes require authentication
router.use(auth);

// POST /api/reviews - Create new review
router.post('/', createReview);

// GET /api/reviews - Get all reviews (admin)
router.get('/', getAllReviews);

// GET /api/reviews/course/:courseId - Get reviews for a specific course
router.get('/course/:courseId', getCourseReviews);

// PUT /api/reviews/:reviewId/status - Approve/reject review
router.put('/:reviewId/status', updateReviewStatus);

// DELETE /api/reviews/:reviewId - Delete review
router.delete('/:reviewId', deleteReview);

module.exports = router;
