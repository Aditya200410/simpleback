const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

const Course = require('./models/Course');
const GRCService = require('./models/GRCService');
const Solution = require('./models/Solution');
const Blog = require('./models/Blog');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to DB");

  const sitemapContent = fs.readFileSync('../simple/public/sitemap.xml', 'utf-8');
  const urlMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
  
  const unusedUrls = [];

  for (const match of urlMatches) {
    const loc = match[1];
    let exists = true;
    let category = '';

    if (loc.includes('/course/')) {
      const slug = loc.split('/course/')[1];
      const course = await Course.findOne({ slug });
      exists = !!course;
      category = 'course';
    } else if (loc.includes('/grc-services/')) {
      const slug = loc.split('/grc-services/')[1];
      const service = await GRCService.findOne({ slug });
      exists = !!service;
      category = 'grc-service';
    } else if (loc.includes('/solution/')) {
      const slug = loc.split('/solution/')[1];
      const solution = await Solution.findOne({ slug });
      exists = !!solution;
      category = 'solution';
    } else if (loc.includes('/blog/')) {
      const slug = loc.split('/blog/')[1];
      const blog = await Blog.findOne({ slug });
      exists = !!blog;
      category = 'blog';
    }

    if (category && !exists) {
      unusedUrls.push(loc);
    }
  }

  console.log("UNUSED_URLS:");
  console.log(JSON.stringify(unusedUrls, null, 2));

  process.exit(0);
}

run().catch(console.error);
