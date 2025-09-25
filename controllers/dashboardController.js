const Course = require('../models/Course');
const Student = require('../models/Student');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// Get dashboard analytics
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    
    // Get enrollment statistics
    const enrollmentStats = await Enrollment.getStats();
    const totalEnrollments = enrollmentStats.enrollmentStats.total;
    const pendingEnrollments = enrollmentStats.enrollmentStats.pending;
    const approvedEnrollments = enrollmentStats.enrollmentStats.approved;
    const completedEnrollments = enrollmentStats.enrollmentStats.completed;
    
    // Count certificates
    const certificateResult = await Student.aggregate([
      { $unwind: { path: '$certificates', preserveNullAndEmptyArrays: true } },
      { $match: { 'certificates': { $exists: true, $ne: null } } },
      { $count: 'total' }
    ]);
    const totalCertificates = certificateResult.length > 0 ? certificateResult[0].total : 0;
    
    // Calculate total revenue from enrollments
    const enrollmentRevenue = await Enrollment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $add: [
                { $ifNull: ['$courseAmount', 0] },
                { $ifNull: ['$grcServiceAmount', 0] },
                { $ifNull: ['$solutionAmount', 0] }
              ]
            }
          }
        }
      }
    ]);
    const totalRevenue = enrollmentRevenue.length > 0 ? enrollmentRevenue[0].totalRevenue : 0;

    // Get recent activities (last 10 students)
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email createdAt');

    // Get recent enrollments
    const recentEnrollments = await Enrollment.find()
      .sort({ enrollmentDate: -1 })
      .limit(10)
      .select('fullName email courseName grcServiceName solutionName status enrollmentDate enrollmentType');

    // Get course statistics
    const courseStats = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$amount' }
        }
      }
    ]);

    // Get monthly revenue (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyRevenue = await Student.aggregate([
      { $unwind: '$enrolledCourses' },
      {
        $match: {
          'enrolledCourses.enrollmentDate': { $gte: sixMonthsAgo }
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'enrolledCourses.course',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },
      { $unwind: '$courseDetails' },
      {
        $group: {
          _id: {
            year: { $year: '$enrolledCourses.enrollmentDate' },
            month: { $month: '$enrolledCourses.enrollmentDate' }
          },
          revenue: { $sum: '$courseDetails.amount' },
          enrollments: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalCourses,
        totalCertificates,
        totalRevenue,
        totalEnrollments,
        pendingEnrollments,
        approvedEnrollments,
        completedEnrollments
      },
      recentStudents,
      recentEnrollments,
      courseStats,
      monthlyRevenue
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('enrolledCourses.course', 'courseName category amount')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      students,
      total: students.length
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students'
    });
  }
};

// Get all certificates
const getAllCertificates = async (req, res) => {
  try {
    const certificates = await Student.aggregate([
      { $unwind: '$certificates' },
      {
        $lookup: {
          from: 'courses',
          localField: 'certificates.course',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },
      { $unwind: '$courseDetails' },
      {
        $project: {
          studentName: '$name',
          studentEmail: '$email',
          courseName: '$courseDetails.courseName',
          category: '$courseDetails.category',
          certificateId: '$certificates.certificateId',
          issuedDate: '$certificates.issuedDate'
        }
      },
      { $sort: { issuedDate: -1 } }
    ]);

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

module.exports = {
  getDashboardStats,
  getAllStudents,
  getAllCertificates
};
