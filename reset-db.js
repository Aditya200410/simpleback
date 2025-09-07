const mongoose = require('mongoose');
require('dotenv').config();

// Set default environment variables if not provided
process.env.JWT_SECRET = process.env.JWT_SECRET || 'simple_admin_jwt_secret_key_2024_secure_token';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const resetDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Dropping database...');
    await mongoose.connection.db.dropDatabase();
    console.log('✅ Database dropped successfully!');
    
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    mongoose.connection.close();
  }
};

resetDatabase();
