const Certificate = require('../models/Certificate');
const Course = require('../models/Course');

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

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  updateCertificate,
  approveCertificate,
  rejectCertificate,
  issueCertificate,
  deleteCertificate,
  getCertificateStats
};
