const SolutionCategory = require('../models/SolutionCategory');
const Solution = require('../models/Solution');

// Create a new solution category
const createSolutionCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const existing = await SolutionCategory.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this name already exists' });
    }

    const category = new SolutionCategory({
      name: name.trim(),
      description: description?.trim() || '',
      createdBy: req.userId
    });

    await category.save();
    res.status(201).json({ success: true, message: 'Solution category created successfully', category });
  } catch (error) {
    console.error('Create solution category error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create solution category' });
  }
};

// Get all solution categories
const getAllSolutionCategories = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    const categories = await SolutionCategory.find(filter).populate('createdBy', 'email').sort({ order: -1, name: 1 });
    res.json({ success: true, categories, total: categories.length });
  } catch (error) {
    console.error('Get solution categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch solution categories' });
  }
};

// Get public solution categories (active only)
const getPublicSolutionCategories = async (req, res) => {
  try {
    const categories = await SolutionCategory.find({ status: 'Active' })
      .select('name description')
      .sort({ order: -1, name: 1 });
    
    res.json({ 
      success: true, 
      categories: categories.map(cat => cat.name), // Return just the names for frontend
      total: categories.length 
    });
  } catch (error) {
    console.error('Get public solution categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch solution categories' });
  }
};

// Get category by ID
const getSolutionCategoryById = async (req, res) => {
  try {
    const category = await SolutionCategory.findById(req.params.id).populate('createdBy', 'email');
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, category });
  } catch (error) {
    console.error('Get solution category error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch solution category' });
  }
};

// Update category
const updateSolutionCategory = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const category = await SolutionCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (name && name !== category.name) {
      const existing = await SolutionCategory.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: req.params.id }
      });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Category with this name already exists' });
      }
    }

    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description.trim();
    if (status) category.status = status;

    await category.save();
    res.json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Update solution category error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update solution category' });
  }
};

// Delete category
const deleteSolutionCategory = async (req, res) => {
  try {
    const category = await SolutionCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    // Prevent deletion if used by any solutions
    const solutionsUsing = await Solution.countDocuments({ category: category.name });
    if (solutionsUsing > 0) {
      return res.status(400).json({ success: false, message: `Cannot delete category. It is being used by ${solutionsUsing} solution(s).` });
    }

    await SolutionCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete solution category error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete solution category' });
  }
};

// Reorder solution categories
const reorderSolutionCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Categories array is required'
      });
    }

    // Update each category's order
    const updatePromises = categories.map(({ id, order }) =>
      SolutionCategory.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      success: true,
      message: 'Solution categories reordered successfully'
    });
  } catch (error) {
    console.error('Reorder solution categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder solution categories'
    });
  }
};

module.exports = {
  createSolutionCategory,
  getAllSolutionCategories,
  getSolutionCategoryById,
  updateSolutionCategory,
  deleteSolutionCategory,
  getPublicSolutionCategories,
  reorderSolutionCategories
};


