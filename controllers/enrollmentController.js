const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Create a new enrollment
const createEnrollment = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      courseId,
      courseName,
      courseAmount,
      experience,
      motivation,
      learningGoals,
      preferredStartDate,
      howDidYouHear
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !courseId || !courseName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: fullName, email, phone, courseId, courseName'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is already enrolled in this course
    const existingEnrollment = await Enrollment.findOne({ email, courseId });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create new enrollment
    const enrollment = new Enrollment({
      fullName,
      email,
      phone,
      courseId,
      courseName,
      courseAmount: courseAmount !== undefined ? courseAmount : course.amount,
      experience: experience || 'Beginner',
      motivation,
      learningGoals,
      preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : undefined,
      howDidYouHear,
      ipAddress,
      userAgent,
      status: course.amount === 0 ? 'Approved' : 'Pending', // Auto-approve free courses
      paymentStatus: course.amount === 0 ? 'Free' : 'Pending'
    });

    await enrollment.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrolledStudents: 1 }
    });

    // Populate course details
    await enrollment.populate('courseId', 'courseName category level totalHours');

    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      enrollment: {
        id: enrollment._id,
        enrollmentId: enrollment.enrollmentId,
        fullName: enrollment.fullName,
        email: enrollment.email,
        courseName: enrollment.courseName,
        status: enrollment.status,
        paymentStatus: enrollment.paymentStatus,
        enrollmentDate: enrollment.enrollmentDate,
        courseAmount: enrollment.courseAmount
      }
    });
  } catch (error) {
    console.error('Create enrollment error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create enrollment'
    });
  }
};

// Get all enrollments (admin only)
const getAllEnrollments = async (req, res) => {
  try {
    const { 
      status, 
      paymentStatus, 
      courseId, 
      email, 
      page = 1, 
      limit = 10,
      sortBy = 'enrollmentDate',
      sortOrder = 'desc'
    } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (courseId) filter.courseId = courseId;
    if (email) filter.email = { $regex: new RegExp(email, 'i') };

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get enrollments with pagination
    const enrollments = await Enrollment.find(filter)
      .populate('courseId', 'courseName category level totalHours amount')
      .populate('approvedBy', 'email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalEnrollments = await Enrollment.countDocuments(filter);
    const totalPages = Math.ceil(totalEnrollments / parseInt(limit));

    res.json({
      success: true,
      enrollments,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalEnrollments,
        hasNextPage: parseInt(page) < totalPages,
        hasPreviousPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments'
    });
  }
};

// Get enrollment by ID
const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('courseId', 'courseName category level totalHours amount description')
      .populate('approvedBy', 'email');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    res.json({
      success: true,
      enrollment
    });
  } catch (error) {
    console.error('Get enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollment'
    });
  }
};

// Update enrollment status (admin only)
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const enrollmentId = req.params.id;

    if (!status || !['Pending', 'Approved', 'Rejected', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (Pending, Approved, Rejected, Completed, Cancelled)'
      });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Update enrollment
    enrollment.status = status;
    if (notes) enrollment.notes = notes;
    if (status === 'Approved') enrollment.approvedBy = req.userId;

    await enrollment.save();

    // Populate references
    await enrollment.populate('courseId', 'courseName category');
    await enrollment.populate('approvedBy', 'email');

    res.json({
      success: true,
      message: `Enrollment ${status.toLowerCase()} successfully`,
      enrollment
    });
  } catch (error) {
    console.error('Update enrollment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enrollment status'
    });
  }
};

// Update enrollment progress
const updateEnrollmentProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const enrollmentId = req.params.id;

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: 'Progress must be between 0 and 100'
      });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    enrollment.progress = progress;
    enrollment.lastAccessDate = new Date();

    // Auto-complete if progress is 100%
    if (progress === 100 && enrollment.status === 'Approved') {
      enrollment.status = 'Completed';
    }

    await enrollment.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      enrollment: {
        id: enrollment._id,
        progress: enrollment.progress,
        status: enrollment.status,
        lastAccessDate: enrollment.lastAccessDate
      }
    });
  } catch (error) {
    console.error('Update enrollment progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update enrollment progress'
    });
  }
};

// Generate certificate for completed enrollment
const generateCertificate = async (req, res) => {
  try {
    const enrollmentId = req.params.id;

    const enrollment = await Enrollment.findById(enrollmentId)
      .populate('courseId', 'courseName category');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    if (enrollment.status !== 'Completed') {
      return res.status(400).json({
        success: false,
        message: 'Certificate can only be generated for completed enrollments'
      });
    }

    if (enrollment.certificateIssued) {
      return res.status(400).json({
        success: false,
        message: 'Certificate has already been issued for this enrollment'
      });
    }

    // Generate certificate
    await enrollment.generateCertificate();

    res.json({
      success: true,
      message: 'Certificate generated successfully',
      certificate: {
        certificateId: enrollment.certificateId,
        issuedDate: enrollment.certificateIssuedDate,
        studentName: enrollment.fullName,
        courseName: enrollment.courseName
      }
    });
  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate certificate'
    });
  }
};

// Get enrollment statistics
const getEnrollmentStats = async (req, res) => {
  try {
    const stats = await Enrollment.getStats();

    // Get recent enrollments
    const recentEnrollments = await Enrollment.find()
      .populate('courseId', 'courseName category')
      .sort({ enrollmentDate: -1 })
      .limit(5)
      .select('fullName email courseName status enrollmentDate');

    // Get top courses by enrollment
    const topCourses = await Enrollment.aggregate([
      {
        $group: {
          _id: '$courseId',
          enrollmentCount: { $sum: 1 },
          courseName: { $first: '$courseName' }
        }
      },
      { $sort: { enrollmentCount: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      stats: {
        ...stats,
        recentEnrollments,
        topCourses
      }
    });
  } catch (error) {
    console.error('Get enrollment stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollment statistics'
    });
  }
};

// Delete enrollment (admin only)
const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Don't allow deletion of completed enrollments with certificates
    if (enrollment.status === 'Completed' && enrollment.certificateIssued) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete completed enrollment with issued certificate'
      });
    }

    // Update course enrollment count
    await Course.findByIdAndUpdate(enrollment.courseId, {
      $inc: { enrolledStudents: -1 }
    });

    await Enrollment.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Enrollment deleted successfully'
    });
  } catch (error) {
    console.error('Delete enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete enrollment'
    });
  }
};

module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  updateEnrollmentProgress,
  generateCertificate,
  getEnrollmentStats,
  deleteEnrollment
};
