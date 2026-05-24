const mongoose = require('mongoose');
require('dotenv').config();
const Course = require('./models/Course');
const Solution = require('./models/Solution');

async function checkSlugs() {
  await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0");
  
  const courses = await Course.find({}, 'courseName slug');
  console.log('--- COURSES ---');
  courses.forEach(c => console.log(`${c.courseName}: ${c.slug}`));
  
  const solutions = await Solution.find({}, 'title slug');
  console.log('--- SOLUTIONS ---');
  solutions.forEach(s => console.log(`${s.title}: ${s.slug}`));
  
  process.exit();
}

checkSlugs();
