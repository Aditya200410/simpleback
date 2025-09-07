const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Student = require('../models/Student');

// Get all students (admin only)
const getAllStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, 'i') } },
        { email: { $regex: new RegExp(search, 'i') } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get students with pagination
    const students = await Student.find(filter)
      .populate('enrolledCourses.course', 'courseName category level amount')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalStudents = await Student.countDocuments(filter);
    const totalPages = Math.ceil(totalStudents / parseInt(limit));

    res.json({
      success: true,
      students,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalStudents,
        hasNextPage: parseInt(page) < totalPages,
        hasPreviousPage: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students'
    });
  }
};

// Get student by ID (admin only)
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('enrolledCourses.course', 'courseName category level amount description')
      .populate('certificates.course', 'courseName category');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      student
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student'
    });
  }
};

// Get student statistics (admin only)
const getStudentStats = async (req, res) => {
  try {
    const stats = await Student.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get top students by courses enrolled
    const topStudents = await Student.aggregate([
      {
        $addFields: {
          coursesCount: { $size: '$enrolledCourses' }
        }
      },
      { $sort: { coursesCount: -1 } },
      { $limit: 10 },
      {
        $project: {
          name: 1,
          email: 1,
          coursesCount: 1,
          totalAmountPaid: 1
        }
      }
    ]);

    // Get revenue by month
    const revenueByMonth = await Student.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalRevenue: { $sum: '$totalAmountPaid' },
          studentsCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    const formattedStats = {
      total: 0,
      active: 0,
      inactive: 0,
      graduated: 0
    };

    stats.forEach(stat => {
      formattedStats.total += stat.count;
      formattedStats[stat._id.toLowerCase()] = stat.count;
    });

    res.json({
      success: true,
      stats: {
        studentStats: formattedStats,
        topStudents,
        revenueByMonth
      }
    });
  } catch (error) {
    console.error('Get student stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student statistics'
    });
  }
};

// Update student status (admin only)
const updateStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const studentId = req.params.id;

    if (!status || !['Active', 'Inactive', 'Graduated'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (Active, Inactive, Graduated)'
      });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    student.status = status;
    await student.save();

    res.json({
      success: true,
      message: `Student status updated to ${status}`,
      student
    });
  } catch (error) {
    console.error('Update student status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update student status'
    });
  }
};

// Delete student (admin only)
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if student has active enrollments
    if (student.enrolledCourses.some(course => course.status === 'Enrolled')) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete student with active enrollments'
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student'
    });
  }
};

// Apply middleware and define routes
router.use(auth);
router.use(adminAuth);

router.get('/', getAllStudents);
router.get('/stats', getStudentStats);
router.get('/:id', getStudentById);
router.put('/:id/status', updateStudentStatus);
router.delete('/:id', deleteStudent);

module.exports = router;
