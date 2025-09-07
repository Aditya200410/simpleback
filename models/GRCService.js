const mongoose = require('mongoose');

const grcServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    default: '🛡️'
  },
  features: [{
    type: String,
    required: true
  }],
  duration: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    enum: ['Essential', 'Critical', 'Enterprise', 'Strategic'],
    default: 'Essential'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for better performance
grcServiceSchema.index({ category: 1, isActive: 1 });
grcServiceSchema.index({ level: 1, isActive: 1 });
grcServiceSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('GRCService', grcServiceSchema);
