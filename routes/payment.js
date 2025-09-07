const express = require('express');
const router = express.Router();
const {
  createPaymentOrder,
  handlePaymentCallback,
  checkPaymentStatus
} = require('../controllers/paymentController');

// Create payment order
router.post('/create-order', createPaymentOrder);

// Handle payment callback from PhonePe
router.post('/callback', handlePaymentCallback);

// Check payment status
router.get('/status/:transactionId', checkPaymentStatus);

module.exports = router;
