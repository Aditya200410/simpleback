const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Complete list of all GRC Services
const allGRCServices = [
  // Information Security, Privacy, and IT Services
  {
    title: "ISO 27001: Information Security Management Systems (ISMS) Consultation and Certification",
    slug: "iso-27001-information-security-management-systems-isms-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 27001 ISMS implementation and certification services to establish robust information security management systems that protect your organization's sensitive data and ensure compliance with international standards.",
    detailedDescription: "Our ISO 27001 Information Security Management Systems (ISMS) consultation and certification services provide end-to-end support for organizations seeking to implement, maintain, and achieve certification for their information security management systems. We guide you through the entire process from initial assessment to final certification, ensuring your organization meets the rigorous requirements of ISO/IEC 27001:2022. Our expert consultants work closely with your team to develop comprehensive security policies, implement effective controls, conduct risk assessments, and prepare for certification audits. We help you establish a systematic approach to managing sensitive company information, ensuring confidentiality, integrity, and availability of data while building stakeholder confidence and meeting regulatory requirements.",
    icon: "🔒",
    features: [
      "Comprehensive ISMS gap analysis and readiness assessment",
      "Customized security policy development and implementation",
      "Risk assessment and treatment plan development",
      "Security control implementation and monitoring",
      "Internal audit program establishment",
      "Management review process setup",
      "Certification audit preparation and support",
      "Continuous improvement framework implementation",
      "Staff training and awareness programs",
      "Documentation management system setup"
    ],
    benefits: [
      {
        title: "Enhanced Security Posture",
        description: "Implement robust information security controls that protect against cyber threats, data breaches, and unauthorized access to sensitive information."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet international standards and regulatory requirements, reducing legal risks and ensuring compliance with data protection laws."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build trust with customers, partners, and stakeholders by demonstrating commitment to information security best practices."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive edge in tenders and contracts where ISO 27001 certification is a requirement or preferred qualification."
      },
      {
        title: "Risk Management",
        description: "Establish systematic approach to identify, assess, and manage information security risks across the organization."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline security processes and procedures, reducing security incidents and improving overall operational efficiency."
      }
    ],
    process: [
      {
        step: 1,
        title: "Initial Assessment and Gap Analysis",
        description: "Conduct comprehensive assessment of current security practices, identify gaps against ISO 27001 requirements, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "ISMS Design and Planning",
        description: "Design ISMS framework, develop security policies and procedures, establish organizational structure and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Risk Assessment and Treatment",
        description: "Conduct detailed risk assessment, develop risk treatment plan, implement security controls and risk mitigation measures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Implementation and Training",
        description: "Implement security controls, conduct staff training, establish monitoring and measurement processes.",
        duration: "6-8 weeks"
      },
      {
        step: 5,
        title: "Internal Audit and Management Review",
        description: "Conduct internal audits, perform management review, address non-conformities and implement corrective actions.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit Preparation",
        description: "Prepare for certification audit, conduct pre-assessment, ensure all requirements are met and documentation is complete.",
        duration: "2-3 weeks"
      },
      {
        step: 7,
        title: "Certification Audit Support",
        description: "Support during certification audit, address auditor findings, implement corrective actions and achieve certification.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Management commitment and support for ISMS implementation",
      "Dedicated project team and resources allocation",
      "Access to all organizational processes and systems",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-12 months for full implementation",
      "Documentation of current security practices and procedures",
      "Staff availability for training and awareness programs"
    ],
    deliverables: [
      "Complete ISMS documentation package including policies, procedures, and guidelines",
      "Risk assessment report and risk treatment plan",
      "Security control implementation guide and checklist",
      "Internal audit program and audit reports",
      "Management review records and action plans",
      "Staff training materials and awareness program",
      "Certification audit preparation package",
      "Continuous improvement framework and monitoring tools",
      "ISMS maintenance and update procedures",
      "Certificate of ISO 27001 compliance upon successful audit"
    ],
    pricing: {
      startingFrom: 250000,
      currency: "INR",
      includes: [
        "Complete ISMS implementation support",
        "All documentation development",
        "Risk assessment and treatment planning",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Software licensing costs",
        "Hardware and infrastructure costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-12 months",
    industry: [
      "Information Technology",
      "Financial Services",
      "Healthcare",
      "Manufacturing",
      "Government",
      "Education",
      "Retail",
      "Telecommunications",
      "Energy",
      "Consulting"
    ],
    compliance: [
      "ISO/IEC 27001:2022",
      "ISO/IEC 27002:2022",
      "GDPR",
      "DPDP Act",
      "SOX",
      "PCI DSS",
      "HIPAA"
    ],
    faqs: [
      {
        question: "How long does ISO 27001 certification take?",
        answer: "The complete ISO 27001 implementation and certification process typically takes 6-12 months, depending on organization size, complexity, and current security maturity level."
      },
      {
        question: "What is the validity period of ISO 27001 certification?",
        answer: "ISO 27001 certification is valid for 3 years, with annual surveillance audits required to maintain certification status."
      },
      {
        question: "Do we need to have existing security measures in place?",
        answer: "While existing security measures help, our consultants will assess your current state and implement necessary controls to meet ISO 27001 requirements."
      },
      {
        question: "What happens after certification?",
        answer: "We provide 12 months of post-certification support including surveillance audit preparation, continuous improvement guidance, and ISMS maintenance support."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services Company ISMS Implementation",
        description: "A leading financial services company achieved ISO 27001 certification within 8 months, improving their security posture and winning new enterprise clients.",
        industry: "Financial Services",
        results: [
          "Achieved ISO 27001 certification in 8 months",
          "Reduced security incidents by 60%",
          "Won 3 new enterprise contracts worth $2M",
          "Improved customer confidence scores by 40%"
        ]
      },
      {
        title: "Healthcare Provider Compliance Achievement",
        description: "A healthcare provider successfully implemented ISMS to meet HIPAA and GDPR requirements while achieving ISO 27001 certification.",
        industry: "Healthcare",
        results: [
          "Achieved ISO 27001 certification",
          "Full HIPAA and GDPR compliance",
          "Zero data breaches in 12 months",
          "Reduced compliance audit findings by 80%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 1
  },
  {
    title: "ISO 27701: Privacy Information Management Systems (PIMS) Consultation and Certification",
    slug: "iso-27701-privacy-information-management-systems-pims-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Specialized ISO 27701 PIMS implementation and certification services to establish comprehensive privacy management systems that ensure compliance with global data protection regulations and build customer trust.",
    detailedDescription: "Our ISO 27701 Privacy Information Management Systems (PIMS) consultation and certification services help organizations implement robust privacy management frameworks that extend ISO 27001 ISMS to include privacy-specific requirements. This comprehensive service covers the implementation of privacy controls, data protection measures, and compliance with international privacy standards including GDPR, CCPA, and other regional data protection laws. Our expert privacy consultants work with your organization to establish privacy governance structures, implement privacy-by-design principles, conduct privacy impact assessments, and develop comprehensive data protection policies. We guide you through the entire certification process, ensuring your privacy management system meets the highest international standards while providing practical, implementable solutions for ongoing privacy compliance.",
    icon: "🛡️",
    features: [
      "Privacy governance framework establishment",
      "Privacy impact assessment (PIA) implementation",
      "Data protection policy development",
      "Privacy-by-design process integration",
      "Data subject rights management system",
      "Privacy breach notification procedures",
      "Data processing activity mapping",
      "Privacy training and awareness programs",
      "Third-party privacy risk management",
      "Privacy monitoring and measurement systems"
    ],
    benefits: [
      {
        title: "Global Privacy Compliance",
        description: "Achieve compliance with major privacy regulations including GDPR, CCPA, PIPEDA, and other international data protection laws."
      },
      {
        title: "Enhanced Customer Trust",
        description: "Demonstrate commitment to privacy protection, building stronger relationships with customers and stakeholders."
      },
      {
        title: "Reduced Privacy Risks",
        description: "Implement systematic approach to identify, assess, and mitigate privacy risks across all data processing activities."
      },
      {
        title: "Competitive Differentiation",
        description: "Stand out in the market with certified privacy management capabilities, especially important for B2B services."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline privacy processes and reduce time spent on compliance activities through systematic management approach."
      },
      {
        title: "Legal Protection",
        description: "Reduce legal risks and potential fines by demonstrating proactive privacy management and compliance efforts."
      }
    ],
    process: [
      {
        step: 1,
        title: "Privacy Assessment and Gap Analysis",
        description: "Evaluate current privacy practices, identify gaps against ISO 27701 requirements, and assess compliance with applicable privacy laws.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "PIMS Framework Design",
        description: "Design privacy management framework, establish privacy governance structure, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Privacy Controls Implementation",
        description: "Implement privacy-specific controls, develop data protection policies, and establish privacy monitoring processes.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Data Processing Mapping",
        description: "Map all data processing activities, conduct privacy impact assessments, and implement privacy-by-design processes.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Awareness",
        description: "Conduct privacy training programs, establish awareness campaigns, and ensure staff competency in privacy management.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Internal Audit and Review",
        description: "Conduct internal privacy audits, perform management review, and address any identified non-conformities.",
        duration: "2-3 weeks"
      },
      {
        step: 7,
        title: "Certification Preparation and Audit",
        description: "Prepare for certification audit, support audit process, and achieve ISO 27701 certification.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Existing ISO 27001 ISMS or commitment to implement both standards",
      "Management commitment to privacy protection and compliance",
      "Dedicated privacy team and resources",
      "Access to all data processing activities and systems",
      "Cooperation from legal, IT, and business teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current privacy practices"
    ],
    deliverables: [
      "Complete PIMS documentation package",
      "Privacy impact assessment framework",
      "Data protection policies and procedures",
      "Privacy-by-design implementation guide",
      "Data subject rights management procedures",
      "Privacy breach notification procedures",
      "Staff training materials and programs",
      "Internal audit program and reports",
      "Certification audit preparation package",
      "ISO 27701 certificate upon successful audit"
    ],
    pricing: {
      startingFrom: 200000,
      currency: "INR",
      includes: [
        "Complete PIMS implementation support",
        "All privacy documentation development",
        "Privacy impact assessment framework",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Legal consultation fees",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Software licensing costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Information Technology",
      "Healthcare",
      "Financial Services",
      "E-commerce",
      "Marketing and Advertising",
      "Education",
      "Government",
      "Telecommunications",
      "Consulting",
      "Manufacturing"
    ],
    compliance: [
      "ISO/IEC 27701:2019",
      "GDPR",
      "CCPA",
      "PIPEDA",
      "DPDP Act",
      "LGPD",
      "PDPA"
    ],
    faqs: [
      {
        question: "Do we need ISO 27001 before implementing ISO 27701?",
        answer: "ISO 27701 extends ISO 27001, so you need either an existing ISO 27001 ISMS or implement both standards together. We can help with either approach."
      },
      {
        question: "How does ISO 27701 help with GDPR compliance?",
        answer: "ISO 27701 provides a systematic framework for implementing GDPR requirements, including data protection by design, privacy impact assessments, and data subject rights management."
      },
      {
        question: "What is the difference between ISO 27701 and GDPR compliance?",
        answer: "ISO 27701 is a management system standard that provides a framework for implementing privacy controls, while GDPR is a legal regulation. ISO 27701 helps implement GDPR requirements systematically."
      },
      {
        question: "How long is ISO 27701 certification valid?",
        answer: "ISO 27701 certification is valid for 3 years with annual surveillance audits, similar to ISO 27001 certification."
      }
    ],
    caseStudies: [
      {
        title: "Tech Startup Privacy Compliance Achievement",
        description: "A fast-growing tech startup achieved ISO 27701 certification while implementing GDPR compliance, enabling European market expansion.",
        industry: "Information Technology",
        results: [
          "Achieved ISO 27701 certification in 7 months",
          "Full GDPR compliance implementation",
          "Successfully entered European markets",
          "Reduced privacy-related customer concerns by 70%"
        ]
      },
      {
        title: "Healthcare Data Processor Certification",
        description: "A healthcare data processing company achieved ISO 27701 certification to meet HIPAA and GDPR requirements for international operations.",
        industry: "Healthcare",
        results: [
          "Achieved ISO 27701 certification",
          "Enhanced HIPAA compliance",
          "Enabled international healthcare partnerships",
          "Reduced privacy audit findings by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 2
  }
];

async function seedAllGRCServices() {
  try {
    console.log('Starting comprehensive GRC Services seeding...');
    
    // Find or create a default user for createdBy field
    let defaultUser = await User.findOne({ role: 'admin' });
    if (!defaultUser) {
      defaultUser = await User.findOne();
    }
    
    if (!defaultUser) {
      console.log('No users found. Please create a user first.');
      return;
    }

    // Clear existing GRC services
    await GRCService.deleteMany({});
    console.log('Cleared existing GRC services');

    // Add createdBy and updatedBy to each service
    const servicesWithUsers = allGRCServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully seeded ${insertedServices.length} GRC services`);

    // Update related services references
    for (let i = 0; i < insertedServices.length; i++) {
      const service = insertedServices[i];
      const relatedServices = insertedServices
        .filter(s => s._id.toString() !== service._id.toString())
        .slice(0, 3) // Limit to 3 related services
        .map(s => s._id);
      
      await GRCService.findByIdAndUpdate(service._id, {
        relatedServices: relatedServices
      });
    }

    console.log('Updated related services references');
    console.log('Comprehensive GRC Services seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seeding function
seedAllGRCServices();
