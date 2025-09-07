const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');
require('dotenv').config();

// Set MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const grcServicesData = [
  {
    title: 'ISO Certification',
    category: 'Standards & Compliance',
    description: 'International Organization for Standardization compliance and certification services for quality management systems.',
    icon: '🏆',
    features: ['ISO 9001', 'ISO 27001', 'ISO 14001', 'ISO 45001'],
    duration: '3-6 months',
    level: 'Enterprise',
    priority: 10
  },
  {
    title: 'PCI DSS',
    category: 'Payment Security',
    description: 'Payment Card Industry Data Security Standard compliance for secure payment processing.',
    icon: '💳',
    features: ['Level 1-4 Compliance', 'Network Security', 'Data Protection', 'Regular Testing'],
    duration: '2-4 months',
    level: 'Critical',
    priority: 9
  },
  {
    title: 'SOC 2 (Type 1 and Type 2)',
    category: 'Security & Availability',
    description: 'Service Organization Control reports for security, availability, and confidentiality.',
    icon: '🛡️',
    features: ['Type 1 Assessment', 'Type 2 Monitoring', 'Trust Services Criteria', 'Continuous Compliance'],
    duration: '4-8 months',
    level: 'Enterprise',
    priority: 8
  },
  {
    title: 'CMMI Level 1-5',
    category: 'Process Improvement',
    description: 'Capability Maturity Model Integration for process improvement and organizational maturity.',
    icon: '📊',
    features: ['Maturity Assessment', 'Process Optimization', 'Performance Improvement', 'Best Practices'],
    duration: '6-12 months',
    level: 'Strategic',
    priority: 7
  },
  {
    title: 'HIPAA Certification',
    category: 'Healthcare Compliance',
    description: 'Health Insurance Portability and Accountability Act compliance for healthcare organizations.',
    icon: '🏥',
    features: ['Privacy Rules', 'Security Rules', 'Breach Notification', 'Business Associate Agreements'],
    duration: '2-3 months',
    level: 'Critical',
    priority: 8
  },
  {
    title: 'VAPT Services',
    category: 'Security Testing',
    description: 'Vulnerability Assessment and Penetration Testing for Mobile, API, Infrastructure, and Cloud.',
    icon: '🔍',
    features: ['Mobile App Testing', 'API Security', 'Infrastructure Assessment', 'Cloud Security'],
    duration: '1-2 months',
    level: 'Essential',
    priority: 9
  },
  {
    title: 'Infrastructure Hardening Services',
    category: 'Security Enhancement',
    description: 'Comprehensive security hardening services for IT infrastructure and systems.',
    icon: '🔒',
    features: ['Server Hardening', 'Network Security', 'Access Controls', 'Security Policies'],
    duration: '2-4 months',
    level: 'Critical',
    priority: 7
  },
  {
    title: 'GDPR',
    category: 'Data Protection',
    description: 'General Data Protection Regulation compliance for EU data protection requirements.',
    icon: '🇪🇺',
    features: ['Data Mapping', 'Privacy Impact Assessments', 'Consent Management', 'Breach Response'],
    duration: '3-6 months',
    level: 'Critical',
    priority: 8
  },
  {
    title: 'HACCP',
    category: 'Food Safety',
    description: 'Hazard Analysis and Critical Control Points system for food safety management.',
    icon: '🍽️',
    features: ['Hazard Analysis', 'Critical Control Points', 'Monitoring Systems', 'Corrective Actions'],
    duration: '2-3 months',
    level: 'Essential',
    priority: 6
  },
  {
    title: 'GFSI Certification',
    category: 'Food Safety',
    description: 'Global Food Safety Initiative certification for food safety standards.',
    icon: '🌍',
    features: ['BRC Standards', 'SQF Certification', 'IFS Standards', 'FSSC 22000'],
    duration: '3-4 months',
    level: 'Enterprise',
    priority: 5
  },
  {
    title: 'Risk Management',
    category: 'Enterprise Risk',
    description: 'Comprehensive risk assessment, analysis, and mitigation strategies.',
    icon: '⚖️',
    features: ['Risk Assessment', 'Threat Analysis', 'Mitigation Strategies', 'Continuous Monitoring'],
    duration: '2-6 months',
    level: 'Strategic',
    priority: 8
  },
  {
    title: 'FSSC Certification',
    category: 'Food Safety',
    description: 'Food Safety System Certification based on ISO 22000 and technical specifications.',
    icon: '📋',
    features: ['ISO 22000 Base', 'Technical Specifications', 'HACCP Principles', 'Continuous Improvement'],
    duration: '3-5 months',
    level: 'Enterprise',
    priority: 5
  },
  {
    title: 'Essential 8',
    category: 'Cyber Security',
    description: 'Australian Government Essential 8 cyber security framework implementation.',
    icon: '🛡️',
    features: ['Application Control', 'Patch Management', 'Admin Privileges', 'Multi-factor Authentication'],
    duration: '2-4 months',
    level: 'Critical',
    priority: 7
  },
  {
    title: 'HITRUST',
    category: 'Healthcare Security',
    description: 'Health Information Trust Alliance framework for healthcare information protection.',
    icon: '🏥',
    features: ['CSF Assessment', 'Risk Management', 'Compliance Validation', 'Continuous Monitoring'],
    duration: '4-6 months',
    level: 'Enterprise',
    priority: 6
  }
];

const seedGRCServices = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find or create a default admin user
    let adminUser = await User.findOne({ email: 'admin@cyberatrix.com' });
    
    if (!adminUser) {
      console.log('👤 Creating default admin user...');
      adminUser = await User.create({
        name: 'System Admin',
        email: 'admin@cyberatrix.com',
        password: 'hashedpassword', // This should be properly hashed in production
        role: 'admin',
        isActive: true
      });
      console.log('✅ Admin user created');
    }

    // Clear existing GRC services
    console.log('🗑️ Clearing existing GRC services...');
    await GRCService.deleteMany({});
    console.log('✅ Existing GRC services cleared');

    // Insert new GRC services
    console.log('📊 Seeding GRC services...');
    
    const grcServicesWithCreator = grcServicesData.map(service => ({
      ...service,
      createdBy: adminUser._id,
      isActive: true
    }));

    const createdServices = await GRCService.insertMany(grcServicesWithCreator);
    
    console.log(`✅ Successfully seeded ${createdServices.length} GRC services:`);
    createdServices.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title} (${service.category})`);
    });

    console.log('\n📈 GRC Services Summary:');
    const categories = [...new Set(createdServices.map(s => s.category))];
    categories.forEach(category => {
      const count = createdServices.filter(s => s.category === category).length;
      console.log(`   • ${category}: ${count} services`);
    });

    console.log('\n🎯 Service Levels:');
    const levels = ['Essential', 'Critical', 'Enterprise', 'Strategic'];
    levels.forEach(level => {
      const count = createdServices.filter(s => s.level === level).length;
      console.log(`   • ${level}: ${count} services`);
    });

    console.log('\n✨ GRC services seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding GRC services:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the seeding function
if (require.main === module) {
  seedGRCServices();
}

module.exports = seedGRCServices;
