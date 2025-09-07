const express = require('express');
const { getDashboardStats, getAllStudents, getAllCertificates } = require('../controllers/dashboardController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', getDashboardStats);

// @route   GET /api/dashboard/students
// @desc    Get all students
// @access  Private
router.get('/students', getAllStudents);

// @route   GET /api/dashboard/certificates
// @desc    Get all certificates
// @access  Private
router.get('/certificates', getAllCertificates);

module.exports = router;
