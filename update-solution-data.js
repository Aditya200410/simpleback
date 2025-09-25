const mongoose = require('mongoose');
const Solution = require('./models/Solution');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/simpleadmin');

const updateSolutionData = async () => {
  try {
    console.log('Starting Solution data update...');
    
    // Get all solutions
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
    
    console.log('\n=== Update Summary ===');
    console.log(`Total solutions processed: ${solutions.length}`);
    console.log(`Successfully updated: ${updatedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('Solution data update completed!');
    
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
};

// Run update
updateSolutionData();
