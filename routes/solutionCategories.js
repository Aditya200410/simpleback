const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createSolutionCategory,
  getAllSolutionCategories,
  getSolutionCategoryById,
  updateSolutionCategory,
  deleteSolutionCategory,
  getPublicSolutionCategories
} = require('../controllers/solutionCategoryController');

// Public routes (no authentication required)
// GET /api/solution-categories/public - Get all active categories (public access)
router.get('/public', getPublicSolutionCategories);

// Private routes (authentication required)
router.use(auth);

// GET /api/solution-categories - Get all categories
router.get('/', getAllSolutionCategories);

// GET /api/solution-categories/:id - Get category by ID
router.get('/:id', getSolutionCategoryById);

// POST /api/solution-categories - Create new category
router.post('/', createSolutionCategory);

// PUT /api/solution-categories/:id - Update category
router.put('/:id', updateSolutionCategory);

// DELETE /api/solution-categories/:id - Delete category
router.delete('/:id', deleteSolutionCategory);

module.exports = router;


