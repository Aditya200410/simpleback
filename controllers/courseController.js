const Course = require('../models/Course');
const Student = require('../models/Student');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { 
      courseName, 
      category, 
      description, 
      amount, 
      startDate, 
      endDate, 
      totalHours,
      shortDescription,
      level,
      skillsYouWillLearn,
      whoShouldTakeThisCourse,
      faq,
      pricing,
      batches
    } = req.body;

    // Validate required fields
    if (!courseName || !category || !description || !amount || !startDate || !endDate || !totalHours || !level) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: courseName, category, description, amount, startDate, endDate, totalHours, level'
      });
    }

    // Process skills array
    let processedSkills = [];
    if (skillsYouWillLearn) {
      processedSkills = Array.isArray(skillsYouWillLearn) 
        ? skillsYouWillLearn.filter(skill => skill && skill.trim())
        : skillsYouWillLearn.split(',').map(skill => skill.trim()).filter(skill => skill);
    }

    // Process FAQ array
    let processedFAQ = [];
    if (faq && Array.isArray(faq)) {
      processedFAQ = faq.filter(item => item.question && item.answer);
    }

    // Process pricing object
    let processedPricing = {
      online: { amount: 0, description: [] },
      offline: { amount: 0, description: [] },
      corporate: { amount: 0, description: [] }
    };
    if (pricing) {
      processedPricing = pricing;
    }

    // Process batches array
    let processedBatches = [];
    if (batches && Array.isArray(batches)) {
      processedBatches = batches.map(batch => ({
        ...batch,
        startDate: new Date(batch.startDate),
        endDate: new Date(batch.endDate),
        maxStudents: parseInt(batch.maxStudents) || 30,
        enrolledStudents: parseInt(batch.enrolledStudents) || 0
      }));
    }

    // Create new course
    const course = new Course({
      courseName,
      category,
      description,
      amount,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalHours,
      shortDescription,
      level,
      skillsYouWillLearn: processedSkills,
      whoShouldTakeThisCourse,
      faq: processedFAQ,
      pricing: processedPricing,
      batches: processedBatches,
      createdBy: req.userId
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create course'
    });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
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
};

// Get course by ID
const getCourseById = async (req, res) => {
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
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { 
      courseName, 
      category, 
      description, 
      amount, 
      startDate, 
      endDate, 
      totalHours, 
      status,
      shortDescription,
      level,
      skillsYouWillLearn,
      whoShouldTakeThisCourse,
      faq,
      pricing,
      batches
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Update fields
    if (courseName) course.courseName = courseName;
    if (category) course.category = category;
    if (description) course.description = description;
    if (amount) course.amount = amount;
    if (startDate) course.startDate = new Date(startDate);
    if (endDate) course.endDate = new Date(endDate);
    if (totalHours) course.totalHours = totalHours;
    if (status) course.status = status;
    if (shortDescription !== undefined) course.shortDescription = shortDescription;
    if (level) course.level = level;
    if (whoShouldTakeThisCourse !== undefined) course.whoShouldTakeThisCourse = whoShouldTakeThisCourse;

    // Process skills array
    if (skillsYouWillLearn !== undefined) {
      course.skillsYouWillLearn = Array.isArray(skillsYouWillLearn) 
        ? skillsYouWillLearn.filter(skill => skill && skill.trim())
        : skillsYouWillLearn.split(',').map(skill => skill.trim()).filter(skill => skill);
    }

    // Process FAQ array
    if (faq !== undefined) {
      course.faq = Array.isArray(faq) ? faq.filter(item => item.question && item.answer) : [];
    }

    // Process pricing object
    if (pricing !== undefined) {
      course.pricing = pricing;
    }

    // Process batches array
    if (batches !== undefined) {
      // Process each batch to ensure proper date handling
      course.batches = batches.map(batch => ({
        ...batch,
        startDate: new Date(batch.startDate),
        endDate: new Date(batch.endDate),
        maxStudents: parseInt(batch.maxStudents) || 30,
        enrolledStudents: parseInt(batch.enrolledStudents) || 0
      }));
    }

    await course.save();

    res.json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update course'
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course'
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
