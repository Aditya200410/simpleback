const Course = require('../models/Course');
const Student = require('../models/Student');

// Utility function to generate slug from course name
const generateSlug = (courseName) => {
  return courseName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim('-'); // Remove leading/trailing hyphens
};

// Utility function to ensure unique slug
const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existingCourse = await Course.findOne({ 
      slug: slug,
      ...(excludeId && { _id: { $ne: excludeId } })
    });
    
    if (!existingCourse) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// Normalize support types to match enum in Course model
const allowedSupportTypes = [
  'Email',
  'Phone',
  'Live Chat',
  'Forum',
  'Mentor',
  'Slack community',
  'Weekly live office hours',
  'Dedicated mentor support',
  'Weekly feedback calls',
  'Peer practice groups',
  'One-to-one coaching slots'
];

const supportTypeAliasMap = {
  'live q&a': 'Weekly live office hours',
  'live q & a': 'Weekly live office hours',
  'q&a live': 'Weekly live office hours',
  'qa live': 'Weekly live office hours',
  'office hours': 'Weekly live office hours',
  'tool-specific office hours': 'Weekly live office hours',
  'tool specific office hours': 'Weekly live office hours',
  'slack': 'Slack community',
  'slack community': 'Slack community',
  'mentor support': 'Dedicated mentor support',
  'dedicated mentor': 'Dedicated mentor support',
  '1:1 coaching': 'One-to-one coaching slots',
  'one to one coaching': 'One-to-one coaching slots',
  'one-on-one coaching': 'One-to-one coaching slots',
  'peer groups': 'Peer practice groups',
  'weekly feedback': 'Weekly feedback calls',
  'chat': 'Live Chat'
};

const normalizeSupportType = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (allowedSupportTypes.includes(trimmed)) return trimmed;
  const lower = trimmed.toLowerCase();
  const mapped = supportTypeAliasMap[lower];
  if (mapped && allowedSupportTypes.includes(mapped)) return mapped;
  const ciMatch = allowedSupportTypes.find(a => a.toLowerCase() === lower);
  return ciMatch || null;
};

// Normalize learning modes to match enum in Course model
const allowedLearningModes = [
  'Live Online',
  'Self-Paced',
  'Classroom',
  'Hybrid',
  'Instructor-Led',
  'Live Instructor-Led',
  'Self-Practice'
];

const learningModeAliasMap = {
  'project-based': 'Self-Practice',
  'project based': 'Self-Practice',
  'project led': 'Self-Practice',
  'projects': 'Self-Practice',
  'live instructor led': 'Live Instructor-Led',
  'instructor led': 'Instructor-Led',
  'self practice': 'Self-Practice',
  'self paced': 'Self-Paced',
  'virtual live': 'Live Online'
};

const normalizeLearningMode = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (allowedLearningModes.includes(trimmed)) return trimmed;
  const lower = trimmed.toLowerCase();
  const mapped = learningModeAliasMap[lower];
  if (mapped && allowedLearningModes.includes(mapped)) return mapped;
  const ciMatch = allowedLearningModes.find(a => a.toLowerCase() === lower);
  return ciMatch || null;
};

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
      courseMaterials,
      vendor,
      certificationBody,
      certificationName,
      courseHighlights,
      supportDetails
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

    // Process course highlights
    let processedCourseHighlights = [];
    if (courseHighlights && Array.isArray(courseHighlights)) {
      processedCourseHighlights = courseHighlights.filter(highlight => highlight && highlight.trim());
    }

    // Normalize learning mode
    let processedLearningMode = [];
    if (req.body.learningMode && Array.isArray(req.body.learningMode)) {
      processedLearningMode = Array.from(new Set(req.body.learningMode.map(normalizeLearningMode).filter(Boolean)));
    }

    // Normalize support details
    let processedSupportDetails = undefined;
    if (supportDetails && typeof supportDetails === 'object') {
      const inputTypes = Array.isArray(supportDetails.supportType) ? supportDetails.supportType : [];
      const normalizedTypes = Array.from(new Set(inputTypes.map(normalizeSupportType).filter(Boolean)));
      processedSupportDetails = {
        supportType: normalizedTypes,
        supportHours: supportDetails.supportHours || ''
      };
    }

    // Generate unique slug
    const baseSlug = generateSlug(courseName);
    const uniqueSlug = await ensureUniqueSlug(baseSlug);

    // Create new course
    const course = new Course({
      courseName,
      slug: uniqueSlug,
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
      ...(processedLearningMode.length ? { learningMode: processedLearningMode } : {}),
      vendor: vendor || '',
      certificationBody: certificationBody || '',
      certificationName: certificationName || '',
      courseHighlights: processedCourseHighlights,
      ...(processedSupportDetails ? { supportDetails: processedSupportDetails } : {}),
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
      .sort({ order: -1, createdAt: -1 });

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

// Get course by slug
const getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
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
    console.error('Get course by slug error:', error);
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
      courseMaterials,
      vendor,
      certificationBody,
      certificationName,
      courseHighlights
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Update fields
    if (courseName) {
      course.courseName = courseName;
      // Generate new slug if course name changed
      const baseSlug = generateSlug(courseName);
      course.slug = await ensureUniqueSlug(baseSlug, req.params.id);
    }
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

    // Process vendor and certification fields
    if (vendor !== undefined) course.vendor = vendor;
    if (certificationBody !== undefined) course.certificationBody = certificationBody;
    if (certificationName !== undefined) course.certificationName = certificationName;

    // Process course highlights
    if (courseHighlights !== undefined) {
      course.courseHighlights = Array.isArray(courseHighlights) ? courseHighlights.filter(highlight => highlight && highlight.trim()) : [];
    }

    // Normalize learning mode
    if (req.body.learningMode !== undefined) {
      const lm = Array.isArray(req.body.learningMode) ? req.body.learningMode : [];
      course.learningMode = Array.from(new Set(lm.map(normalizeLearningMode).filter(Boolean)));
    }

    // Normalize and set support details
    if (req.body.supportDetails !== undefined) {
      const sd = req.body.supportDetails || {};
      const inputTypes = Array.isArray(sd.supportType) ? sd.supportType : [];
      const normalizedTypes = Array.from(new Set(inputTypes.map(normalizeSupportType).filter(Boolean)));
      course.supportDetails = {
        supportType: normalizedTypes,
        supportHours: sd.supportHours || ''
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

// Search courses
const searchCourses = async (req, res) => {
  try {
    const { q, category, level, limit = 10 } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters long'
      });
    }

    // Build search query
    let searchQuery = {
      $or: [
        { courseName: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { skillsYouWillLearn: { $in: [new RegExp(q, 'i')] } },
        { certificationName: { $regex: q, $options: 'i' } },
        { vendor: { $regex: q, $options: 'i' } },
        { certificationBody: { $regex: q, $options: 'i' } }
      ],
      status: 'Active' // Only show active courses
    };

    // Add category filter if provided
    if (category && category !== 'All') {
      searchQuery.category = category;
    }

    // Add level filter if provided
    if (level && level !== 'All') {
      searchQuery.level = level;
    }

    const courses = await Course.find(searchQuery)
      .populate('createdBy', 'email')
      .select('courseName shortDescription category level averageRating totalReviews pricing amount startDate endDate')
      .limit(parseInt(limit))
      .sort({ averageRating: -1, totalReviews: -1, createdAt: -1 });

    res.json({
      success: true,
      courses,
      total: courses.length,
      query: q
    });
  } catch (error) {
    console.error('Search courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search courses'
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

// Reorder courses
const reorderCourses = async (req, res) => {
  try {
    const { courses } = req.body; // Array of { id, order }

    if (!Array.isArray(courses)) {
      return res.status(400).json({
        success: false,
        message: 'Courses must be an array'
      });
    }

    // Update order for each course
    const updatePromises = courses.map(({ id, order }) =>
      Course.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Courses reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering courses',
      error: error.message
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  searchCourses,
  reorderCourses
};
