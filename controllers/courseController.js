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
      targetAudience,
      prerequisites,
      learningObjectives,
      courseModules,
      examDetails,
      faq,
      pricing,
      batches,
      careerBenefits,
      courseMaterials
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

    // Process target audience array
    let processedTargetAudience = [];
    if (targetAudience && Array.isArray(targetAudience)) {
      processedTargetAudience = targetAudience.filter(audience => audience && audience.trim());
    }

    // Process prerequisites array
    let processedPrerequisites = [];
    if (prerequisites && Array.isArray(prerequisites)) {
      processedPrerequisites = prerequisites.filter(prereq => prereq && prereq.trim());
    }

    // Process learning objectives array
    let processedLearningObjectives = [];
    if (learningObjectives && Array.isArray(learningObjectives)) {
      processedLearningObjectives = learningObjectives.filter(objective => objective && objective.trim());
    }

    // Process course modules array
    let processedCourseModules = [];
    if (courseModules && Array.isArray(courseModules)) {
      processedCourseModules = courseModules.map(module => ({
        moduleName: module.moduleName || '',
        moduleDescription: module.moduleDescription || '',
        duration: parseFloat(module.duration) || 0,
        topics: Array.isArray(module.topics) ? module.topics.filter(topic => topic && topic.trim()) : []
      }));
    }

    // Process exam details
    let processedExamDetails = {
      examFormat: 'Multiple Choice',
      examDuration: 0,
      passingScore: 0,
      totalQuestions: 0,
      examLanguage: ['English']
    };
    if (examDetails) {
      processedExamDetails = {
        examFormat: examDetails.examFormat || 'Multiple Choice',
        examDuration: parseInt(examDetails.examDuration) || 0,
        passingScore: parseInt(examDetails.passingScore) || 0,
        totalQuestions: parseInt(examDetails.totalQuestions) || 0,
        examLanguage: Array.isArray(examDetails.examLanguage) ? examDetails.examLanguage : ['English']
      };
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

    // Process career benefits
    let processedCareerBenefits = {
      jobRoles: [],
      averageSalary: '',
      careerPath: ''
    };
    if (careerBenefits) {
      processedCareerBenefits = {
        jobRoles: Array.isArray(careerBenefits.jobRoles) ? careerBenefits.jobRoles.filter(role => role && role.trim()) : [],
        averageSalary: careerBenefits.averageSalary || '',
        careerPath: careerBenefits.careerPath || ''
      };
    }

    // Process course materials
    let processedCourseMaterials = {
      included: [],
      additionalCost: 0
    };
    if (courseMaterials) {
      processedCourseMaterials = {
        included: Array.isArray(courseMaterials.included) ? courseMaterials.included.filter(material => material && material.trim()) : [],
        additionalCost: parseFloat(courseMaterials.additionalCost) || 0
      };
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
      targetAudience: processedTargetAudience,
      prerequisites: processedPrerequisites,
      learningObjectives: processedLearningObjectives,
      courseModules: processedCourseModules,
      examDetails: processedExamDetails,
      faq: processedFAQ,
      pricing: processedPricing,
      batches: processedBatches,
      careerBenefits: processedCareerBenefits,
      courseMaterials: processedCourseMaterials,
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
      targetAudience,
      prerequisites,
      learningObjectives,
      courseModules,
      examDetails,
      faq,
      pricing,
      batches,
      careerBenefits,
      courseMaterials
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

    // Process target audience array
    if (targetAudience !== undefined) {
      course.targetAudience = Array.isArray(targetAudience) 
        ? targetAudience.filter(audience => audience && audience.trim())
        : [];
    }

    // Process prerequisites array
    if (prerequisites !== undefined) {
      course.prerequisites = Array.isArray(prerequisites) 
        ? prerequisites.filter(prereq => prereq && prereq.trim())
        : [];
    }

    // Process learning objectives array
    if (learningObjectives !== undefined) {
      course.learningObjectives = Array.isArray(learningObjectives) 
        ? learningObjectives.filter(objective => objective && objective.trim())
        : [];
    }

    // Process course modules array
    if (courseModules !== undefined) {
      course.courseModules = Array.isArray(courseModules) 
        ? courseModules.map(module => ({
            moduleName: module.moduleName || '',
            moduleDescription: module.moduleDescription || '',
            duration: parseFloat(module.duration) || 0,
            topics: Array.isArray(module.topics) ? module.topics.filter(topic => topic && topic.trim()) : []
          }))
        : [];
    }

    // Process exam details
    if (examDetails !== undefined) {
      course.examDetails = {
        examFormat: examDetails.examFormat || 'Multiple Choice',
        examDuration: parseInt(examDetails.examDuration) || 0,
        passingScore: parseInt(examDetails.passingScore) || 0,
        totalQuestions: parseInt(examDetails.totalQuestions) || 0,
        examLanguage: Array.isArray(examDetails.examLanguage) ? examDetails.examLanguage : ['English']
      };
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

    // Process career benefits
    if (careerBenefits !== undefined) {
      course.careerBenefits = {
        jobRoles: Array.isArray(careerBenefits.jobRoles) ? careerBenefits.jobRoles.filter(role => role && role.trim()) : [],
        averageSalary: careerBenefits.averageSalary || '',
        careerPath: careerBenefits.careerPath || ''
      };
    }

    // Process course materials
    if (courseMaterials !== undefined) {
      course.courseMaterials = {
        included: Array.isArray(courseMaterials.included) ? courseMaterials.included.filter(material => material && material.trim()) : [],
        additionalCost: parseFloat(courseMaterials.additionalCost) || 0
      };
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
