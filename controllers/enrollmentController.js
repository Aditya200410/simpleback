const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const GRCService = require('../models/GRCService');
const Solution = require('../models/Solution');
const User = require('../models/User');
const { sendEnrollmentConfirmation, sendAdminNotification, sendAdminReply, sendRejectionEmail } = require('../services/emailService');

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
      grcServiceId,
      grcServiceName,
      grcServiceAmount,
      solutionId,
      solutionName,
      solutionAmount,
      experience,
      preferredStartDate,
      howDidYouHear,
      batchId,
      batchName,
      batchStartDate,
      batchEndDate,
      batchStatus,
      enrollmentType
    } = req.body;

    // Determine service type
    const hasCourse = courseId && courseName;
    const hasGRCService = grcServiceId && grcServiceName;
    const hasSolution = solutionId && solutionName;

    // Validate required fields based on service type
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: fullName, email, phone'
      });
    }

    if (!hasCourse && !hasGRCService && !hasSolution) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: courseId/courseName, grcServiceId/grcServiceName, or solutionId/solutionName'
      });
    }

    // Skip service validation to avoid course validation errors
    // We'll just use the provided service names and amounts

    // Check if user is already enrolled in this service
    let existingEnrollment = null;
    if (hasCourse) {
      existingEnrollment = await Enrollment.findOne({ email, courseId });
    } else if (hasGRCService) {
      existingEnrollment = await Enrollment.findOne({ email, grcServiceId });
    } else if (hasSolution) {
      existingEnrollment = await Enrollment.findOne({ email, solutionId });
    }

    if (existingEnrollment) {
      const serviceType = hasCourse ? 'course' : hasGRCService ? 'GRC service' : 'solution';
      return res.status(400).json({
        success: false,
        message: `You have already requested this ${serviceType}`
      });
    }

    // Skip batch validation to avoid course validation errors

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Determine final amount and payment status based on service type
    let finalAmount = 0;
    let paymentStatus = 'Pending';
    let status = 'Pending';

    if (hasCourse) {
      finalAmount = courseAmount || 0;
    } else if (hasGRCService) {
      finalAmount = grcServiceAmount || 0;
    } else if (hasSolution) {
      finalAmount = solutionAmount || 0;
    }

    // For GRC services and solutions, always set to pending for admin review
    if (hasGRCService || hasSolution) {
      status = 'Pending';
      paymentStatus = 'Pending';
    } else if (finalAmount === 0) {
      // Auto-approve free courses
      status = 'Approved';
      paymentStatus = 'Free';
    }

    // Create new enrollment with minimal required data
    const enrollmentData = {
      fullName,
      email,
      phone,
      experience: experience || 'Beginner',
      preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : undefined,
      howDidYouHear,
      batchId,
      batchName,
      batchStartDate: batchStartDate ? new Date(batchStartDate) : undefined,
      batchEndDate: batchEndDate ? new Date(batchEndDate) : undefined,
      batchStatus: batchStatus || 'Upcoming',
      enrollmentType: enrollmentType || (hasCourse ? 'online' : hasGRCService ? 'grc-service' : 'solution'),
      ipAddress,
      userAgent,
      status,
      paymentStatus
    };

    // Add service-specific data
    if (hasCourse) {
      enrollmentData.courseId = courseId;
      enrollmentData.courseName = courseName;
      enrollmentData.courseAmount = finalAmount;
    } else if (hasGRCService) {
      enrollmentData.grcServiceId = grcServiceId;
      enrollmentData.grcServiceName = grcServiceName;
      enrollmentData.grcServiceAmount = finalAmount;
    } else if (hasSolution) {
      enrollmentData.solutionId = solutionId;
      enrollmentData.solutionName = solutionName;
      enrollmentData.solutionAmount = finalAmount;
    }

    const enrollment = new Enrollment(enrollmentData);

    await enrollment.save();

    // Skip service enrollment count updates to avoid course validation errors

    // No need to populate service details to avoid validation issues
    // We already have the service name and amount from the enrollment data

    // Send confirmation email to student
    try {
      await sendEnrollmentConfirmation(enrollment);
    } catch (emailError) {
      console.error('Failed to send enrollment confirmation email:', emailError);
      // Don't fail the enrollment if email fails
    }

    // Send notification email to admin
    try {
      await sendAdminNotification(enrollment);
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Don't fail the enrollment if email fails
    }

    // Determine service name and amount for response
    const serviceName = enrollment.courseName || enrollment.grcServiceName || enrollment.solutionName;
    const serviceAmount = enrollment.courseAmount || enrollment.grcServiceAmount || enrollment.solutionAmount;

    res.status(201).json({
      success: true,
      message: 'Enrollment created successfully',
      enrollment: {
        id: enrollment._id,
        enrollmentId: enrollment.enrollmentId,
        fullName: enrollment.fullName,
        email: enrollment.email,
        serviceName,
        serviceAmount,
        batchName: enrollment.batchName,
        batchStatus: enrollment.batchStatus,
        enrollmentType: enrollment.enrollmentType,
        status: enrollment.status,
        paymentStatus: enrollment.paymentStatus,
        enrollmentDate: enrollment.enrollmentDate
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
      enrollmentType,
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
    if (enrollmentType) filter.enrollmentType = enrollmentType;

    console.log('Backend filter object:', filter); // Debug log

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

    console.log('Found enrollments:', enrollments.length, 'with enrollmentType filter:', enrollmentType); // Debug log

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

    // Handle rejection - delete enrollment and send rejection email
    if (status === 'Rejected') {
      // Send rejection email before deleting
      try {
        await sendRejectionEmail(enrollment);
      } catch (emailError) {
        console.error('Failed to send rejection email:', emailError);
        // Continue with deletion even if email fails
      }

      // Delete the enrollment
      await Enrollment.findByIdAndDelete(enrollmentId);

      return res.json({
        success: true,
        message: 'Enrollment rejected and deleted successfully. Rejection email sent to student.',
        deletedEnrollment: {
          id: enrollment._id,
          enrollmentId: enrollment.enrollmentId,
          fullName: enrollment.fullName,
          email: enrollment.email,
          serviceName: enrollment.courseName || enrollment.grcServiceName || enrollment.solutionName
        }
      });
    }

    // Update enrollment for non-rejection statuses
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

// Send email reply to student (admin only)
const sendEmailReply = async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const enrollmentId = req.params.id;

    if (!replyMessage || replyMessage.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Get admin user details
    const admin = await User.findById(req.userId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    // Send email reply
    const emailResult = await sendAdminReply(enrollment, replyMessage, admin.email);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send email reply',
        error: emailResult.error
      });
    }

    // Update enrollment with admin notes
    enrollment.notes = enrollment.notes ? 
      `${enrollment.notes}\n\nAdmin Reply (${new Date().toLocaleDateString()}): ${replyMessage}` : 
      `Admin Reply (${new Date().toLocaleDateString()}): ${replyMessage}`;
    
    await enrollment.save();

    res.json({
      success: true,
      message: 'Email reply sent successfully',
      emailId: emailResult.messageId
    });
  } catch (error) {
    console.error('Send email reply error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email reply'
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

// Create GRC service enrollment
const createGRCServiceEnrollment = async (req, res) => {
  try {
    console.log('GRC Service Enrollment Request Body:', req.body);
    
    const {
      fullName,
      email,
      phone,
      grcServiceId,
      grcServiceName,
      grcServiceAmount,
      motivation,
      learningGoals,
      preferredStartDate,
      howDidYouHear
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone || !grcServiceId || !grcServiceName) {
      console.log('Missing required fields:', { fullName, email, phone, grcServiceId, grcServiceName });
      return res.status(400).json({
        success: false,
        message: 'Required fields: fullName, email, phone, grcServiceId, grcServiceName'
      });
    }

    // Check if GRC service exists
    const grcService = await GRCService.findById(grcServiceId);
    if (!grcService) {
      return res.status(404).json({
        success: false,
        message: 'GRC service not found'
      });
    }

    // Check if user has already requested this GRC service
    const existingEnrollment = await Enrollment.findOne({ email, grcServiceId });
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You have already requested this GRC service'
      });
    }

    // Get client information
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Create new GRC service enrollment
    const enrollment = new Enrollment({
      fullName,
      email,
      phone,
      grcServiceId,
      grcServiceName,
      grcServiceAmount: grcServiceAmount || grcService.pricing?.startingFrom || 0,
      motivation,
      learningGoals,
      preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : undefined,
      howDidYouHear,
      enrollmentType: 'grc-service',
      ipAddress,
      userAgent,
      status: 'Pending', // Always pending for admin review
      paymentStatus: 'Pending'
    });

    try {
      await enrollment.save();
    } catch (saveError) {
      console.error('Enrollment save error:', saveError);
      return res.status(400).json({
        success: false,
        message: saveError.message || 'Failed to save enrollment'
      });
    }

    // Populate GRC service details
    await enrollment.populate('grcServiceId', 'title category shortDescription');

    // Send confirmation email to student (optional)
    try {
      await sendEnrollmentConfirmation(enrollment);
    } catch (emailError) {
      console.error('Failed to send enrollment confirmation email:', emailError);
      // Don't fail the enrollment if email fails
    }

    // Send notification email to admin (optional)
    try {
      await sendAdminNotification(enrollment);
    } catch (emailError) {
      console.error('Failed to send admin notification email:', emailError);
      // Don't fail the enrollment if email fails
    }

    res.status(201).json({
      success: true,
      message: 'GRC service request submitted successfully',
      enrollment: {
        id: enrollment._id,
        enrollmentId: enrollment.enrollmentId,
        fullName: enrollment.fullName,
        email: enrollment.email,
        serviceName: enrollment.grcServiceName,
        serviceAmount: enrollment.grcServiceAmount,
        enrollmentType: enrollment.enrollmentType,
        status: enrollment.status,
        paymentStatus: enrollment.paymentStatus,
        enrollmentDate: enrollment.enrollmentDate
      }
    });
  } catch (error) {
    console.error('Create GRC service enrollment error:', error);
    
    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + error.message
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create GRC service enrollment'
    });
  }
};

module.exports = {
  createEnrollment,
  createGRCServiceEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus,
  updateEnrollmentProgress,
  generateCertificate,
  getEnrollmentStats,
  sendEmailReply,
  deleteEnrollment
};
