const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const remainingGRCServices = [
  {
    title: "PCI DSS: Payment Card Industry Data Security Standard Consultation and Compliance",
    slug: "pci-dss-payment-card-industry-data-security-standard-consultation-compliance",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive PCI DSS implementation and compliance services to secure payment card data and ensure compliance with Payment Card Industry Data Security Standard requirements.",
    detailedDescription: "Our PCI DSS (Payment Card Industry Data Security Standard) consultation and compliance services help organizations that handle credit card information implement comprehensive security measures to protect payment card data and ensure compliance with PCI DSS requirements. This service covers the complete implementation of PCI DSS controls, security assessment preparation, and ongoing compliance monitoring. Our expert consultants work with merchants, service providers, and payment processors to implement robust security controls, establish secure payment processing environments, and prepare for PCI DSS assessments. We guide you through the entire compliance process, ensuring your organization meets PCI DSS requirements while protecting sensitive payment card data and maintaining customer trust in your payment processing capabilities.",
    icon: "💳",
    features: [
      "PCI DSS control implementation and validation",
      "Payment card data protection measures",
      "Secure payment processing environment setup",
      "Network security and segmentation",
      "Access control and authentication systems",
      "Payment data encryption implementation",
      "Security monitoring and logging systems",
      "Incident response for payment security",
      "PCI DSS assessment preparation",
      "Ongoing compliance monitoring and reporting"
    ],
    benefits: [
      {
        title: "Payment Card Data Protection",
        description: "Implement comprehensive security controls to protect payment card data and prevent data breaches."
      },
      {
        title: "PCI DSS Compliance",
        description: "Achieve and maintain PCI DSS compliance, ensuring eligibility for payment card processing."
      },
      {
        title: "Customer Trust",
        description: "Build customer confidence in your payment processing security and data protection capabilities."
      },
      {
        title: "Risk Reduction",
        description: "Systematically reduce payment card security risks and potential financial losses from data breaches."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet payment card industry security requirements and avoid penalties for non-compliance."
      },
      {
        title: "Business Continuity",
        description: "Ensure business continuity through robust payment security and incident response capabilities."
      }
    ],
    process: [
      {
        step: 1,
        title: "PCI DSS Assessment and Gap Analysis",
        description: "Evaluate current payment security practices against PCI DSS requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Payment Security Framework Implementation",
        description: "Implement PCI DSS security controls, establish payment security governance, and define roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Payment Data Protection Implementation",
        description: "Implement payment card data protection measures, encryption systems, and secure payment processing controls.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Network Security and Access Control",
        description: "Implement network segmentation, access controls, and authentication systems for payment environments.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Monitoring and Incident Response",
        description: "Establish security monitoring, logging systems, and incident response procedures for payment security.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "PCI DSS Assessment and Compliance",
        description: "Prepare for PCI DSS assessment, support assessment process, and achieve PCI DSS compliance.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization handling payment card data",
      "Management commitment to payment security",
      "Dedicated payment security team and resources",
      "Access to payment processing systems and data",
      "Cooperation from IT, security, and business teams",
      "Budget allocation for implementation and compliance",
      "Timeline commitment of 6-8 months",
      "Documentation of current payment security practices"
    ],
    deliverables: [
      "Complete PCI DSS implementation documentation",
      "Payment security framework and procedures",
      "Payment data protection implementation guide",
      "Network security and access control procedures",
      "Security monitoring and incident response plans",
      "Staff training materials and programs",
      "PCI DSS assessment preparation package",
      "Compliance monitoring and reporting framework",
      "PCI DSS compliance validation report",
      "Ongoing compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete PCI DSS implementation support",
        "All payment security documentation",
        "Payment data protection implementation",
        "Staff training and awareness programs",
        "PCI DSS assessment preparation",
        "12 months post-compliance support"
      ],
      excludes: [
        "PCI DSS assessment fees",
        "Payment security tools and software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Hardware and infrastructure costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "E-commerce",
      "Retail",
      "Financial Services",
      "Hospitality",
      "Healthcare",
      "Education",
      "Government",
      "Telecommunications",
      "Manufacturing",
      "Consulting"
    ],
    compliance: [
      "PCI DSS",
      "PCI DSS Level 1-4",
      "PA-DSS",
      "P2PE",
      "GDPR",
      "SOX",
      "HIPAA"
    ],
    faqs: [
      {
        question: "What are the different PCI DSS compliance levels?",
        answer: "PCI DSS has four compliance levels based on transaction volume: Level 1 (highest volume) requires annual onsite assessment, while Levels 2-4 have different requirements."
      },
      {
        question: "Do we need PCI DSS compliance if we don't store card data?",
        answer: "Even if you don't store card data, you still need PCI DSS compliance if you process, transmit, or handle payment card information in any way."
      },
      {
        question: "How long does PCI DSS compliance take?",
        answer: "The complete PCI DSS implementation and compliance process typically takes 6-8 months, depending on organization size and current security maturity."
      },
      {
        question: "What happens if we fail PCI DSS assessment?",
        answer: "Failing PCI DSS assessment can result in fines, increased transaction fees, and potential loss of payment processing capabilities."
      }
    ],
    caseStudies: [
      {
        title: "E-commerce Platform PCI DSS Compliance",
        description: "A major e-commerce platform achieved PCI DSS Level 1 compliance, enabling secure payment processing for millions of transactions.",
        industry: "E-commerce",
        results: [
          "Achieved PCI DSS Level 1 compliance in 7 months",
          "Processed 2M+ secure transactions monthly",
          "Reduced payment security incidents by 90%",
          "Increased customer trust scores by 50%"
        ]
      },
      {
        title: "Retail Chain Payment Security Implementation",
        description: "A retail chain implemented PCI DSS compliance across all locations, securing customer payment data and meeting industry requirements.",
        industry: "Retail",
        results: [
          "Achieved PCI DSS compliance across 50+ locations",
          "Secured customer payment data",
          "Met retail industry security standards",
          "Reduced payment fraud by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 9
  },
  {
    title: "GDPR: General Data Protection Regulation Consultation and Compliance",
    slug: "gdpr-general-data-protection-regulation-consultation-compliance",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive GDPR implementation and compliance services to ensure compliance with EU General Data Protection Regulation and protect personal data of EU citizens.",
    detailedDescription: "Our GDPR (General Data Protection Regulation) consultation and compliance services help organizations implement comprehensive data protection measures to ensure compliance with EU privacy laws and protect personal data of EU citizens. This service covers the complete implementation of GDPR requirements, including data protection by design, privacy impact assessments, data subject rights management, and breach notification procedures. Our expert privacy consultants work with your organization to establish privacy governance, implement data protection measures, and ensure ongoing GDPR compliance. We guide you through the entire compliance process, ensuring your organization meets GDPR requirements while protecting personal data and avoiding potential fines and legal consequences.",
    icon: "🇪🇺",
    features: [
      "GDPR compliance framework implementation",
      "Data protection by design and by default",
      "Privacy impact assessment (PIA) implementation",
      "Data subject rights management system",
      "Data processing activity mapping",
      "Consent management and lawful basis",
      "Data breach notification procedures",
      "Privacy governance and DPO support",
      "Third-party data processing agreements",
      "Ongoing compliance monitoring and reporting"
    ],
    benefits: [
      {
        title: "EU Market Access",
        description: "Ensure compliance with EU data protection laws, enabling business operations in European markets."
      },
      {
        title: "Legal Protection",
        description: "Reduce legal risks and potential fines by demonstrating proactive GDPR compliance efforts."
      },
      {
        title: "Customer Trust",
        description: "Build stronger customer relationships by demonstrating commitment to data protection and privacy."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage in EU markets with certified data protection capabilities."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce privacy risks and potential data breach consequences."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline data processing operations through systematic privacy management approach."
      }
    ],
    process: [
      {
        step: 1,
        title: "GDPR Assessment and Data Mapping",
        description: "Assess current data processing activities, map personal data flows, and identify GDPR compliance gaps.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Privacy Governance Implementation",
        description: "Establish privacy governance framework, appoint DPO if required, and define privacy roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Data Protection Measures Implementation",
        description: "Implement data protection by design, establish consent management, and create data subject rights procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Privacy Impact Assessment and Documentation",
        description: "Conduct privacy impact assessments, create data processing documentation, and establish breach notification procedures.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Awareness",
        description: "Conduct GDPR training programs, establish privacy awareness campaigns, and ensure staff competency.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Compliance Validation and Ongoing Monitoring",
        description: "Validate GDPR compliance, establish ongoing monitoring systems, and prepare for regulatory audits.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization processing personal data of EU citizens",
      "Management commitment to GDPR compliance",
      "Dedicated privacy team and resources",
      "Access to data processing systems and personal data",
      "Cooperation from legal, IT, and business teams",
      "Budget allocation for implementation and compliance",
      "Timeline commitment of 6-9 months",
      "Documentation of current data processing activities"
    ],
    deliverables: [
      "Complete GDPR compliance documentation",
      "Privacy governance framework and procedures",
      "Data protection by design implementation guide",
      "Privacy impact assessment framework",
      "Data subject rights management procedures",
      "Data breach notification procedures",
      "Staff training materials and programs",
      "Compliance monitoring and reporting framework",
      "GDPR compliance validation report",
      "Ongoing compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 180000,
      currency: "INR",
      includes: [
        "Complete GDPR implementation support",
        "All privacy documentation development",
        "Privacy impact assessment framework",
        "Staff training and awareness programs",
        "Compliance validation support",
        "12 months post-compliance support"
      ],
      excludes: [
        "Legal consultation fees",
        "Privacy management software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Third-party assessment costs"
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
      "E-commerce",
      "Healthcare",
      "Financial Services",
      "Marketing and Advertising",
      "Education",
      "Government",
      "Telecommunications",
      "Manufacturing",
      "Consulting"
    ],
    compliance: [
      "GDPR",
      "EU Data Protection Law",
      "ISO/IEC 27701:2019",
      "CCPA",
      "PIPEDA",
      "LGPD",
      "PDPA"
    ],
    faqs: [
      {
        question: "Do we need GDPR compliance if we're not in the EU?",
        answer: "Yes, GDPR applies to any organization processing personal data of EU citizens, regardless of where the organization is located."
      },
      {
        question: "What is the maximum fine for GDPR violations?",
        answer: "GDPR fines can be up to €20 million or 4% of annual global turnover, whichever is higher, making compliance critical for business operations."
      },
      {
        question: "Do we need a Data Protection Officer (DPO)?",
        answer: "DPO is required if your organization processes large amounts of personal data or sensitive data, or if processing is a core business activity."
      },
      {
        question: "How long does GDPR compliance take?",
        answer: "Complete GDPR implementation typically takes 6-9 months, depending on organization size, data processing complexity, and current privacy maturity."
      }
    ],
    caseStudies: [
      {
        title: "Tech Startup GDPR Compliance Achievement",
        description: "A fast-growing tech startup achieved GDPR compliance, enabling European market expansion and protecting user data.",
        industry: "Information Technology",
        results: [
          "Achieved GDPR compliance in 8 months",
          "Successfully entered European markets",
          "Protected 100K+ user records",
          "Reduced privacy-related risks by 80%"
        ]
      },
      {
        title: "E-commerce Platform EU Privacy Compliance",
        description: "An e-commerce platform implemented GDPR compliance to serve EU customers while protecting their personal data.",
        industry: "E-commerce",
        results: [
          "Achieved GDPR compliance",
          "Served EU customers securely",
          "Enhanced customer trust by 60%",
          "Reduced privacy complaints by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 10
  },
  {
    title: "HIPAA: Health Insurance Portability and Accountability Act Consultation and Compliance",
    slug: "hipaa-health-insurance-portability-accountability-act-consultation-compliance",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive HIPAA implementation and compliance services to ensure compliance with US healthcare data privacy and security laws and protect patient health information.",
    detailedDescription: "Our HIPAA (Health Insurance Portability and Accountability Act) consultation and compliance services help healthcare organizations and their business associates implement comprehensive data protection measures to ensure compliance with US healthcare privacy and security laws. This service covers the complete implementation of HIPAA Privacy Rule, Security Rule, and Breach Notification Rule requirements, including administrative, physical, and technical safeguards. Our expert healthcare compliance consultants work with healthcare providers, health plans, healthcare clearinghouses, and business associates to establish HIPAA compliance programs, implement security controls, and ensure ongoing compliance. We guide you through the entire compliance process, ensuring your organization meets HIPAA requirements while protecting patient health information and avoiding potential penalties.",
    icon: "🏥",
    features: [
      "HIPAA Privacy Rule implementation",
      "HIPAA Security Rule implementation",
      "HIPAA Breach Notification Rule compliance",
      "Administrative safeguards implementation",
      "Physical safeguards implementation",
      "Technical safeguards implementation",
      "Business associate agreement management",
      "Patient rights management system",
      "Risk assessment and management",
      "Ongoing compliance monitoring and reporting"
    ],
    benefits: [
      {
        title: "Healthcare Industry Compliance",
        description: "Ensure compliance with US healthcare privacy and security laws, enabling legal healthcare operations."
      },
      {
        title: "Patient Trust",
        description: "Build patient confidence in your healthcare services through demonstrated commitment to privacy protection."
      },
      {
        title: "Legal Protection",
        description: "Reduce legal risks and potential penalties by demonstrating proactive HIPAA compliance efforts."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce healthcare data security risks and potential breach consequences."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline healthcare operations through systematic privacy and security management."
      },
      {
        title: "Business Continuity",
        description: "Ensure business continuity through robust healthcare data protection and incident response capabilities."
      }
    ],
    process: [
      {
        step: 1,
        title: "HIPAA Assessment and Gap Analysis",
        description: "Assess current healthcare data practices against HIPAA requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "HIPAA Governance Implementation",
        description: "Establish HIPAA compliance governance, appoint privacy and security officers, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "HIPAA Safeguards Implementation",
        description: "Implement administrative, physical, and technical safeguards, establish access controls, and create security procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Patient Rights and Business Associate Management",
        description: "Implement patient rights procedures, establish business associate agreements, and create breach notification procedures.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct HIPAA training programs, finalize compliance documentation, and establish monitoring processes.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Compliance Validation and Ongoing Monitoring",
        description: "Validate HIPAA compliance, establish ongoing monitoring systems, and prepare for regulatory audits.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Healthcare organization or business associate",
      "Management commitment to HIPAA compliance",
      "Dedicated healthcare compliance team and resources",
      "Access to healthcare systems and patient data",
      "Cooperation from clinical, IT, and administrative teams",
      "Budget allocation for implementation and compliance",
      "Timeline commitment of 6-8 months",
      "Documentation of current healthcare data practices"
    ],
    deliverables: [
      "Complete HIPAA compliance documentation",
      "Privacy and security governance framework",
      "HIPAA safeguards implementation guide",
      "Patient rights management procedures",
      "Business associate agreement templates",
      "Breach notification procedures",
      "Staff training materials and programs",
      "Compliance monitoring and reporting framework",
      "HIPAA compliance validation report",
      "Ongoing compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 170000,
      currency: "INR",
      includes: [
        "Complete HIPAA implementation support",
        "All healthcare compliance documentation",
        "Privacy and security safeguards implementation",
        "Staff training and awareness programs",
        "Compliance validation support",
        "12 months post-compliance support"
      ],
      excludes: [
        "Legal consultation fees",
        "Healthcare compliance software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Third-party assessment costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "Healthcare Providers",
      "Health Plans",
      "Healthcare Clearinghouses",
      "Healthcare Technology",
      "Healthcare Consulting",
      "Healthcare Software",
      "Healthcare Services",
      "Medical Devices",
      "Healthcare Analytics",
      "Healthcare Research"
    ],
    compliance: [
      "HIPAA Privacy Rule",
      "HIPAA Security Rule",
      "HIPAA Breach Notification Rule",
      "HITECH Act",
      "State Healthcare Privacy Laws",
      "ISO/IEC 27001:2022",
      "SOC 2"
    ],
    faqs: [
      {
        question: "Who needs HIPAA compliance?",
        answer: "HIPAA applies to healthcare providers, health plans, healthcare clearinghouses, and their business associates who handle protected health information (PHI)."
      },
      {
        question: "What are the penalties for HIPAA violations?",
        answer: "HIPAA violations can result in civil penalties up to $1.5 million per year and criminal penalties including fines and imprisonment."
      },
      {
        question: "Do we need HIPAA compliance if we're not a healthcare provider?",
        answer: "If you're a business associate handling PHI for covered entities, you also need HIPAA compliance through business associate agreements."
      },
      {
        question: "How long does HIPAA compliance take?",
        answer: "Complete HIPAA implementation typically takes 6-8 months, depending on organization size, healthcare data complexity, and current compliance maturity."
      }
    ],
    caseStudies: [
      {
        title: "Healthcare Provider HIPAA Compliance",
        description: "A multi-location healthcare provider achieved HIPAA compliance, protecting patient data across all facilities.",
        industry: "Healthcare Providers",
        results: [
          "Achieved HIPAA compliance across 10+ locations",
          "Protected 50K+ patient records",
          "Enhanced patient trust by 70%",
          "Reduced healthcare data incidents by 85%"
        ]
      },
      {
        title: "Healthcare Technology Company Compliance",
        description: "A healthcare technology company implemented HIPAA compliance to serve healthcare clients while protecting patient data.",
        industry: "Healthcare Technology",
        results: [
          "Achieved HIPAA compliance",
          "Served 100+ healthcare clients",
          "Protected patient data in cloud systems",
          "Reduced compliance audit findings by 90%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 11
  }
];

async function addRemainingGRCServices() {
  try {
    console.log('Adding remaining GRC Services...');
    
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
    const servicesWithUsers = remainingGRCServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} remaining GRC services`);

    console.log('Remaining GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding remaining GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addRemainingGRCServices();
