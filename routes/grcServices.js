const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getAllGRCServices,
  getGRCServiceById,
  createGRCService,
  updateGRCService,
  deleteGRCService,
  toggleGRCServiceStatus,
  getGRCServiceCategories
} = require('../controllers/grcServiceController');

// Public routes (no authentication required)
router.get('/', getAllGRCServices);
router.get('/categories', getGRCServiceCategories);
router.get('/:id', getGRCServiceById);

// Protected routes (authentication required)
router.post('/', auth, createGRCService);
router.put('/:id', auth, updateGRCService);
router.delete('/:id', auth, deleteGRCService);
router.patch('/:id/toggle-status', auth, toggleGRCServiceStatus);

module.exports = router;
