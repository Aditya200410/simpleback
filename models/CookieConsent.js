const mongoose = require('mongoose');

const CookieConsentSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String
    },
    consentDate: {
        type: Date,
        default: Date.now
    },
    accepted: {
        type: Boolean,
        default: true
    },
    preferences: {
        analytics: { type: Boolean, default: true },
        marketing: { type: Boolean, default: true },
        functional: { type: Boolean, default: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CookieConsent', CookieConsentSchema);
