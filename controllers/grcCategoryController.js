const GRCCategory = require('../models/GRCCategory');

// Create a new GRC category
const createGRCCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'GRC category name is required'
      });
    }

    // Check if category already exists
    const existingCategory = await GRCCategory.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') } 
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'GRC category with this name already exists'
      });
    }

    // Create new category
    const category = new GRCCategory({
      name: name.trim(),
      description: description?.trim() || '',
      createdBy: req.user.id
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'GRC category created successfully',
      category
    });
  } catch (error) {
    console.error('Create GRC category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create GRC category'
    });
  }
};

// Get all GRC categories
const getAllGRCCategories = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) {
      filter.status = status;
    }

    const categories = await GRCCategory.find(filter)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email')
      .sort({ name: 1 });

    res.json({
      success: true,
      categories,
      total: categories.length
    });
  } catch (error) {
    console.error('Get GRC categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch GRC categories'
    });
  }
};

// Get GRC category by ID
const getGRCCategoryById = async (req, res) => {
  try {
    const category = await GRCCategory.findById(req.params.id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'GRC category not found'
      });
    }

    res.json({
      success: true,
      category
    });
  } catch (error) {
    console.error('Get GRC category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch GRC category'
    });
  }
};

// Update GRC category
const updateGRCCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    console.log('Updating GRC category:', req.params.id, { name, description, status });

    const category = await GRCCategory.findById(req.params.id);

    if (!category) {
      console.log('GRC category not found:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'GRC category not found'
      });
    }

    console.log('Found category:', category.name);

    // Check if new name already exists (excluding current category)
    if (name && name !== category.name) {
      const existingCategory = await GRCCategory.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });

      if (existingCategory) {
        console.log('Category name already exists:', name);
        return res.status(400).json({
          success: false,
          message: 'GRC category with this name already exists'
        });
      }
    }

    // Update fields
    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description.trim();
    if (status) category.status = status;

    category.updatedBy = req.user.id;
    const updatedCategory = await category.save();
    console.log('GRC category updated successfully:', updatedCategory.name);

    res.json({
      success: true,
      message: 'GRC category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    console.error('Update GRC category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update GRC category'
    });
  }
};

// Delete GRC category
const deleteGRCCategory = async (req, res) => {
  try {
    const category = await GRCCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'GRC category not found'
      });
    }

    // Check if category is being used by any GRC services
    const GRCService = require('../models/GRCService');
    const servicesUsingCategory = await GRCService.countDocuments({ 
      category: category.name 
    });

    if (servicesUsingCategory > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete GRC category. It is being used by ${servicesUsingCategory} service(s).`
      });
    }

    await GRCCategory.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'GRC category deleted successfully'
    });
  } catch (error) {
    console.error('Delete GRC category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete GRC category'
    });
  }
};

module.exports = {
  createGRCCategory,
  getAllGRCCategories,
  getGRCCategoryById,
  updateGRCCategory,
  deleteGRCCategory
};
