const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('@napi-rs/canvas');

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
      studentPhone,
      certificateName,
      courseId,
      courseName,
      expiryDate,
      grade,
      completionPercentage,
      notes,
      remark
    } = req.body;

    // Validate required fields
    if (!studentName || !studentId || !studentEmail || !studentPhone || !remark || !certificateName || !courseId || !courseName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: studentName, studentId, studentEmail, studentPhone, remark, certificateName, courseId, courseName'
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
      studentPhone,
      certificateName,
      courseId,
      courseName,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      grade: grade || 'Pass',
      completionPercentage: completionPercentage || 100,
      notes,
      remark,
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
      studentPhone,
      certificateName,
      expiryDate,
      grade,
      completionPercentage,
      notes,
      remark
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
    if (studentPhone) certificate.studentPhone = studentPhone;
    if (certificateName) certificate.certificateName = certificateName;
    if (expiryDate !== undefined) certificate.expiryDate = expiryDate ? new Date(expiryDate) : undefined;
    if (grade) certificate.grade = grade;
    if (completionPercentage !== undefined) certificate.completionPercentage = completionPercentage;
    if (notes !== undefined) certificate.notes = notes;
    if (remark !== undefined) certificate.remark = remark;

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
      studentPhone,
      certificateName,
      courseId,
      courseName,
      notes,
      remark
    } = req.body;

    // Validate required fields
    if (!studentName || !studentId || !studentEmail || !studentPhone || !remark || !courseId || !courseName) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: studentName, studentId, studentEmail, studentPhone, remark, courseId, courseName'
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
      studentPhone,
      certificateName: certificateName || `Certificate of Completion - ${courseName}`,
      courseId,
      courseName,
      notes: notes || `Certificate requested by student via web form on ${new Date().toLocaleDateString()}`,
      remark,
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

// Generate and download certificate image
const generateCertificateImage = async (req, res) => {
  try {
    const { studentName, studentPhone, studentEmail, courseName, remark } = req.body;

    // Validate required fields
    if (!studentName || !studentPhone || !studentEmail || !courseName || !remark) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: studentName, studentPhone, studentEmail, courseName, remark'
      });
    }

    // Check if certificate exists with these exact details
    const certificate = await Certificate.findOne({
      studentName: { $regex: new RegExp(studentName, 'i') },
      studentPhone,
      studentEmail: studentEmail.toLowerCase(),
      courseName: { $regex: new RegExp(courseName, 'i') },
      remark: { $regex: new RegExp(remark, 'i') },
      status: { $in: ['Approved', 'Issued'] }
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'No matching certificate found with the provided details'
      });
    }

    // Create canvas for certificate
    const canvas = createCanvas(1200, 800);
    const ctx = canvas.getContext('2d');

    // Set background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Add border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, 1120, 720);

    // Add inner border
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, 1080, 680);

    // Add decorative elements
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', 600, 120);

    // Add course name
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(courseName, 600, 180);

    // Add "This is to certify that"
    ctx.fillStyle = '#374151';
    ctx.font = '24px Arial';
    ctx.fillText('This is to certify that', 600, 250);

    // Add student name
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(studentName, 600, 320);

    // Add student details
    ctx.fillStyle = '#6b7280';
    ctx.font = '20px Arial';
    ctx.fillText(`Phone: ${studentPhone}`, 600, 380);
    ctx.fillText(`Email: ${studentEmail}`, 600, 410);

    // Add remark
    ctx.fillStyle = '#374151';
    ctx.font = '22px Arial';
    ctx.fillText(`Remark: ${remark}`, 600, 480);

    // Add completion text
    ctx.fillStyle = '#374151';
    ctx.font = '20px Arial';
    ctx.fillText('has successfully completed the course', 600, 550);

    // Add date
    const currentDate = new Date().toLocaleDateString('en-GB');
    ctx.fillStyle = '#6b7280';
    ctx.font = '18px Arial';
    ctx.fillText(`Date: ${currentDate}`, 600, 620);

    // Add certificate number if available
    if (certificate.certificateNumber) {
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px Arial';
      ctx.fillText(`Certificate #: ${certificate.certificateNumber}`, 600, 650);
    }

    // Add signature line
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 700);
    ctx.lineTo(400, 700);
    ctx.stroke();
    ctx.fillStyle = '#374151';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Authorized Signature', 300, 720);

    // Convert canvas to buffer
    const buffer = canvas.encode('png');

    // Set response headers
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="certificate-${studentName.replace(/\s+/g, '-')}-${courseName.replace(/\s+/g, '-')}.png"`);
    res.setHeader('Content-Length', buffer.length);

    // Send the image
    res.send(buffer);

  } catch (error) {
    console.error('Generate certificate image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate certificate image'
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
  verifyCertificateByNumber,
  generateCertificateImage
};
