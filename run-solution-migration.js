const mongoose = require('mongoose');
const Solution = require('./models/Solution');
const GRCService = require('./models/GRCService');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simpleadmin');

const runSolutionMigration = async () => {
  try {
    console.log('🚀 Starting complete Solution to GRC migration...\n');
    
    // Step 1: Update existing Solution documents to match new schema
    console.log('📝 Step 1: Updating existing Solution documents...');
    const solutions = await Solution.find();
    console.log(`Found ${solutions.length} solutions to update`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const solution of solutions) {
      try {
        const updateData = {};
        
        // Map solutionName to title
        if (solution.solutionName && !solution.title) {
          updateData.title = solution.solutionName;
        }
        
        // Map description to detailedDescription if detailedDescription doesn't exist
        if (solution.description && !solution.detailedDescription) {
          updateData.detailedDescription = solution.description;
        }
        
        // Map faq to faqs
        if (solution.faq && !solution.faqs) {
          updateData.faqs = solution.faq;
        }
        
        // Map relatedSolutions to relatedServices
        if (solution.relatedSolutions && !solution.relatedServices) {
          updateData.relatedServices = solution.relatedSolutions;
        }
        
        // Update pricing structure if needed
        if (solution.price && !solution.pricing) {
          updateData.pricing = {
            startingFrom: solution.price,
            currency: 'INR',
            includes: [],
            excludes: []
          };
        }
        
        // Update features to be required
        if (solution.features && solution.features.length === 0) {
          updateData.features = ['Basic features included'];
        }
        
        // Update requirements to be required
        if (solution.requirements && solution.requirements.length === 0) {
          updateData.requirements = ['Basic requirements'];
        }
        
        // Update deliverables to be required
        if (solution.deliverables && solution.deliverables.length === 0) {
          updateData.deliverables = ['Project deliverables'];
        }
        
        // Update icon to default GRC icon
        if (solution.icon === '🚀') {
          updateData.icon = '🛡️';
        }
        
        // Only update if there are changes
        if (Object.keys(updateData).length > 0) {
          await Solution.findByIdAndUpdate(solution._id, updateData);
          console.log(`✓ Updated solution: ${solution.solutionName || solution.title}`);
          updatedCount++;
        } else {
          console.log(`- No updates needed for: ${solution.solutionName || solution.title}`);
        }
        
      } catch (error) {
        console.error(`✗ Error updating solution ${solution.solutionName || solution.title}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\n📊 Step 1 Summary: ${updatedCount} updated, ${errorCount} errors\n`);
    
    // Step 2: Create GRC services from updated solutions
    console.log('🔄 Step 2: Creating GRC services from solutions...');
    
    const updatedSolutions = await Solution.find();
    let migratedCount = 0;
    let grcErrorCount = 0;
    
    for (const solution of updatedSolutions) {
      try {
        // Check if GRC service with same slug already exists
        const existingGRC = await GRCService.findOne({ slug: solution.slug });
        
        if (existingGRC) {
          console.log(`⚠️  GRC service with slug '${solution.slug}' already exists. Skipping...`);
          continue;
        }
        
        // Map solution data to GRC structure
        const grcData = {
          title: solution.title || solution.solutionName,
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
          faqs: solution.faqs || solution.faq || [],
          caseStudies: solution.caseStudies || [],
          relatedServices: [],
          isActive: solution.isActive !== undefined ? solution.isActive : true,
          priority: solution.priority || 0,
          createdBy: solution.createdBy,
          updatedBy: solution.updatedBy
        };
        
        // Ensure unique slug
        let finalSlug = grcData.slug;
        let counter = 1;
        while (await GRCService.findOne({ slug: finalSlug })) {
          finalSlug = `${grcData.slug}-${counter}`;
          counter++;
        }
        grcData.slug = finalSlug;
        
        // Create GRC service
        const grcService = new GRCService(grcData);
        await grcService.save();
        
        console.log(`✓ Created GRC service: ${grcService.title} (${grcService.slug})`);
        migratedCount++;
        
      } catch (error) {
        console.error(`✗ Error creating GRC service for ${solution.title || solution.solutionName}:`, error.message);
        grcErrorCount++;
      }
    }
    
    console.log(`\n📊 Step 2 Summary: ${migratedCount} GRC services created, ${grcErrorCount} errors\n`);
    
    // Final summary
    console.log('🎉 === MIGRATION COMPLETE ===');
    console.log(`Total solutions processed: ${solutions.length}`);
    console.log(`Solutions updated: ${updatedCount}`);
    console.log(`GRC services created: ${migratedCount}`);
    console.log(`Total errors: ${errorCount + grcErrorCount}`);
    console.log('\n✅ Solution data has been successfully migrated to match GRC structure!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
runSolutionMigration();
