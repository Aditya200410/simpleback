const mongoose = require('mongoose');
const Course = require('./models/Course');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simpleadmin');

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

const migrateCourseSlugs = async () => {
  try {
    console.log('Starting course slug migration...');
    
    // Get all courses without slugs
    const courses = await Course.find({ slug: { $exists: false } });
    console.log(`Found ${courses.length} courses without slugs`);
    
    for (const course of courses) {
      try {
        const baseSlug = generateSlug(course.courseName);
        const uniqueSlug = await ensureUniqueSlug(baseSlug, course._id);
        
        course.slug = uniqueSlug;
        await course.save();
        
        console.log(`✓ Updated course: ${course.courseName} -> ${uniqueSlug}`);
      } catch (error) {
        console.error(`✗ Error updating course ${course.courseName}:`, error.message);
      }
    }
    
    console.log('Course slug migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateCourseSlugs();
