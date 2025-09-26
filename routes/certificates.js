const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  approveCertificate,
  rejectCertificate,
  issueCertificate,
  deleteCertificate,
  getCertificateStats,
  requestCertificate,
  getCertificatesByStudentEmail,
  getCertificateByStudentAndCourse,
  verifyCertificateByNumber,
  generateCertificateImage
} = require('../controllers/certificateController');

// Public routes (no authentication required)
router.post('/request', requestCertificate);
router.post('/generate', generateCertificateImage);
router.get('/student/:email', getCertificatesByStudentEmail);
router.get('/student/:email/course/:courseId', getCertificateByStudentAndCourse);
router.get('/verify/:certificateNumber', verifyCertificateByNumber);

// Protected routes (require authentication)
router.use(auth);

// GET /api/certificates/stats - Get certificate statistics
router.get('/stats', getCertificateStats);

// GET /api/certificates - Get all certificates
router.get('/', getAllCertificates);

// GET /api/certificates/:id - Get certificate by ID
router.get('/:id', getCertificateById);

// POST /api/certificates - Create new certificate request
router.post('/', createCertificate);

// PUT /api/certificates/:id - Update certificate
router.put('/:id', updateCertificate);

// PUT /api/certificates/:id/approve - Approve certificate
router.put('/:id/approve', approveCertificate);

// PUT /api/certificates/:id/reject - Reject certificate
router.put('/:id/reject', rejectCertificate);

// PUT /api/certificates/:id/issue - Issue certificate
router.put('/:id/issue', issueCertificate);

// DELETE /api/certificates/:id - Delete certificate
router.delete('/:id', deleteCertificate);

module.exports = router;
