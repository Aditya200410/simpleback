const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// All routes require authentication
router.use(auth);

// GET /api/categories - Get all categories
router.get('/', getAllCategories);

// GET /api/categories/:id - Get category by ID
router.get('/:id', getCategoryById);

// POST /api/categories - Create new category
router.post('/', createCategory);

// PUT /api/categories/:id - Update category
router.put('/:id', updateCategory);

// DELETE /api/categories/:id - Delete category
router.delete('/:id', deleteCategory);

module.exports = router;
