const Solution = require('../models/Solution');

// Create a new solution
const createSolution = async (req, res) => {
  try {
    const { 
      solutionName, 
      category, 
      description, 
      price, 
      duration,
      shortDescription,
      complexity,
      features,
      targetAudience,
      deliverables,
      faq
    } = req.body;

    // Validate required fields
    if (!solutionName || !category || !description || !price || !duration || !complexity) {
      return res.status(400).json({
        success: false,
        message: 'Required fields: solutionName, category, description, price, duration, complexity'
      });
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

    // Create new solution
    const solution = new Solution({
      solutionName,
      category,
      description,
      price,
      duration,
      shortDescription,
      complexity,
      features: processedFeatures,
      targetAudience,
      deliverables: processedDeliverables,
      faq: processedFAQ,
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
  updateSolution,
  deleteSolution
};
