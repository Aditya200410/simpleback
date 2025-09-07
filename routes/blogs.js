const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createBlog,
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogStats
} = require('../controllers/blogController');

// Public routes (no authentication required)
router.get('/public', getPublishedBlogs);
router.get('/public/slug/:slug', getBlogBySlug);

// Protected routes (authentication required)
router.use(auth); // Apply auth middleware to all routes below

// Admin routes
router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/stats', getBlogStats);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
