const mongoose = require('mongoose');
const Solution = require('./models/Solution');
const GRCService = require('./models/GRCService');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simpleadmin');

// Utility function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Ensure unique slug
const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existing = await GRCService.findOne({ 
      slug, 
      _id: { $ne: excludeId } 
    });
    
    if (!existing) {
      return slug;
    }
    
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// Map Solution data to GRC structure
const mapSolutionToGRC = (solution) => {
  return {
    title: solution.solutionName,
    slug: solution.slug,
    category: solution.category,
    shortDescription: solution.shortDescription,
    detailedDescription: solution.detailedDescription || solution.description,
    icon: solution.icon || '🛡️',
    features: solution.features || [],
    benefits: solution.benefits || [],
    process: solution.process || [],
    requirements: solution.requirements || [],
    deliverables: solution.deliverables || [],
    pricing: solution.pricing || {
      startingFrom: solution.price || 0,
      currency: 'INR',
      includes: [],
      excludes: []
    },
    duration: solution.duration,
    industry: solution.industry || [],
    compliance: solution.compliance || [],
    faqs: solution.faq || [], // Map 'faq' to 'faqs'
    caseStudies: solution.caseStudies || [],
    relatedServices: [], // Will be populated later if needed
    isActive: solution.isActive !== undefined ? solution.isActive : true,
    priority: solution.priority || 0,
    createdBy: solution.createdBy,
    updatedBy: solution.updatedBy
  };
};

const migrateSolutionToGRC = async () => {
  try {
    console.log('Starting Solution to GRC migration...');
    
    // Get all solutions
    const solutions = await Solution.find();
    console.log(`Found ${solutions.length} solutions to migrate`);
    
    let migratedCount = 0;
    let errorCount = 0;
    
    for (const solution of solutions) {
      try {
        // Check if GRC service with same slug already exists
        const existingGRC = await GRCService.findOne({ slug: solution.slug });
        
        if (existingGRC) {
          console.log(`⚠️  GRC service with slug '${solution.slug}' already exists. Skipping...`);
          continue;
        }
        
        // Map solution data to GRC structure
        const grcData = mapSolutionToGRC(solution);
        
        // Ensure unique slug
        const uniqueSlug = await ensureUniqueSlug(grcData.slug, solution._id);
        grcData.slug = uniqueSlug;
        
        // Create GRC service
        const grcService = new GRCService(grcData);
        await grcService.save();
        
        console.log(`✓ Migrated solution: ${solution.solutionName} -> GRC Service: ${grcService.title}`);
        migratedCount++;
        
      } catch (error) {
        console.error(`✗ Error migrating solution ${solution.solutionName}:`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n=== Migration Summary ===');
    console.log(`Total solutions processed: ${solutions.length}`);
    console.log(`Successfully migrated: ${migratedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('Migration completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateSolutionToGRC();
