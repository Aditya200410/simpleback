const Solution = require('../models/Solution');

// Create a new solution
const createSolution = async (req, res) => {
  try {
    const { 
      solutionName, 
      category, 
      description, 
      detailedDescription,
      shortDescription,
      icon,
      price, 
      duration,
      complexity,
      features,
      benefits,
      process,
      requirements,
      deliverables,
      pricing,
      industry,
      compliance,
      faq,
      caseStudies,
      relatedSolutions,
      targetAudience,
      providerName,
      providerBio,
      providerExperience,
      providerQualifications,
      isActive,
      priority
    } = req.body;

    // Validate required fields
    if (!solutionName || !category || !description || !price || !duration || !complexity) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: solutionName, category, description, price, duration, complexity'
      });
    }

    // Generate slug from solutionName
    const slug = solutionName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    let finalSlug = slug;
    let counter = 1;
    while (await Solution.findOne({ slug: finalSlug })) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Process features array
    let processedFeatures = [];
    if (features) {
      processedFeatures = Array.isArray(features) 
        ? features.filter(feature => feature && feature.trim())
        : features.split(',').map(feature => feature.trim()).filter(feature => feature);
    }

    // Process deliverables array
    let processedDeliverables = [];
    if (deliverables) {
      processedDeliverables = Array.isArray(deliverables) 
        ? deliverables.filter(deliverable => deliverable && deliverable.trim())
        : deliverables.split(',').map(deliverable => deliverable.trim()).filter(deliverable => deliverable);
    }

    // Process FAQ array
    let processedFAQ = [];
    if (faq && Array.isArray(faq)) {
      processedFAQ = faq.filter(item => item.question && item.answer);
    }

    // Process benefits array
    let processedBenefits = [];
    if (benefits && Array.isArray(benefits)) {
      processedBenefits = benefits.filter(benefit => benefit.title && benefit.description);
    }

    // Process process array
    let processedProcess = [];
    if (process && Array.isArray(process)) {
      processedProcess = process.filter(step => step.step && step.title && step.description);
    }

    // Process industry array
    let processedIndustry = [];
    if (industry) {
      processedIndustry = Array.isArray(industry) 
        ? industry.filter(item => item && item.trim())
        : industry.split(',').map(item => item.trim()).filter(item => item);
    }

    // Process compliance array
    let processedCompliance = [];
    if (compliance) {
      processedCompliance = Array.isArray(compliance) 
        ? compliance.filter(item => item && item.trim())
        : compliance.split(',').map(item => item.trim()).filter(item => item);
    }

    // Process requirements array
    let processedRequirements = [];
    if (requirements) {
      processedRequirements = Array.isArray(requirements) 
        ? requirements.filter(item => item && item.trim())
        : requirements.split(',').map(item => item.trim()).filter(item => item);
    }

    // Process case studies array
    let processedCaseStudies = [];
    if (caseStudies && Array.isArray(caseStudies)) {
      processedCaseStudies = caseStudies.filter(study => study.title && study.description);
    }

    // Process related solutions array
    let processedRelatedSolutions = [];
    if (relatedSolutions && Array.isArray(relatedSolutions)) {
      processedRelatedSolutions = relatedSolutions.filter(id => id);
    }

    // Create new solution
    const solution = new Solution({
      solutionName,
      slug: finalSlug,
      category,
      description,
      detailedDescription,
      shortDescription,
      icon: icon || '🚀',
      price,
      duration,
      complexity,
      features: processedFeatures,
      benefits: processedBenefits,
      process: processedProcess,
      requirements: processedRequirements,
      deliverables: processedDeliverables,
      pricing,
      industry: processedIndustry,
      compliance: processedCompliance,
      faq: processedFAQ,
      caseStudies: processedCaseStudies,
      relatedSolutions: processedRelatedSolutions,
      targetAudience,
      providerName,
      providerBio,
      providerExperience,
      providerQualifications,
      isActive: isActive !== undefined ? isActive : true,
      priority: priority || 0,
      createdBy: req.userId
    });

    await solution.save();

    res.status(201).json({
      success: true,
      message: 'Solution created successfully',
      solution
    });
  } catch (error) {
    console.error('Create solution error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create solution'
    });
  }
};

// Get all solutions
const getAllSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find()
      .populate('createdBy', 'email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      solutions,
      total: solutions.length
    });
  } catch (error) {
    console.error('Get solutions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch solutions'
    });
  }
};

// Get solution by ID
const getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id)
      .populate('createdBy', 'email');

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    res.json({
      success: true,
      solution
    });
  } catch (error) {
    console.error('Get solution error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch solution'
    });
  }
};

// Get solution by slug
const getSolutionBySlug = async (req, res) => {
  try {
    const solution = await Solution.findOne({ slug: req.params.slug })
      .populate('createdBy', 'email')
      .populate('relatedSolutions', 'solutionName slug shortDescription icon');

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    res.json({
      success: true,
      data: solution
    });
  } catch (error) {
    console.error('Get solution by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch solution'
    });
  }
};

// Update solution
const updateSolution = async (req, res) => {
  try {
    const { 
      solutionName, 
      category, 
      description, 
      price, 
      duration, 
      status,
      shortDescription,
      complexity,
      features,
      targetAudience,
      deliverables,
      faq
    } = req.body;

    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    // Update fields
    if (solutionName) solution.solutionName = solutionName;
    if (category) solution.category = category;
    if (description) solution.description = description;
    if (price) solution.price = price;
    if (duration) solution.duration = duration;
    if (status) solution.status = status;
    if (shortDescription !== undefined) solution.shortDescription = shortDescription;
    if (complexity) solution.complexity = complexity;
    if (targetAudience !== undefined) solution.targetAudience = targetAudience;

    // Process features array
    if (features !== undefined) {
      solution.features = Array.isArray(features) 
        ? features.filter(feature => feature && feature.trim())
        : features.split(',').map(feature => feature.trim()).filter(feature => feature);
    }

    // Process deliverables array
    if (deliverables !== undefined) {
      solution.deliverables = Array.isArray(deliverables) 
        ? deliverables.filter(deliverable => deliverable && deliverable.trim())
        : deliverables.split(',').map(deliverable => deliverable.trim()).filter(deliverable => deliverable);
    }

    // Process FAQ array
    if (faq !== undefined) {
      solution.faq = Array.isArray(faq) ? faq.filter(item => item.question && item.answer) : [];
    }

    await solution.save();

    res.json({
      success: true,
      message: 'Solution updated successfully',
      solution
    });
  } catch (error) {
    console.error('Update solution error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update solution'
    });
  }
};

// Delete solution
const deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    await Solution.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Solution deleted successfully'
    });
  } catch (error) {
    console.error('Delete solution error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete solution'
    });
  }
};

module.exports = {
  createSolution,
  getAllSolutions,
  getSolutionById,
  getSolutionBySlug,
  updateSolution,
  deleteSolution
};
