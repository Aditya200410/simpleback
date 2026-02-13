const CookieConsent = require('../models/CookieConsent');

// @desc    Save cookie consent
// @route   POST /api/cookie-consent
// @access  Public
exports.saveConsent = async (req, res) => {
    try {
        const { preferences } = req.body;

        // Get IP from request
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];

        const consent = await CookieConsent.create({
            ip: Array.isArray(ip) ? ip[0] : ip,
            userAgent,
            preferences,
            consentDate: new Date()
        });

        res.status(201).json({
            success: true,
            data: consent
        });
    } catch (error) {
        console.error('Save consent error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while saving consent'
        });
    }
};

// @desc    Get all consents (for admin)
// @route   GET /api/cookie-consent
// @access  Private/Admin
exports.getAllConsents = async (req, res) => {
    try {
        const consents = await CookieConsent.find().sort({ consentDate: -1 });

        res.status(200).json({
            success: true,
            count: consents.length,
            data: consents
        });
    } catch (error) {
        console.error('Get consents error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching consents'
        });
    }
};
