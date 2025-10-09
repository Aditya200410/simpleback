const Solution = require('../models/Solution');

// Create a new solution
const createSolution = async (req, res) => {
  try {
    const { 
      title, 
      category, 
      shortDescription,
      detailedDescription,
      icon,
      duration,
      complexity,
      status,
      targetAudience,
      features,
      benefits,
      process,
      requirements,
      deliverables,
      pricing,
      industry,
      compliance,
      faqs,
      caseStudies,
      relatedServices,
      isActive,
      priority
    } = req.body;

    // Validate required fields
    if (!title || !category || !shortDescription || !detailedDescription || !duration || !complexity || !targetAudience) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: title, category, shortDescription, detailedDescription, duration, complexity, targetAudience'
      });
    }

    // Generate slug from title
    const slug = title
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
    let processedFAQs = [];
    if (faqs && Array.isArray(faqs)) {
      processedFAQs = faqs.filter(item => item.question && item.answer);
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

    // Process related services array
    let processedRelatedServices = [];
    if (relatedServices && Array.isArray(relatedServices)) {
      processedRelatedServices = relatedServices.filter(id => id);
    }

    // Create new solution
    const solution = new Solution({
      title,
      slug: finalSlug,
      category,
      shortDescription,
      detailedDescription,
      icon: icon || '🛡️',
      duration,
      complexity,
      status: status || 'Active',
      targetAudience,
      features: processedFeatures,
      benefits: processedBenefits,
      process: processedProcess,
      requirements: processedRequirements,
      deliverables: processedDeliverables,
      pricing,
      industry: processedIndustry,
      compliance: processedCompliance,
      faqs: processedFAQs,
      caseStudies: processedCaseStudies,
      relatedServices: processedRelatedServices,
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
      .sort({ priority: -1, createdAt: -1 });

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
      // New preferred fields
      title,
      category,
      shortDescription,
      detailedDescription,
      icon,
      duration,
      features,
      benefits,
      process,
      requirements,
      deliverables,
      pricing,
      paymentDetails,
      industry,
      compliance,
      faqs,
      caseStudies,
      relatedSolutions,
      relatedServices,
      isActive,
      priority,
      // Legacy/backward-compat fields
      solutionName,
      description,
      price,
      status,
      complexity,
      targetAudience
    } = req.body;

    const { id } = req.params;
    const solution = await Solution.findById(id);

    if (!solution) {
      return res.status(404).json({
        success: false,
        message: 'Solution not found'
      });
    }

    // Helper to ensure unique slug when title changes
    const generateSlug = (text) => text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const ensureUniqueSlug = async (baseSlug, currentId) => {
      let finalSlug = baseSlug;
      let counter = 1;
      // exclude current document when checking uniqueness
      // eslint-disable-next-line no-constant-condition
      while (await Solution.findOne({ slug: finalSlug, _id: { $ne: currentId } })) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      return finalSlug;
    };

    // Title and slug handling (prefer new title, fallback to legacy solutionName)
    if (title || solutionName) {
      const newTitle = title || solutionName;
      if (newTitle && newTitle !== solution.title) {
        solution.title = newTitle;
        const baseSlug = generateSlug(newTitle);
        solution.slug = await ensureUniqueSlug(baseSlug, id);
      }
    }

    // Simple fields
    if (category) solution.category = category;
    if (shortDescription !== undefined) solution.shortDescription = shortDescription;
    if (detailedDescription !== undefined) solution.detailedDescription = detailedDescription || description || solution.detailedDescription;
    if (icon) solution.icon = icon;
    if (duration) solution.duration = duration;
    if (isActive !== undefined) solution.isActive = isActive;
    if (priority !== undefined) solution.priority = priority;

    // Back-compat simple fields that are not in schema will be ignored by mongoose if not defined
    if (status !== undefined) solution.status = status;
    if (complexity !== undefined) solution.complexity = complexity;
    if (targetAudience !== undefined) solution.targetAudience = targetAudience;

    // Arrays and nested structures
    if (features !== undefined) {
      solution.features = Array.isArray(features)
        ? features.filter(item => item && String(item).trim())
        : String(features).split(',').map(s => s.trim()).filter(Boolean);
    }

    if (requirements !== undefined) {
      solution.requirements = Array.isArray(requirements)
        ? requirements.filter(item => item && String(item).trim())
        : String(requirements).split(',').map(s => s.trim()).filter(Boolean);
    }

    if (deliverables !== undefined) {
      solution.deliverables = Array.isArray(deliverables)
        ? deliverables.filter(item => item && String(item).trim())
        : String(deliverables).split(',').map(s => s.trim()).filter(Boolean);
    }

    if (benefits !== undefined && Array.isArray(benefits)) {
      solution.benefits = benefits.filter(b => b && b.title && b.description);
    }

    if (process !== undefined && Array.isArray(process)) {
      solution.process = process.filter(p => p && p.step !== undefined && p.title && p.description);
    }

    if (industry !== undefined) {
      solution.industry = Array.isArray(industry)
        ? industry.filter(item => item && String(item).trim())
        : String(industry).split(',').map(s => s.trim()).filter(Boolean);
    }

    if (compliance !== undefined) {
      solution.compliance = Array.isArray(compliance)
        ? compliance.filter(item => item && String(item).trim())
        : String(compliance).split(',').map(s => s.trim()).filter(Boolean);
    }

    // FAQs (new field name)
    if (faqs !== undefined) {
      solution.faqs = Array.isArray(faqs) ? faqs.filter(item => item && item.question && item.answer) : [];
    }

    // Backward compatibility: if legacy 'faq' is provided, map to 'faqs'
    if (req.body.faq !== undefined && faqs === undefined) {
      const legacyFaq = req.body.faq;
      solution.faqs = Array.isArray(legacyFaq) ? legacyFaq.filter(item => item && item.question && item.answer) : [];
    }

    if (caseStudies !== undefined && Array.isArray(caseStudies)) {
      solution.caseStudies = caseStudies.filter(cs => cs && cs.title && cs.description);
    }

    if (relatedSolutions !== undefined) {
      solution.relatedSolutions = Array.isArray(relatedSolutions) ? relatedSolutions.filter(Boolean) : [];
    }

    if (relatedServices !== undefined) {
      solution.relatedServices = Array.isArray(relatedServices) ? relatedServices.filter(Boolean) : [];
    }

    // Pricing: prefer full object; also support legacy 'price'
    if (pricing !== undefined) {
      const nextPricing = {
        startingFrom: pricing?.startingFrom ?? solution.pricing?.startingFrom ?? null,
        currency: pricing?.currency || solution.pricing?.currency || 'INR',
        includes: Array.isArray(pricing?.includes) ? pricing.includes : (solution.pricing?.includes || []),
        excludes: Array.isArray(pricing?.excludes) ? pricing.excludes : (solution.pricing?.excludes || [])
      };
      solution.pricing = nextPricing;
    }

    if (price !== undefined) {
      solution.pricing = {
        startingFrom: price,
        currency: solution.pricing?.currency || 'INR',
        includes: solution.pricing?.includes || [],
        excludes: solution.pricing?.excludes || []
      };
    }

    if (paymentDetails !== undefined) {
      solution.paymentDetails = {
        moneyBackGuarantee: paymentDetails?.moneyBackGuarantee ?? solution.paymentDetails?.moneyBackGuarantee,
        emiFacilities: paymentDetails?.emiFacilities ?? solution.paymentDetails?.emiFacilities,
        termsAndConditions: paymentDetails?.termsAndConditions ?? solution.paymentDetails?.termsAndConditions
      };
    }

    // Track updater if available
    if (req.userId) {
      solution.updatedBy = req.userId;
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

// Reorder solutions
const reorderSolutions = async (req, res) => {
  try {
    const { solutions } = req.body; // Array of { id, priority }

    if (!Array.isArray(solutions)) {
      return res.status(400).json({
        success: false,
        message: 'Solutions must be an array'
      });
    }

    // Update priority for each solution
    const updatePromises = solutions.map(({ id, priority }) =>
      Solution.findByIdAndUpdate(id, { priority }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Solutions reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering solutions:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering solutions',
      error: error.message
    });
  }
};

module.exports = {
  createSolution,
  getAllSolutions,
  getSolutionById,
  getSolutionBySlug,
  updateSolution,
  deleteSolution,
  reorderSolutions
};
