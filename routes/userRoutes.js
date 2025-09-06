const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// All user routes require authentication
router.use(authenticateToken);

// Get current user profile (moved from auth routes for consistency)
router.get('/profile', userController.getUserById);

// Admin only routes
router.get('/', requireAdmin, userController.getAllUsers);
router.get('/stats', requireAdmin, userController.getUserStats);
router.get('/:id', requireAdmin, userController.getUserById);
router.put('/:id/role', requireAdmin, userController.updateUserRole);
router.put('/:id/deactivate', requireAdmin, userController.deactivateUser);
router.put('/:id/activate', requireAdmin, userController.activateUser);
router.delete('/:id', requireAdmin, userController.deleteUser);

module.exports = router;
