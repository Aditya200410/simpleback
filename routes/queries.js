const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createQuery,
  getAllQueries,
  getQueryById,
  updateQuery,
  deleteQuery,
  getQueriesByCourse,
  getQueriesByEmail
} = require('../controllers/queryController');

// Public routes (no authentication required)
router.post('/', createQuery); // Submit a query
router.get('/course/:courseId', getQueriesByCourse); // Get public queries for a course
router.get('/email/:email', getQueriesByEmail); // Get queries by email for user to check their own queries

// Protected routes (admin authentication required)
router.get('/', auth, getAllQueries); // Get all queries (admin)
router.get('/:id', auth, getQueryById); // Get specific query (admin)
router.put('/:id', auth, updateQuery); // Update query (admin)
router.delete('/:id', auth, deleteQuery); // Delete query (admin)

module.exports = router;
