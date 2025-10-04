const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const additionalGRCServices = [
  {
    title: "ISO 27701: Privacy Information Management Systems (PIMS) Consultation and Certification",
    slug: "iso-27701-privacy-information-management-systems-pims-consultation-certification",
    category: "Information Security, Privacy, and IT Services",
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
  },
  {
    title: "ISO 27017: Cloud Security Consultation and Certification",
    slug: "iso-27017-cloud-security-consultation-certification",
    category: "Information Security, Privacy, and IT Services",
    shortDescription: "Specialized ISO 27017 cloud security implementation and certification services to secure cloud computing environments and ensure compliance with international cloud security standards.",
    detailedDescription: "Our ISO 27017 cloud security consultation and certification services provide comprehensive support for organizations implementing cloud computing solutions while maintaining robust security controls. This specialized service addresses the unique security challenges of cloud environments, including shared responsibility models, data residency requirements, and cloud-specific threats. Our cloud security experts work with your organization to implement cloud security controls, establish cloud governance frameworks, and ensure compliance with ISO/IEC 27017:2015 standards. We help you navigate the complexities of cloud security, from initial cloud strategy development to ongoing security monitoring and compliance management. Our approach covers both cloud service providers and cloud service customers, ensuring comprehensive security coverage across all cloud deployment models.",
    icon: "☁️",
    features: [
      "Cloud security control implementation",
      "Cloud governance framework establishment",
      "Shared responsibility model implementation",
      "Cloud risk assessment and management",
      "Data residency and sovereignty compliance",
      "Cloud access control and identity management",
      "Cloud monitoring and logging systems",
      "Incident response for cloud environments",
      "Cloud vendor security assessment",
      "Cloud security training and awareness"
    ],
    benefits: [
      {
        title: "Enhanced Cloud Security",
        description: "Implement comprehensive security controls specifically designed for cloud computing environments, protecting against cloud-specific threats."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet cloud security requirements for various regulations including GDPR, HIPAA, SOX, and industry-specific standards."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically identify and mitigate cloud-specific risks including data breaches, service disruptions, and compliance violations."
      },
      {
        title: "Vendor Management",
        description: "Establish robust processes for evaluating and managing cloud service provider security capabilities and compliance."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline cloud security operations through standardized processes and automated monitoring capabilities."
      },
      {
        title: "Business Continuity",
        description: "Ensure business continuity and disaster recovery capabilities in cloud environments with proper security controls."
      }
    ],
    process: [
      {
        step: 1,
        title: "Cloud Security Assessment",
        description: "Assess current cloud security posture, identify gaps against ISO 27017 requirements, and evaluate cloud service provider security.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Cloud Security Framework Design",
        description: "Design cloud security governance framework, establish roles and responsibilities, and define cloud security policies.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Cloud Controls Implementation",
        description: "Implement cloud-specific security controls, establish monitoring systems, and configure access management.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Data Protection and Compliance",
        description: "Implement data protection measures, ensure data residency compliance, and establish privacy controls for cloud data.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Incident Response and Monitoring",
        description: "Establish cloud incident response procedures, implement monitoring and logging, and conduct security testing.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Training and Documentation",
        description: "Conduct cloud security training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 7,
        title: "Certification Audit",
        description: "Support certification audit process, address findings, and achieve ISO 27017 certification.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Existing cloud infrastructure or cloud migration plans",
      "Management commitment to cloud security",
      "Dedicated cloud security team and resources",
      "Access to cloud environments and configurations",
      "Cooperation from IT, security, and business teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-8 months",
      "Documentation of current cloud security practices"
    ],
    deliverables: [
      "Complete cloud security documentation package",
      "Cloud security policies and procedures",
      "Cloud risk assessment and treatment plan",
      "Cloud monitoring and logging framework",
      "Incident response procedures for cloud",
      "Cloud vendor assessment framework",
      "Staff training materials and programs",
      "Internal audit program and reports",
      "Certification audit preparation package",
      "ISO 27017 certificate upon successful audit"
    ],
    pricing: {
      startingFrom: 180000,
      currency: "INR",
      includes: [
        "Complete ISO 27017 implementation support",
        "All cloud security documentation",
        "Cloud risk assessment and controls",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Cloud service provider fees",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Cloud security tools and software"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "Information Technology",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Government",
      "Education",
      "Manufacturing",
      "Telecommunications",
      "Consulting",
      "Media and Entertainment"
    ],
    compliance: [
      "ISO/IEC 27017:2015",
      "ISO/IEC 27018:2019",
      "CSA CCM",
      "SOC 2",
      "GDPR",
      "HIPAA",
      "PCI DSS"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 27017 and ISO 27001?",
        answer: "ISO 27017 provides additional cloud-specific security controls that extend ISO 27001 for cloud computing environments, addressing unique cloud security challenges."
      },
      {
        question: "Do we need ISO 27001 before implementing ISO 27017?",
        answer: "ISO 27017 extends ISO 27001, so you need either an existing ISO 27001 ISMS or implement both standards together for comprehensive cloud security."
      },
      {
        question: "Can ISO 27017 help with multi-cloud environments?",
        answer: "Yes, ISO 27017 provides guidance for securing multi-cloud environments and helps establish consistent security controls across different cloud providers."
      },
      {
        question: "How does ISO 27017 address shared responsibility?",
        answer: "ISO 27017 clearly defines security responsibilities between cloud service providers and customers, helping organizations understand their security obligations."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services Cloud Migration Security",
        description: "A financial services company achieved ISO 27017 certification while migrating critical systems to cloud, ensuring regulatory compliance and security.",
        industry: "Financial Services",
        results: [
          "Achieved ISO 27017 certification in 7 months",
          "Successfully migrated 80% of systems to cloud",
          "Maintained 100% regulatory compliance",
          "Reduced cloud security incidents by 90%"
        ]
      },
      {
        title: "Healthcare Cloud Security Implementation",
        description: "A healthcare provider implemented ISO 27017 controls to secure patient data in cloud environments while maintaining HIPAA compliance.",
        industry: "Healthcare",
        results: [
          "Achieved ISO 27017 certification",
          "Enhanced HIPAA compliance in cloud",
          "Improved data security by 75%",
          "Reduced compliance audit findings by 60%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 3
  }
];

async function addAdditionalGRCServices() {
  try {
    console.log('Adding additional GRC Services...');
    
    // Find or create a default user for createdBy field
    let defaultUser = await User.findOne({ role: 'admin' });
    if (!defaultUser) {
      defaultUser = await User.findOne();
    }
    
    if (!defaultUser) {
      console.log('No users found. Please create a user first.');
      return;
    }

    // Add createdBy and updatedBy to each service
    const servicesWithUsers = additionalGRCServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} additional GRC services`);

    console.log('Additional GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding additional GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addAdditionalGRCServices();
