const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

// Helper function to add certificate to student record
const addCertificateToStudent = async (certificate) => {
  try {
    // Find or create student record
    let student = await Student.findOne({ email: certificate.studentEmail });
    
    if (!student) {
      // Create new student record if doesn't exist
      student = new Student({
        name: certificate.studentName,
        email: certificate.studentEmail,
        enrolledCourses: [],
        certificates: []
      });
    }

    // Check if certificate already exists in student record
    const existingCertIndex = student.certificates.findIndex(cert => 
      cert.course.toString() === certificate.courseId.toString()
    );

    const certificateData = {
      course: certificate.courseId,
      issuedDate: certificate.approvedAt || new Date(),
      certificateId: certificate.certificateNumber
    };

    if (existingCertIndex >= 0) {
      // Update existing certificate
      student.certificates[existingCertIndex] = certificateData;
    } else {
      // Add new certificate
      student.certificates.push(certificateData);
    }

    // Also ensure the course is in enrolled courses if not already there
    const existingEnrollment = student.enrolledCourses.find(course => 
      course.course.toString() === certificate.courseId.toString()
    );

    if (!existingEnrollment) {
      student.enrolledCourses.push({
        course: certificate.courseId,
        enrollmentDate: new Date(),
        status: 'Completed',
        progress: 100
      });
    } else {
      // Update enrollment status to completed
      existingEnrollment.status = 'Completed';
      existingEnrollment.progress = 100;
    }

    await student.save();
    console.log(`Certificate added to student record for ${certificate.studentEmail}`);
  } catch (error) {
    console.error('Error adding certificate to student record:', error);
    throw error;
  }
};

// Create a new certificate request
const createCertificate = async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      studentEmail,
      certificateName,
      courseId,
      courseName,
      expiryDate,
      grade,
      completionPercentage,
      notes
    } = req.body;

    // Validate required fields
    if (!studentName || !studentId || !studentEmail || !certificateName || !courseId || !courseName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: studentName, studentId, studentEmail, certificateName, courseId, courseName'
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

    // Check if certificate already exists for this student and course
    const existingCertificate = await Certificate.findOne({ studentId, courseId });
    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: 'Certificate already exists for this student and course'
      });
    }

    // Create new certificate
    const certificate = new Certificate({
      studentName,
      studentId,
      studentEmail,
      certificateName,
      courseId,
      courseName,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      grade: grade || 'Pass',
      completionPercentage: completionPercentage || 100,
      notes,
      createdBy: req.userId
    });

    await certificate.save();

    // Populate references
    await certificate.populate('courseId', 'courseName category');
    await certificate.populate('createdBy', 'email');

    res.status(201).json({
      success: true,
      message: 'Certificate request created successfully',
      certificate
    });
  } catch (error) {
    console.error('Create certificate error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create certificate request'
    });
  }
};

// Get all certificates
const getAllCertificates = async (req, res) => {
  try {
    const { status, courseId, studentId } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;
    if (studentId) filter.studentId = { $regex: new RegExp(studentId, 'i') };

    const certificates = await Certificate.find(filter)
      .populate('courseId', 'courseName category')
      .populate('createdBy', 'email')
      .populate('approvedBy', 'email')
      .populate('rejectedBy', 'email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      certificates,
      total: certificates.length
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates'
    });
  }
};

// Get certificate by ID
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate('courseId', 'courseName category')
      .populate('createdBy', 'email')
      .populate('approvedBy', 'email')
      .populate('rejectedBy', 'email');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      certificate
    });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate'
    });
  }
};

// Update certificate
const updateCertificate = async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      certificateName,
      expiryDate,
      grade,
      completionPercentage,
      notes
    } = req.body;

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Only allow updates if certificate is not approved or issued
    if (certificate.status === 'Approved' || certificate.status === 'Issued') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update approved or issued certificates'
      });
    }

    // Update fields
    if (studentName) certificate.studentName = studentName;
    if (studentEmail) certificate.studentEmail = studentEmail;
    if (certificateName) certificate.certificateName = certificateName;
    if (expiryDate !== undefined) certificate.expiryDate = expiryDate ? new Date(expiryDate) : undefined;
    if (grade) certificate.grade = grade;
    if (completionPercentage !== undefined) certificate.completionPercentage = completionPercentage;
    if (notes !== undefined) certificate.notes = notes;

    await certificate.save();

    // Populate references
    await certificate.populate('courseId', 'courseName category');
    await certificate.populate('createdBy', 'email');

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      certificate
    });
  } catch (error) {
    console.error('Update certificate error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update certificate'
    });
  }
};

// Approve certificate
const approveCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    if (certificate.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: `Cannot approve certificate with status: ${certificate.status}`
      });
    }

    certificate.status = 'Approved';
    certificate.approvedBy = req.userId;
    certificate.approvedAt = new Date();
    
    // Clear rejection fields if previously rejected
    certificate.rejectedBy = undefined;
    certificate.rejectedAt = undefined;
    certificate.rejectionReason = undefined;

    await certificate.save();

    // Add certificate to student record
    try {
      await addCertificateToStudent(certificate);
    } catch (studentError) {
      console.error('Failed to add certificate to student record:', studentError);
      // Don't fail the approval if student record update fails
    }

    // Populate references
    await certificate.populate('courseId', 'courseName category');
    await certificate.populate('approvedBy', 'email');

    res.json({
      success: true,
      message: 'Certificate approved successfully',
      certificate
    });
  } catch (error) {
    console.error('Approve certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve certificate'
    });
  }
};

// Reject certificate
const rejectCertificate = async (req, res) => {
  try {
    const { rejectionReason } = req.body;

    if (!rejectionReason || !rejectionReason.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    if (certificate.status === 'Issued') {
      return res.status(400).json({
        success: false,
        message: 'Cannot reject issued certificates'
      });
    }

    certificate.status = 'Rejected';
    certificate.rejectedBy = req.userId;
    certificate.rejectedAt = new Date();
    certificate.rejectionReason = rejectionReason.trim();
    
    // Clear approval fields if previously approved
    certificate.approvedBy = undefined;
    certificate.approvedAt = undefined;
    certificate.certificateNumber = undefined;

    await certificate.save();

    // Populate references
    await certificate.populate('courseId', 'courseName category');
    await certificate.populate('rejectedBy', 'email');

    res.json({
      success: true,
      message: 'Certificate rejected successfully',
      certificate
    });
  } catch (error) {
    console.error('Reject certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject certificate'
    });
  }
};

// Issue certificate (mark as issued)
const issueCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    if (certificate.status !== 'Approved') {
      return res.status(400).json({
        success: false,
        message: 'Only approved certificates can be issued'
      });
    }

    certificate.status = 'Issued';
    await certificate.save();

    // Ensure certificate is in student record (in case approval didn't work)
    try {
      await addCertificateToStudent(certificate);
    } catch (studentError) {
      console.error('Failed to add certificate to student record during issue:', studentError);
      // Don't fail the issue if student record update fails
    }

    // Populate references
    await certificate.populate('courseId', 'courseName category');
    await certificate.populate('approvedBy', 'email');

    res.json({
      success: true,
      message: 'Certificate issued successfully',
      certificate
    });
  } catch (error) {
    console.error('Issue certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to issue certificate'
    });
  }
};

// Delete certificate
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    // Only allow deletion if certificate is not issued
    if (certificate.status === 'Issued') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete issued certificates'
      });
    }

    await Certificate.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error) {
    console.error('Delete certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete certificate'
    });
  }
};

// Get certificate statistics
const getCertificateStats = async (req, res) => {
  try {
    const stats = await Certificate.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      issued: 0
    };

    stats.forEach(stat => {
      formattedStats.total += stat.count;
      formattedStats[stat._id.toLowerCase()] = stat.count;
    });

    res.json({
      success: true,
      stats: formattedStats
    });
  } catch (error) {
    console.error('Get certificate stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate statistics'
    });
  }
};

// Public certificate request (no authentication required)
const requestCertificate = async (req, res) => {
  try {
    const {
      studentName,
      studentId,
      studentEmail,
      certificateName,
      courseId,
      courseName,
      notes
    } = req.body;

    // Validate required fields
    if (!studentName || !studentId || !studentEmail || !courseId || !courseName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: studentName, studentId, studentEmail, courseId, courseName'
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

    // Check if certificate already exists for this student and course
    const existingCertificate = await Certificate.findOne({ 
      studentEmail: studentEmail.toLowerCase(),
      courseId 
    });
    
    if (existingCertificate) {
      return res.status(400).json({
        success: false,
        message: 'Certificate request already exists for this student and course',
        certificate: existingCertificate
      });
    }

    // Create new certificate request
    const certificate = new Certificate({
      studentName,
      studentId,
      studentEmail: studentEmail.toLowerCase(),
      certificateName: certificateName || `Certificate of Completion - ${courseName}`,
      courseId,
      courseName,
      notes: notes || `Certificate requested by student via web form on ${new Date().toLocaleDateString()}`,
      // For public requests, we'll use a system user ID or null
      createdBy: null
    });

    await certificate.save();

    // Populate course information
    await certificate.populate('courseId', 'courseName category');

    res.status(201).json({
      success: true,
      message: 'Certificate request submitted successfully. You will be notified once it is reviewed.',
      certificate
    });
  } catch (error) {
    console.error('Request certificate error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit certificate request'
    });
  }
};

// Get certificates by student email (public access)
const getCertificatesByStudentEmail = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const certificates = await Certificate.find({ 
      studentEmail: email.toLowerCase() 
    })
      .populate('courseId', 'courseName category')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      certificates,
      total: certificates.length
    });
  } catch (error) {
    console.error('Get certificates by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates'
    });
  }
};

// Get certificate by student email and course (public access)
const getCertificateByStudentAndCourse = async (req, res) => {
  try {
    const { email, courseId } = req.params;
    
    if (!email || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'Email and course ID are required'
      });
    }

    const certificate = await Certificate.findOne({ 
      studentEmail: email.toLowerCase(),
      courseId 
    })
      .populate('courseId', 'courseName category');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.json({
      success: true,
      certificate
    });
  } catch (error) {
    console.error('Get certificate by student and course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificate'
    });
  }
};

// Verify certificate by certificate number (public access)
const verifyCertificateByNumber = async (req, res) => {
  try {
    const { certificateNumber } = req.params;
    
    if (!certificateNumber) {
      return res.status(400).json({
        success: false,
        message: 'Certificate number is required'
      });
    }

    const certificate = await Certificate.findOne({ 
      certificateNumber,
      status: { $in: ['Approved', 'Issued'] }
    })
      .populate('courseId', 'courseName category')
      .select('-createdBy -approvedBy -rejectedBy -notes');

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found or not yet issued'
      });
    }

    res.json({
      success: true,
      certificate,
      verified: true
    });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate'
    });
  }
};

module.exports = {
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
  verifyCertificateByNumber
};
