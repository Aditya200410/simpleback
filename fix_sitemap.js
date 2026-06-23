const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '../simple/public/sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Use regex to remove <url> block that contains /all-courses
sitemapContent = sitemapContent.replace(/<url>[\s\S]*?<loc>https:\/\/www\.cyberatrix\.com\/all-courses<\/loc>[\s\S]*?<\/url>/g, '');

// Use regex to remove all <url> blocks that contain /course/
sitemapContent = sitemapContent.replace(/<url>[\s\S]*?<loc>https:\/\/www\.cyberatrix\.com\/course\/.*?<\/loc>[\s\S]*?<\/url>/g, '');

// Clean up the <!-- Courses (11) --> comment
sitemapContent = sitemapContent.replace(/<!-- Courses \(11\) -->\s*/g, '');

// Write back
fs.writeFileSync(sitemapPath, sitemapContent);

console.log("Cleaned sitemap.xml");
