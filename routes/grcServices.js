const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getAllGRCServices,
  getGRCServiceById,
  getGRCServiceBySlug,
  createGRCService,
  updateGRCService,
  deleteGRCService,
  toggleGRCServiceStatus,
  getGRCServiceCategories,
  reorderGRCServices
} = require('../controllers/grcServiceController');

// Public routes (no authentication required)
router.get('/', getAllGRCServices);
router.get('/categories', getGRCServiceCategories);
router.get('/slug/:slug', getGRCServiceBySlug);
router.get('/:id', getGRCServiceById);

// Protected routes (authentication required)
router.post('/', auth, createGRCService);
router.put('/:id', auth, updateGRCService);
router.delete('/:id', auth, deleteGRCService);
router.patch('/:id/toggle-status', auth, toggleGRCServiceStatus);
router.post('/reorder', auth, reorderGRCServices);

module.exports = router;
