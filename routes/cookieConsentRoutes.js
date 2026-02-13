const express = require('express');
const router = express.Router();
const { saveConsent, getAllConsents } = require('../controllers/cookieConsentController');

router.post('/', saveConsent);
router.get('/', getAllConsents);

module.exports = router;
