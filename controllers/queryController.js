const Query = require('../models/Query');
const Course = require('../models/Course');

// Create a new query
const createQuery = async (req, res) => {
  try {
    const { fullName, email, phone, courseId, courseName, subject, question, priority } = req.body;

    // Validate required fields
    if (!fullName || !email || !courseId || !courseName || !subject || !question) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Create new query
    const query = new Query({
      fullName,
      email,
      phone,
      courseId,
      courseName: course.title || courseName, // Use course title from database
      subject,
      question,
      priority: priority || 'Medium'
    });

    await query.save();

    // Populate course details for response
    await query.populate('courseId', 'title category');

    res.status(201).json({
      success: true,
      message: 'Query submitted successfully',
      query: {
        id: query._id,
        fullName: query.fullName,
        email: query.email,
        phone: query.phone,
        courseId: query.courseId,
        courseName: query.courseName,
        subject: query.subject,
        question: query.question,
        priority: query.priority,
        status: query.status,
        createdAt: query.createdAt
      }
    });

  } catch (error) {
    console.error('Create query error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit query. Please try again.'
    });
  }
};

// Get all queries (admin only)
const getAllQueries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const priority = req.query.priority;
    const courseId = req.query.courseId;
    const search = req.query.search;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (courseId) filter.courseId = courseId;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { question: { $regex: search, $options: 'i' } },
        { courseName: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    // Get queries with pagination
    const queries = await Query.find(filter)
      .populate('courseId', 'title category price')
      .populate('respondedBy', 'email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Query.countDocuments(filter);

    // Get statistics
    const stats = await Query.aggregate([
      { $group: { 
          _id: '$status', 
          count: { $sum: 1 } 
      }},
      { $project: { 
          status: '$_id', 
          count: 1, 
          _id: 0 
      }}
    ]);

    const statusCounts = {
      Open: 0,
      'In Progress': 0,
      Resolved: 0,
      Closed: 0
    };

    stats.forEach(stat => {
      statusCounts[stat.status] = stat.count;
    });

    res.json({
      success: true,
      queries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalQueries: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      statistics: statusCounts
    });

  } catch (error) {
    console.error('Get queries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch queries'
    });
  }
};

// Get query by ID
const getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id)
      .populate('courseId', 'title category price description')
      .populate('respondedBy', 'email');

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    res.json({
      success: true,
      query
    });

  } catch (error) {
    console.error('Get query error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch query'
    });
  }
};

// Update query status and response (admin only)
const updateQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response, priority, tags } = req.body;

    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    // Update fields
    if (status) query.status = status;
    if (response) {
      query.response = response;
      query.respondedBy = req.user.id; // From auth middleware
      query.respondedAt = new Date();
    }
    if (priority) query.priority = priority;
    if (tags) query.tags = tags;

    await query.save();

    // Populate for response
    await query.populate('courseId', 'title category');
    await query.populate('respondedBy', 'email');

    res.json({
      success: true,
      message: 'Query updated successfully',
      query
    });

  } catch (error) {
    console.error('Update query error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update query'
    });
  }
};

// Delete query (admin only)
const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found'
      });
    }

    await Query.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Query deleted successfully'
    });

  } catch (error) {
    console.error('Delete query error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete query'
    });
  }
};

// Get queries by course (public - for FAQ display)
const getQueriesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const limit = parseInt(req.query.limit) || 5;

    // Only get resolved queries that are marked as public
    const queries = await Query.find({
      courseId,
      status: 'Resolved',
      isPublic: true
    })
    .select('subject question response createdAt')
    .sort({ createdAt: -1 })
    .limit(limit);

    res.json({
      success: true,
      queries
    });

  } catch (error) {
    console.error('Get course queries error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course queries'
    });
  }
};

// Get queries by email (public - for user to check their own queries)
const getQueriesByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate email format
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Get queries for this email
    const queries = await Query.find({ email: email.toLowerCase() })
      .populate('courseId', 'title category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Query.countDocuments({ email: email.toLowerCase() });

    res.json({
      success: true,
      queries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalQueries: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get queries by email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your queries'
    });
  }
};

module.exports = {
  createQuery,
  getAllQueries,
  getQueryById,
  updateQuery,
  deleteQuery,
  getQueriesByCourse,
  getQueriesByEmail
};
