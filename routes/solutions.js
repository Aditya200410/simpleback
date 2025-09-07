const express = require('express');
const { createSolution, getAllSolutions, getSolutionById, updateSolution, deleteSolution } = require('../controllers/solutionController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Public routes (no authentication required)
// @route   GET /api/solutions/public
// @desc    Get all solutions (public access)
// @access  Public
router.get('/public', getAllSolutions);

// @route   GET /api/solutions/public/:id
// @desc    Get solution by ID (public access)
// @access  Public
router.get('/public/:id', getSolutionById);

// Private routes (authentication required)
router.use(auth);

// @route   POST /api/solutions
// @desc    Create a new solution
// @access  Private
router.post('/', createSolution);

// @route   GET /api/solutions
// @desc    Get all solutions
// @access  Private
router.get('/', getAllSolutions);

// @route   GET /api/solutions/:id
// @desc    Get solution by ID
// @access  Private
router.get('/:id', getSolutionById);

// @route   PUT /api/solutions/:id
// @desc    Update solution
// @access  Private
router.put('/:id', updateSolution);

// @route   DELETE /api/solutions/:id
// @desc    Delete solution
// @access  Private
router.delete('/:id', deleteSolution);

module.exports = router;
