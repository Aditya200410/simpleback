const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Set default environment variables if not provided
process.env.JWT_SECRET = process.env.JWT_SECRET || 'simple_admin_jwt_secret_key_2024_secure_token';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';
process.env.PORT = process.env.PORT || '5000';

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const dashboardRoutes = require('./routes/dashboard');
const categoryRoutes = require('./routes/categories');
const reviewRoutes = require('./routes/reviews');
const certificateRoutes = require('./routes/certificates');
const extraCategoryRoutes = require('./routes/extraCategories');
const enrollmentRoutes = require('./routes/enrollments');
const grcServiceRoutes = require('./routes/grcServices');
const queryRoutes = require('./routes/queries');
const paymentRoutes = require('./routes/payment');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/extra-categories', extraCategoryRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/grc-services', grcServiceRoutes);
app.use('/api/queries', queryRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/students', studentRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Public courses routes (bypass middleware)
const Course = require('./models/Course');
app.get('/api/courses/public', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      courses,
      total: courses.length
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
});

app.get('/api/courses/public/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('createdBy', 'email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
