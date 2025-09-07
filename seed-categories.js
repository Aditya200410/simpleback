const mongoose = require('mongoose');
const Category = require('./models/Category');
const User = require('./models/User');
require('dotenv').config();

// Set default environment variables if not provided
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const defaultCategories = [
  {
    name: 'Programming',
    description: 'Learn programming languages and software development'
  },
  {
    name: 'Data Science',
    description: 'Data analysis, machine learning, and statistics'
  },
  {
    name: 'Web Development',
    description: 'Frontend and backend web development technologies'
  },
  {
    name: 'Mobile Development',
    description: 'iOS, Android, and cross-platform mobile app development'
  },
  {
    name: 'Cloud Computing',
    description: 'AWS, Azure, Google Cloud Platform services'
  },
  {
    name: 'Cybersecurity',
    description: 'Information security, ethical hacking, and privacy'
  },
  {
    name: 'AI/ML',
    description: 'Artificial Intelligence and Machine Learning'
  },
  {
    name: 'DevOps',
    description: 'Development operations, CI/CD, and infrastructure'
  }
];

const seedCategories = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find an admin user to assign as creator
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Looking for any existing user...');
      adminUser = await User.findOne({});
      
      if (!adminUser) {
        console.log('No users found. Creating default admin user...');
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        adminUser = new User({
          email: 'admin@simplelearn.com',
          password: hashedPassword,
          role: 'admin'
        });
        
        await adminUser.save();
        console.log('Default admin user created');
      } else {
        console.log('Using existing user as category creator');
      }
    } else {
      console.log('Found admin user:', adminUser.email);
    }

    // Clear existing categories
    await Category.deleteMany({});
    console.log('Cleared existing categories');

    // Create categories
    const categories = defaultCategories.map(cat => ({
      ...cat,
      createdBy: adminUser._id,
      status: 'Active'
    }));

    await Category.insertMany(categories);
    console.log(`✅ Successfully seeded ${categories.length} categories:`);
    
    categories.forEach(cat => {
      console.log(`   - ${cat.name}: ${cat.description}`);
    });

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the seeder
seedCategories();
