const GRCService = require('../models/GRCService');

// Get all GRC services
const getAllGRCServices = async (req, res) => {
  try {
    const { category, isActive, search } = req.query;
    let query = {};

    // Build query based on filters
    if (category && category !== 'All') {
      query.category = category;
    }
    if (isActive !== undefined && isActive !== 'all') {
      query.isActive = isActive === 'true';
    } else if (isActive === undefined) {
      // By default, only show active services for public API
      query.isActive = true;
    }
    // If isActive === 'all', don't add any filter (show both active and inactive)

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const services = await GRCService.find(query)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ priority: -1, createdAt: -1 });

    res.json({
      success: true,
      data: services,
      count: services.length
    });
  } catch (error) {
    console.error('Error fetching GRC services:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching GRC services',
      error: error.message
    });
  }
};

// Get single GRC service by ID
const getGRCServiceById = async (req, res) => {
  try {
    const service = await GRCService.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('relatedServices', 'title slug icon shortDescription');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'GRC service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching GRC service:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching GRC service',
      error: error.message
    });
  }
};

// Get single GRC service by slug
const getGRCServiceBySlug = async (req, res) => {
  try {
    const service = await GRCService.findOne({ slug: req.params.slug, isActive: true })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('relatedServices', 'title slug icon shortDescription duration');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'GRC service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching GRC service by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching GRC service',
      error: error.message
    });
  }
};

// Create new GRC service (Admin only)
const createGRCService = async (req, res) => {
  try {
    const { 
      title, 
      category, 
      shortDescription, 
      detailedDescription, 
      icon, 
      features, 
      benefits,
      process,
      requirements,
      deliverables,
      pricing,
      paymentDetails,
      duration, 
      industry,
      compliance,
      faqs,
      caseStudies,
      relatedServices,
      priority
    } = req.body;

    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Validation
    if (!title || !category || !shortDescription || !detailedDescription || !features || !duration) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    if (!Array.isArray(features) || features.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Features must be a non-empty array'
      });
    }

    const service = new GRCService({
      title,
      slug,
      category,
      shortDescription,
      detailedDescription,
      icon: icon || '🛡️',
      features,
      benefits: benefits || [],
      process: process || [],
      requirements: requirements || [],
      deliverables: deliverables || [],
      pricing: pricing || {},
      paymentDetails: paymentDetails || {},
      duration,
      industry: industry || [],
      compliance: compliance || [],
      faqs: faqs || [],
      caseStudies: caseStudies || [],
      relatedServices: relatedServices || [],
      priority: priority || 0,
      createdBy: req.user.id
    });

    await service.save();

    const populatedService = await GRCService.findById(service._id)   
      .populate('createdBy', 'name email')
      .populate('relatedServices', 'title slug icon shortDescription');

    res.status(201).json({
      success: true,
      data: populatedService,
      message: 'GRC service created successfully'
    });
  } catch (error) {
    console.error('Error creating GRC service:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating GRC service',
      error: error.message
    });
  }
};

// Update GRC service (Admin only)
const updateGRCService = async (req, res) => {
  try {
    const { 
      title, 
      category, 
      shortDescription, 
      detailedDescription, 
      icon, 
      features, 
      benefits,
      process,
      requirements,
      deliverables,
      pricing,
      paymentDetails,
      duration, 
      industry,
      compliance,
      faqs,
      caseStudies,
      relatedServices,
      priority, 
      isActive
    } = req.body;

    const service = await GRCService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'GRC service not found'
      });
    }

    // Update fields
    if (title) {
      service.title = title;
      // Update slug if title changed
      service.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (category) service.category = category;
    if (shortDescription) service.shortDescription = shortDescription;
    if (detailedDescription) service.detailedDescription = detailedDescription;
    if (icon) service.icon = icon;
    if (features && Array.isArray(features)) service.features = features;
    if (benefits && Array.isArray(benefits)) service.benefits = benefits;
    if (process && Array.isArray(process)) service.process = process;
    if (requirements && Array.isArray(requirements)) service.requirements = requirements;
    if (deliverables && Array.isArray(deliverables)) service.deliverables = deliverables;
    if (pricing) service.pricing = pricing;
    if (paymentDetails) service.paymentDetails = paymentDetails;
    if (duration) service.duration = duration;
    if (industry && Array.isArray(industry)) service.industry = industry;
    if (compliance && Array.isArray(compliance)) service.compliance = compliance;
    if (faqs && Array.isArray(faqs)) service.faqs = faqs;
    if (caseStudies && Array.isArray(caseStudies)) service.caseStudies = caseStudies;
    if (relatedServices && Array.isArray(relatedServices)) service.relatedServices = relatedServices;
    if (priority !== undefined) service.priority = priority;
    if (isActive !== undefined) service.isActive = isActive;

    service.updatedBy = req.user.id;

    await service.save();

    const populatedService = await GRCService.findById(service._id)   
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .populate('relatedServices', 'title slug icon shortDescription');

    res.json({
      success: true,
      data: populatedService,
      message: 'GRC service updated successfully'
    });
  } catch (error) {
    console.error('Error updating GRC service:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating GRC service',
      error: error.message
    });
  }
};

// Delete GRC service (Admin only)
const deleteGRCService = async (req, res) => {
  try {
    const service = await GRCService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'GRC service not found'
      });
    }

    await GRCService.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'GRC service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting GRC service:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting GRC service',
      error: error.message
    });
  }
};

// Toggle service active status (Admin only)
const toggleGRCServiceStatus = async (req, res) => {
  try {
    const service = await GRCService.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'GRC service not found'
      });
    }

    service.isActive = !service.isActive;
    service.updatedBy = req.user.id;
    await service.save();

    const populatedService = await GRCService.findById(service._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.json({
      success: true,
      data: populatedService,
      message: `GRC service ${service.isActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('Error toggling GRC service status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling GRC service status',
      error: error.message
    });
  }
};

// Get GRC service categories
const getGRCServiceCategories = async (req, res) => {
  try {
    const categories = await GRCService.distinct('category', { isActive: true });
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching GRC service categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching GRC service categories',
      error: error.message
    });
  }
};

// Reorder GRC services
const reorderGRCServices = async (req, res) => {
  try {
    const { services } = req.body; // Array of { id, priority }

    if (!Array.isArray(services)) {
      return res.status(400).json({
        success: false,
        message: 'Services must be an array'
      });
    }

    // Update priority for each service
    const updatePromises = services.map(({ id, priority }) =>
      GRCService.findByIdAndUpdate(id, { priority }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'GRC services reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering GRC services:', error);
    res.status(500).json({
      success: false,
      message: 'Error reordering GRC services',
      error: error.message
    });
  }
};

module.exports = {
  getAllGRCServices,
  getGRCServiceById,
  getGRCServiceBySlug,
  createGRCService,
  updateGRCService,
  deleteGRCService,
  toggleGRCServiceStatus,
  getGRCServiceCategories,
  reorderGRCServices
};
