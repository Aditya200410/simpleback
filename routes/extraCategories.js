const express = require('express');
const {
  createExtraCategory,
  getAllExtraCategories,
  getExtraCategoriesByType,
  getExtraCategoryById,
  updateExtraCategory,
  deleteExtraCategory,
  getAvailableCourses
} = require('../controllers/extraCategoryController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
// @route   GET /api/extra-categories/public/:type
// @desc    Get courses by extra category type (public access)
// @access  Public
router.get('/public/:type', getExtraCategoriesByType);

// Private routes (authentication required)
router.use(auth);

// @route   GET /api/extra-categories/available-courses
// @desc    Get available courses for assignment
// @access  Private
router.get('/available-courses', getAvailableCourses);

// @route   POST /api/extra-categories
// @desc    Create a new extra category assignment
// @access  Private
router.post('/', createExtraCategory);

// @route   GET /api/extra-categories
// @desc    Get all extra category assignments
// @access  Private
router.get('/', getAllExtraCategories);

// @route   GET /api/extra-categories/:id
// @desc    Get extra category assignment by ID
// @access  Private
router.get('/:id', getExtraCategoryById);

// @route   PUT /api/extra-categories/:id
// @desc    Update extra category assignment
// @access  Private
router.put('/:id', updateExtraCategory);

// @route   DELETE /api/extra-categories/:id
// @desc    Delete extra category assignment
// @access  Private
router.delete('/:id', deleteExtraCategory);

module.exports = router;
