const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getPublicCategories,
  reorderCategories
} = require('../controllers/categoryController');

// Public routes (no authentication required)
// GET /api/categories/public - Get all active categories (public access)
router.get('/public', getPublicCategories);

// All routes below require authentication
router.use(auth);

// GET /api/categories - Get all categories
router.get('/', getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', getCategoryById);

// POST /api/categories - Create new category
router.post('/', createCategory);

// POST /api/categories/reorder - Reorder categories
router.post('/reorder', reorderCategories);

// PUT /api/categories/:id - Update category
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', deleteCategory);

module.exports = router;
