const Blog = require('../models/Blog');
const User = require('../models/User');

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      featuredImage,
      status
    } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    // Get author info from authenticated user
    const author = await User.findById(req.userId);
    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      });
    }

    // Generate unique slug
    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 1;

    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create blog post
    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      author: req.userId,
      authorName: author.email,
      status: status || 'draft'
    });

    await blog.save();

    // If created as published, ensure publishedAt is set
    if (blog.status === 'published' && !blog.publishedAt) {
      blog.publishedAt = new Date();
      await blog.save();
    }

    // Populate author info
    await blog.populate('author', 'email');

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
};

// Get all blog posts (with filtering and pagination)
const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      author
    } = req.query;

    // Build query
    let query = { isActive: true };

    if (status) query.status = status;
    if (author) query.author = author;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const blogs = await Blog.find(query)
      .populate('author', 'email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
};

// Get published blogs (public endpoint)
const getPublishedBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query for published posts only
    const now = new Date();
    const dateConditions = [
      { publishedAt: { $lte: now } },
      { publishedAt: { $exists: false } },
      { publishedAt: null }
    ];

    // Base query ensures isActive and published status, and allows missing publishedAt
    let query = { $and: [{ isActive: true, status: 'published' }, { $or: dateConditions }] };

    // If search provided, add it as an additional AND clause
    if (search) {
      query.$and.push({ $or: [{ title: { $regex: search, $options: 'i' } }, { excerpt: { $regex: search, $options: 'i' } }] });
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query with pagination
    const blogs = await Blog.find(query)
      .select('-content') // Exclude full content for listing
      .populate('author', 'email')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count for pagination
    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      blogs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBlogs: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get published blogs error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate('author', 'email')
      .lean();

    if (!blog || !blog.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Get blog by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
};

// Get blog by slug (public endpoint)
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Allow published posts even if publishedAt is missing (for legacy/imported posts)
    const now = new Date();
    const blog = await Blog.findOne({
      slug,
      isActive: true,
      status: 'published',
      $or: [{ publishedAt: { $lte: now } }, { publishedAt: { $exists: false } }, { publishedAt: null }]
    })
      .populate('author', 'email')
      .lean();

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

    res.json({
      success: true,
      blog: {
        ...blog,
        views: blog.views + 1
      }
    });
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
};

// Update blog post
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check if user is the author or admin
    if (blog.author.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog post'
      });
    }

    // Handle slug update if title changed
    if (updateData.title && updateData.title !== blog.title) {
      let baseSlug = updateData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      let slug = baseSlug;
      let counter = 1;

      while (await Blog.findOne({ slug, _id: { $ne: id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      updateData.slug = slug;
    }

    // If status is being changed to published and publishedAt is not set, set it now
    if (updateData.status && updateData.status === 'published' && !blog.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'email');

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      blog: updatedBlog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post'
    });
  }
};

// Delete blog post (soft delete)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Check if user is the author or admin
    if (blog.author.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog post'
      });
    }

    // Soft delete by setting isActive to false
    await Blog.findByIdAndUpdate(id, { isActive: false });

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
};


// Get blog statistics
const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments({ isActive: true });
    const publishedBlogs = await Blog.countDocuments({ isActive: true, status: 'published' });
    const draftBlogs = await Blog.countDocuments({ isActive: true, status: 'draft' });
    const totalViews = await Blog.aggregate([
      { $match: { isActive: true, status: 'published' } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    const recentBlogs = await Blog.find({ isActive: true })
      .populate('author', 'email')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status createdAt author');

    res.json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.totalViews || 0,
        recentBlogs
      }
    });
  } catch (error) {
    console.error('Get blog stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog statistics'
    });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getPublishedBlogs,
  getBlogById,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getBlogStats
};
