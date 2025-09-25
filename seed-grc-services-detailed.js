const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');
require('dotenv').config();

// Set MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const detailedGRCServicesData = [
  {
    title: 'ISO 27001 Certification and Implementation',
    category: 'Standards & Compliance',
    shortDescription: 'Comprehensive ISO 27001 certification and implementation services to establish robust information security management systems.',
    detailedDescription: `ISO 27001 is the international standard for Information Security Management Systems (ISMS). Our comprehensive certification and implementation service helps organizations establish, implement, maintain, and continually improve their information security management system.

Our expert team guides you through the entire ISO 27001 journey, from initial gap analysis to final certification. We understand that every organization is unique, which is why we tailor our approach to your specific industry requirements, organizational structure, and risk profile.

With over 10 years of experience in information security and compliance, our certified auditors and consultants have successfully helped hundreds of organizations across various industries achieve ISO 27001 certification. We pride ourselves on delivering practical, business-focused solutions that not only meet certification requirements but also provide real value to your organization.

Our implementation process is designed to be efficient and minimally disruptive to your day-to-day operations. We work closely with your team to ensure that security controls are not just implemented, but are practical, effective, and sustainable.`,
    icon: '🛡️',
    heroImage: '/images/iso27001-hero.jpg',
    features: [
      'Gap Analysis and Risk Assessment',
      'ISMS Design and Implementation',
      'Security Control Implementation',
      'Documentation and Policy Development',
      'Staff Training and Awareness',
      'Internal Audit and Management Review',
      'Certification Body Coordination',
      'Continuous Improvement Support'
    ],
    benefits: [
      {
        title: 'Enhanced Security Posture',
        description: 'Strengthen your organization\'s information security framework with internationally recognized best practices and controls.'
      },
      {
        title: 'Regulatory Compliance',
        description: 'Meet various regulatory requirements and demonstrate due diligence in information security management.'
      },
      {
        title: 'Competitive Advantage',
        description: 'Gain a competitive edge by demonstrating your commitment to information security to clients and partners.'
      },
      {
        title: 'Risk Mitigation',
        description: 'Identify, assess, and mitigate information security risks before they become costly incidents.'
      },
      {
        title: 'Customer Trust',
        description: 'Build and maintain customer confidence through certified information security management practices.'
      },
      {
        title: 'Operational Efficiency',
        description: 'Streamline security processes and improve overall operational efficiency through structured management systems.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Initial Assessment',
        description: 'Comprehensive gap analysis and risk assessment to understand your current security posture and identify areas for improvement.',
        duration: '2-3 weeks'
      },
      {
        step: 2,
        title: 'ISMS Design',
        description: 'Design and document your Information Security Management System including policies, procedures, and controls.',
        duration: '3-4 weeks'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Implement security controls, conduct staff training, and establish monitoring and measurement processes.',
        duration: '8-12 weeks'
      },
      {
        step: 4,
        title: 'Internal Audit',
        description: 'Conduct internal audits to verify implementation effectiveness and identify areas for improvement.',
        duration: '2-3 weeks'
      },
      {
        step: 5,
        title: 'Management Review',
        description: 'Facilitate management review and address any non-conformities before certification audit.',
        duration: '1-2 weeks'
      },
      {
        step: 6,
        title: 'Certification Audit',
        description: 'Coordinate with certification body and support you through the external audit process.',
        duration: '2-3 weeks'
      }
    ],
    requirements: [
      'Management commitment and support',
      'Dedicated project team and resources',
      'Access to all relevant documentation and systems',
      'Staff availability for training and interviews',
      'Budget allocation for implementation and certification',
      'Timeline commitment of 4-6 months'
    ],
    deliverables: [
      'Complete ISMS documentation package',
      'Risk assessment and treatment plan',
      'Security policies and procedures',
      'Training materials and records',
      'Internal audit reports',
      'Management review documentation',
      'Certification audit support',
      'Ongoing maintenance guidance'
    ],
    pricing: {
      startingFrom: 15000,
        currency: 'INR',
      includes: [
        'Gap analysis and risk assessment',
        'ISMS design and documentation',
        'Implementation support and guidance',
        'Staff training and awareness programs',
        'Internal audit and management review',
        'Certification body coordination',
        '12 months of post-certification support'
      ],
      excludes: [
        'Certification body fees (separate)',
        'Technology implementation costs',
        'Additional training beyond standard package',
        'Ongoing maintenance after 12 months'
      ]
    },
    duration: '4-6 months',
    level: 'Enterprise',
    industry: ['Healthcare', 'Finance', 'Technology', 'Government', 'Education', 'Manufacturing'],
    compliance: ['ISO 27001:2022', 'ISO 27002', 'NIST Cybersecurity Framework', 'GDPR', 'SOX'],
    faqs: [
      {
        question: 'How long does ISO 27001 certification take?',
        answer: 'The typical timeline for ISO 27001 certification is 4-6 months, depending on the size and complexity of your organization. This includes gap analysis, implementation, internal audits, and the certification audit.'
      },
      {
        question: 'What is the difference between ISO 27001 and ISO 27002?',
        answer: 'ISO 27001 is the management system standard that provides requirements for establishing, implementing, maintaining, and continually improving an ISMS. ISO 27002 provides detailed guidance on implementing the security controls specified in ISO 27001.'
      },
      {
        question: 'Do we need to have all security controls implemented before certification?',
        answer: 'No, you need to demonstrate that you have a systematic approach to managing information security risks. Some controls may be implemented, while others may be planned for future implementation based on your risk assessment.'
      },
      {
        question: 'How much does ISO 27001 certification cost?',
        answer: 'Costs vary depending on organization size, complexity, and current security posture. Our implementation services start from Rs 15,000, plus certification body fees which are separate and typically range from Rs 5,000-Rs 15,000 depending on organization size.'
      },
      {
        question: 'What happens after we get certified?',
        answer: 'After certification, you\'ll need to maintain your ISMS through regular internal audits, management reviews, and continuous improvement. We provide 12 months of post-certification support to help you maintain compliance.'
      }
    ],
    caseStudies: [
      {
        title: 'Healthcare Provider Achieves ISO 27001 in 4 Months',
        description: 'A mid-size healthcare provider with 500+ employees successfully achieved ISO 27001 certification within 4 months, improving their security posture and meeting regulatory requirements.',
        industry: 'Healthcare',
        results: [
          '40% reduction in security incidents',
          '100% compliance with healthcare regulations',
          'Improved patient data protection',
          'Enhanced reputation and client confidence'
        ]
      }
    ],
    seoTitle: 'ISO 27001 Certification and Implementation Services | CyberSapiens',
    seoDescription: 'Professional ISO 27001 certification and implementation services. Expert guidance for information security management systems. Get certified in 4-6 months.',
    seoKeywords: ['ISO 27001', 'information security', 'ISMS', 'certification', 'compliance', 'cybersecurity', 'data protection'],
    priority: 10
  },
  {
    title: 'PCI DSS Compliance Services',
    category: 'Payment Security',
    shortDescription: 'Complete PCI DSS compliance services to secure payment card data and meet industry security standards.',
    detailedDescription: `The Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards designed to ensure that all companies that accept, process, store, or transmit credit card information maintain a secure environment.

Our PCI DSS compliance services help organizations of all sizes achieve and maintain compliance with the latest PCI DSS requirements. We understand the complexities of payment card security and provide comprehensive solutions tailored to your specific business model and technical environment.

Whether you're a small e-commerce business or a large enterprise processing millions of transactions, our certified PCI DSS assessors and consultants will guide you through every step of the compliance journey. We help you understand your compliance requirements, implement necessary security controls, and prepare for your annual assessment.

Our approach is practical and business-focused, ensuring that security controls don't hinder your operations while maintaining the highest levels of security for cardholder data.`,
    icon: '💳',
    heroImage: '/images/pci-dss-hero.jpg',
    features: [
      'PCI DSS Gap Analysis',
      'Network Security Implementation',
      'Data Protection Controls',
      'Access Control Management',
      'Regular Security Testing',
      'Compliance Documentation',
      'Staff Training Programs',
      'Ongoing Compliance Support'
    ],
    benefits: [
      {
        title: 'Reduced Risk of Data Breaches',
        description: 'Implement robust security controls to protect cardholder data and reduce the risk of costly data breaches.'
      },
      {
        title: 'Regulatory Compliance',
        description: 'Meet PCI DSS requirements and avoid costly fines and penalties from payment card brands.'
      },
      {
        title: 'Customer Trust',
        description: 'Build customer confidence by demonstrating your commitment to protecting their payment information.'
      },
      {
        title: 'Business Continuity',
        description: 'Ensure uninterrupted payment processing capabilities while maintaining security standards.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Scope Assessment',
        description: 'Identify all systems and processes that handle cardholder data to determine your PCI DSS scope.',
        duration: '1-2 weeks'
      },
      {
        step: 2,
        title: 'Gap Analysis',
        description: 'Assess current security controls against PCI DSS requirements and identify gaps.',
        duration: '2-3 weeks'
      },
      {
        step: 3,
        title: 'Remediation Planning',
        description: 'Develop a detailed remediation plan to address identified gaps and achieve compliance.',
        duration: '1-2 weeks'
      },
      {
        step: 4,
        title: 'Implementation',
        description: 'Implement necessary security controls, policies, and procedures to meet PCI DSS requirements.',
        duration: '4-8 weeks'
      },
      {
        step: 5,
        title: 'Testing and Validation',
        description: 'Conduct security testing and validation to ensure controls are working effectively.',
        duration: '2-3 weeks'
      },
      {
        step: 6,
        title: 'Assessment Preparation',
        description: 'Prepare for your PCI DSS assessment and coordinate with your Qualified Security Assessor (QSA).',
        duration: '1-2 weeks'
      }
    ],
    requirements: [
      'Access to all systems handling cardholder data',
      'Network diagrams and data flow documentation',
      'Current security policies and procedures',
      'Staff availability for interviews and training',
      'Budget for security tool implementation',
      'Timeline commitment of 3-6 months'
    ],
    deliverables: [
      'PCI DSS scope documentation',
      'Gap analysis report',
      'Remediation plan and timeline',
      'Updated security policies and procedures',
      'Network security implementation',
      'Staff training materials and records',
      'Compliance documentation package',
      'Ongoing compliance monitoring tools'
    ],
    pricing: {
      startingFrom: 12000,
      currency: 'INR',
      includes: [
        'PCI DSS scope assessment',
        'Gap analysis and remediation planning',
        'Security control implementation',
        'Policy and procedure development',
        'Staff training and awareness',
        'Compliance documentation',
        'Assessment preparation support',
        '6 months of ongoing support'
      ],
      excludes: [
        'QSA assessment fees (separate)',
        'Security tool licensing costs',
        'Network infrastructure changes',
        'Additional training beyond standard package'
      ]
    },
    duration: '3-6 months',
    level: 'Critical',
    industry: ['E-commerce', 'Retail', 'Hospitality', 'Healthcare', 'Financial Services'],
    compliance: ['PCI DSS 4.0', 'PCI DSS 3.2.1', 'PA-DSS', 'PCI P2PE'],
    faqs: [
      {
        question: 'What is the difference between PCI DSS levels?',
        answer: 'PCI DSS has four merchant levels based on transaction volume. Level 1 (highest) requires annual on-site assessments, while Levels 2-4 can use self-assessment questionnaires (SAQ) with varying requirements.'
      },
      {
        question: 'How often do we need to be assessed for PCI DSS compliance?',
        answer: 'PCI DSS compliance must be validated annually. Level 1 merchants require an annual on-site assessment by a QSA, while other levels may use SAQs depending on their specific situation.'
      },
      {
        question: 'Can we achieve PCI DSS compliance without storing cardholder data?',
        answer: 'Yes, if you don\'t store cardholder data, your compliance scope is significantly reduced. However, you still need to ensure secure transmission and processing of payment data.'
      },
      {
        question: 'What happens if we fail a PCI DSS assessment?',
        answer: 'If you fail an assessment, you\'ll receive a detailed report of non-compliant areas. You\'ll need to remediate these issues and undergo a re-assessment. Payment card brands may impose fines for non-compliance.'
      }
    ],
    caseStudies: [
      {
        title: 'E-commerce Platform Achieves Level 1 PCI DSS Compliance',
        description: 'A high-volume e-commerce platform processing over 6 million transactions annually successfully achieved Level 1 PCI DSS compliance.',
        industry: 'E-commerce',
        results: [
          'Zero security incidents post-implementation',
          'Reduced compliance costs by 30%',
          'Improved customer trust and conversion rates',
          'Streamlined payment processing workflows'
        ]
      }
    ],
    seoTitle: 'PCI DSS Compliance Services | Payment Security Solutions',
    seoDescription: 'Professional PCI DSS compliance services for secure payment processing. Expert guidance for all merchant levels. Achieve compliance in 3-6 months.',
    seoKeywords: ['PCI DSS', 'payment security', 'compliance', 'credit card security', 'data protection', 'e-commerce security'],
    priority: 9
  }
];

const seedDetailedGRCServices = async () => {
  try {
    console.log('🚀 Connecting to MongoDB...');
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

    // Insert new detailed GRC services
    console.log('🌱 Seeding detailed GRC services...');

    const grcServicesWithCreator = detailedGRCServicesData.map(service => ({
      ...service,
      slug: service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdBy: adminUser._id,
      isActive: true
    }));

    const createdServices = await GRCService.insertMany(grcServicesWithCreator);

    console.log(`✅ Successfully seeded ${createdServices.length} detailed GRC services:`);
    createdServices.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title} (${service.category})`);
    });

    console.log('\n📊 Detailed GRC Services Summary:');
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

    console.log('\n✨ Detailed GRC services seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding detailed GRC services:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run the seeding function
if (require.main === module) {
  seedDetailedGRCServices();
}

module.exports = { seedDetailedGRCServices, detailedGRCServicesData };
