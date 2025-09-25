const mongoose = require('mongoose');
const Solution = require('./models/Solution');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simpleadmin');

// Utility function to generate slug from solution name
const generateSlug = (solutionName) => {
  return solutionName
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
    const existingSolution = await Solution.findOne({ 
      slug: slug,
      ...(excludeId && { _id: { $ne: excludeId } })
    });
    
    if (!existingSolution) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const migrateSolutionSlugs = async () => {
  try {
    console.log('Starting solution slug migration...');
    
    // Get all solutions without slugs
    const solutions = await Solution.find({ slug: { $exists: false } });
    console.log(`Found ${solutions.length} solutions without slugs`);
    
    for (const solution of solutions) {
      try {
        const baseSlug = generateSlug(solution.solutionName);
        const uniqueSlug = await ensureUniqueSlug(baseSlug, solution._id);
        
        solution.slug = uniqueSlug;
        await solution.save();
        
        console.log(`✓ Updated solution: ${solution.solutionName} -> ${uniqueSlug}`);
      } catch (error) {
        console.error(`✗ Error updating solution ${solution.solutionName}:`, error.message);
      }
    }
    
    console.log('Solution slug migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateSolutionSlugs();
