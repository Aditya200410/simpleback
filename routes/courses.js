const express = require('express');
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, searchCourses } = require('../controllers/courseController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
// @route   GET /api/courses/public
// @desc    Get all courses (public access)
// @access  Public
router.get('/public', getAllCourses);

// @route   GET /api/courses/public/:id
// @desc    Get course by ID (public access)
// @access  Public
router.get('/public/:id', getCourseById);

// @route   GET /api/courses/search
// @desc    Search courses (public access)
// @access  Public
router.get('/search', searchCourses);

// Private routes (authentication required)
router.use(auth);

// @route   POST /api/courses
// @desc    Create a new course
// @access  Private
router.post('/', createCourse);

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get('/', getAllCourses);

// @route   GET /api/courses/:id
// @desc    Get course by ID
// @access  Private
router.get('/:id', getCourseById);

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private
router.put('/:id', updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private
router.delete('/:id', deleteCourse);

module.exports = router;
