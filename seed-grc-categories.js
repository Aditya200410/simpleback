const mongoose = require('mongoose');
const GRCCategory = require('./models/GRCCategory');
require('dotenv').config();

// Set default environment variables if not provided
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const existingCategories = [
  {
    name: 'Standards & Compliance',
    description: 'Compliance with industry standards and regulatory requirements',
    status: 'Active'
  },
  {
    name: 'Payment Security',
    description: 'Payment card industry security and compliance services',
    status: 'Active'
  },
  {
    name: 'Security & Availability',
    description: 'Information security and system availability services',
    status: 'Active'
  },
  {
    name: 'Process Improvement',
    description: 'Business process optimization and improvement services',
    status: 'Active'
  },
  {
    name: 'Healthcare Compliance',
    description: 'Healthcare industry compliance and regulatory services',
    status: 'Active'
  },
  {
    name: 'Security Testing',
    description: 'Security assessment and penetration testing services',
    status: 'Active'
  },
  {
    name: 'Security Enhancement',
    description: 'Security infrastructure improvement and enhancement services',
    status: 'Active'
  },
  {
    name: 'Data Protection',
    description: 'Data privacy and protection compliance services',
    status: 'Active'
  },
  {
    name: 'Food Safety',
    description: 'Food safety and quality management services',
    status: 'Active'
  },
  {
    name: 'Enterprise Risk',
    description: 'Enterprise risk management and assessment services',
    status: 'Active'
  },
  {
    name: 'Cyber Security',
    description: 'Cybersecurity services and threat management',
    status: 'Active'
  },
  {
    name: 'Healthcare Security',
    description: 'Healthcare-specific security and compliance services',
    status: 'Active'
  }
];

const seedGRCCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing GRC categories
    await GRCCategory.deleteMany({});
    console.log('Cleared existing GRC categories');

    // Create a dummy user ID for createdBy field
    // In a real scenario, you would use an actual admin user ID
    const dummyUserId = new mongoose.Types.ObjectId();

    // Insert new categories
    const categoriesWithUser = existingCategories.map(category => ({
      ...category,
      createdBy: dummyUserId
    }));

    const insertedCategories = await GRCCategory.insertMany(categoriesWithUser);
    console.log(`Successfully seeded ${insertedCategories.length} GRC categories`);

    // Display the seeded categories
    console.log('\nSeeded GRC Categories:');
    insertedCategories.forEach(category => {
      console.log(`- ${category.name}: ${category.description}`);
    });

  } catch (error) {
    console.error('Error seeding GRC categories:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  }
};

// Run the seeding function
seedGRCCategories();
