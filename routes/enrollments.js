const express = require('express');
const {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  updateEnrollmentProgress,
  generateCertificate,
  getEnrollmentStats,
  deleteEnrollment
} = require('../controllers/enrollmentController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
// @route   POST /api/enrollments/public
// @desc    Create a new enrollment (public access)
// @access  Public
router.post('/public', createEnrollment);

// Private routes (authentication required)
router.use(auth);

// @route   GET /api/enrollments/stats
// @desc    Get enrollment statistics
// @access  Private (Admin)
router.get('/stats', getEnrollmentStats);

// @route   GET /api/enrollments
// @desc    Get all enrollments with filters and pagination
// @access  Private (Admin)
router.get('/', getAllEnrollments);

// @route   GET /api/enrollments/:id
// @desc    Get enrollment by ID
// @access  Private (Admin)
router.get('/:id', getEnrollmentById);

// @route   PUT /api/enrollments/:id/status
// @desc    Update enrollment status
// @access  Private (Admin)
router.put('/:id/status', updateEnrollmentStatus);

// @route   PUT /api/enrollments/:id/progress
// @desc    Update enrollment progress
// @access  Private (Admin/Student)
router.put('/:id/progress', updateEnrollmentProgress);

// @route   POST /api/enrollments/:id/certificate
// @desc    Generate certificate for completed enrollment
// @access  Private (Admin)
router.post('/:id/certificate', generateCertificate);

// @route   DELETE /api/enrollments/:id
// @desc    Delete enrollment
// @access  Private (Admin)
router.delete('/:id', deleteEnrollment);

module.exports = router;
