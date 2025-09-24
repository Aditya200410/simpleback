const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createGRCCategory,
  getAllGRCCategories,
  getGRCCategoryById,
  updateGRCCategory,
  deleteGRCCategory
} = require('../controllers/grcCategoryController');

// All routes require authentication
router.use(auth);

// GET /api/grc-categories - Get all GRC categories
router.get('/', getAllGRCCategories);

// GET /api/grc-categories/:id - Get GRC category by ID
router.get('/:id', getGRCCategoryById);

// POST /api/grc-categories - Create new GRC category
router.post('/', createGRCCategory);

// PUT /api/grc-categories/:id - Update GRC category
router.put('/:id', updateGRCCategory);

// DELETE /api/grc-categories/:id - Delete GRC category
router.delete('/:id', deleteGRCCategory);

module.exports = router;
