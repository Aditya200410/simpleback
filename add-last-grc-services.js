const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const finalGRCServices = [
  {
    title: "HITRUST: Healthcare Information Trust Alliance Framework Consultation and Certification",
    slug: "hitrust-healthcare-information-trust-alliance-framework-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive HITRUST implementation and certification services for healthcare organizations to comply with HIPAA and other healthcare regulations through a certifiable framework.",
    detailedDescription: "Our HITRUST (Healthcare Information Trust Alliance) consultation and certification services help healthcare organizations implement comprehensive information security and privacy frameworks that ensure compliance with HIPAA, HITECH, and other healthcare regulations. HITRUST provides a certifiable framework specifically designed for healthcare organizations to manage information security and privacy risks. Our expert healthcare compliance consultants work with healthcare providers, health plans, healthcare technology companies, and business associates to implement HITRUST controls, establish security governance, and prepare for HITRUST certification. We guide you through the entire certification process, ensuring your organization meets HITRUST requirements while protecting healthcare information and demonstrating compliance to stakeholders and regulators.",
    icon: "🏥",
    features: [
      "HITRUST CSF implementation and certification",
      "Healthcare-specific security control implementation",
      "HIPAA and HITECH compliance integration",
      "Healthcare risk assessment and management",
      "Healthcare privacy and security governance",
      "Third-party risk management for healthcare",
      "Healthcare incident response and breach management",
      "Healthcare compliance monitoring and reporting",
      "HITRUST assessment preparation and support",
      "Ongoing HITRUST compliance maintenance"
    ],
    benefits: [
      {
        title: "Healthcare Industry Compliance",
        description: "Achieve comprehensive compliance with healthcare regulations including HIPAA, HITECH, and state healthcare privacy laws."
      },
      {
        title: "Certified Security Framework",
        description: "Implement a certifiable security framework specifically designed for healthcare organizations and their unique requirements."
      },
      {
        title: "Stakeholder Confidence",
        description: "Demonstrate commitment to healthcare information security to patients, partners, and regulatory bodies."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce healthcare information security risks through comprehensive security controls and risk management."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage in healthcare markets with certified security capabilities and compliance assurance."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline healthcare compliance operations through integrated security and privacy management framework."
      }
    ],
    process: [
      {
        step: 1,
        title: "HITRUST Assessment and Readiness Evaluation",
        description: "Evaluate current healthcare security practices against HITRUST CSF requirements, assess readiness, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "HITRUST CSF Implementation",
        description: "Implement HITRUST CSF controls, establish healthcare security governance, and define roles and responsibilities.",
        duration: "6-8 weeks"
      },
      {
        step: 3,
        title: "Healthcare-Specific Controls Implementation",
        description: "Implement healthcare-specific security controls, establish privacy measures, and create compliance procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Risk Assessment and Management",
        description: "Conduct comprehensive healthcare risk assessment, implement risk management procedures, and establish monitoring systems.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct HITRUST training programs, finalize compliance documentation, and prepare for HITRUST assessment.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "HITRUST Assessment and Certification",
        description: "Support HITRUST assessment process, address findings, and achieve HITRUST certification.",
        duration: "3-4 weeks"
      }
    ],
    requirements: [
      "Healthcare organization or healthcare business associate",
      "Management commitment to HITRUST implementation",
      "Dedicated healthcare compliance team and resources",
      "Access to healthcare systems and protected health information",
      "Cooperation from clinical, IT, and administrative teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 8-12 months",
      "Documentation of current healthcare security practices"
    ],
    deliverables: [
      "Complete HITRUST implementation documentation",
      "Healthcare security framework and procedures",
      "HITRUST CSF control implementation guide",
      "Healthcare risk assessment and management procedures",
      "Privacy and security governance documentation",
      "Staff training materials and programs",
      "HITRUST assessment preparation package",
      "Compliance monitoring and reporting framework",
      "HITRUST certificate upon successful assessment",
      "Ongoing HITRUST compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 250000,
      currency: "INR",
      includes: [
        "Complete HITRUST implementation support",
        "All healthcare compliance documentation",
        "HITRUST CSF control implementation",
        "Staff training and awareness programs",
        "HITRUST assessment preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "HITRUST assessment fees",
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
    duration: "8-12 months",
    industry: [
      "Healthcare Providers",
      "Health Plans",
      "Healthcare Technology",
      "Healthcare Software",
      "Healthcare Services",
      "Medical Devices",
      "Healthcare Analytics",
      "Healthcare Research",
      "Healthcare Consulting",
      "Healthcare Clearinghouses"
    ],
    compliance: [
      "HITRUST CSF",
      "HIPAA",
      "HITECH Act",
      "State Healthcare Privacy Laws",
      "ISO/IEC 27001:2022",
      "SOC 2",
      "PCI DSS"
    ],
    faqs: [
      {
        question: "What is the difference between HITRUST and HIPAA compliance?",
        answer: "HITRUST provides a comprehensive, certifiable framework that includes HIPAA requirements plus additional security controls specifically designed for healthcare organizations."
      },
      {
        question: "Do we need HITRUST certification if we already have HIPAA compliance?",
        answer: "HITRUST certification provides additional assurance and is often required by healthcare organizations and business partners for enhanced security."
      },
      {
        question: "How long does HITRUST certification take?",
        answer: "Complete HITRUST implementation and certification typically takes 8-12 months, depending on organization size and current healthcare security maturity."
      },
      {
        question: "Is HITRUST certification valid internationally?",
        answer: "HITRUST certification is primarily focused on US healthcare regulations but provides valuable security framework benefits globally."
      }
    ],
    caseStudies: [
      {
        title: "Healthcare System HITRUST Certification",
        description: "A major healthcare system achieved HITRUST certification, enhancing patient data protection and meeting industry security standards.",
        industry: "Healthcare Providers",
        results: [
          "Achieved HITRUST certification in 10 months",
          "Protected 100K+ patient records",
          "Enhanced healthcare security by 80%",
          "Met industry security requirements"
        ]
      },
      {
        title: "Healthcare Technology Company Security Implementation",
        description: "A healthcare technology company implemented HITRUST to serve healthcare clients while protecting sensitive healthcare data.",
        industry: "Healthcare Technology",
        results: [
          "Achieved HITRUST certification",
          "Served 200+ healthcare clients",
          "Protected healthcare data in cloud systems",
          "Reduced security incidents by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 12
  },
  {
    title: "DPDP Act: Digital Personal Data Protection Act Consultation and Compliance",
    slug: "dpdp-act-digital-personal-data-protection-act-consultation-compliance",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive DPDP Act implementation and compliance services to ensure compliance with Indian Digital Personal Data Protection Act and protect personal data of Indian citizens.",
    detailedDescription: "Our DPDP Act (Digital Personal Data Protection Act) consultation and compliance services help organizations implement comprehensive data protection measures to ensure compliance with Indian privacy laws and protect personal data of Indian citizens. This service covers the complete implementation of DPDP Act requirements, including data protection principles, data subject rights, consent management, data breach notification, and cross-border data transfer regulations. Our expert privacy consultants work with organizations operating in India or handling Indian personal data to establish privacy governance, implement data protection measures, and ensure ongoing DPDP Act compliance. We guide you through the entire compliance process, ensuring your organization meets DPDP Act requirements while protecting personal data and avoiding potential penalties.",
    icon: "🇮🇳",
    features: [
      "DPDP Act compliance framework implementation",
      "Data protection principles implementation",
      "Data subject rights management system",
      "Consent management and lawful basis",
      "Data processing activity mapping",
      "Cross-border data transfer compliance",
      "Data breach notification procedures",
      "Privacy governance and DPO support",
      "Third-party data processing agreements",
      "Ongoing compliance monitoring and reporting"
    ],
    benefits: [
      {
        title: "Indian Market Compliance",
        description: "Ensure compliance with Indian data protection laws, enabling business operations in Indian markets."
      },
      {
        title: "Legal Protection",
        description: "Reduce legal risks and potential penalties by demonstrating proactive DPDP Act compliance efforts."
      },
      {
        title: "Customer Trust",
        description: "Build stronger customer relationships by demonstrating commitment to data protection and privacy in India."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage in Indian markets with certified data protection capabilities."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce privacy risks and potential data breach consequences under Indian law."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline data processing operations through systematic privacy management approach for Indian operations."
      }
    ],
    process: [
      {
        step: 1,
        title: "DPDP Act Assessment and Data Mapping",
        description: "Assess current data processing activities against DPDP Act requirements, map personal data flows, and identify compliance gaps.",
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
        description: "Implement data protection principles, establish consent management, and create data subject rights procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Cross-Border Transfer and Documentation",
        description: "Implement cross-border data transfer compliance, create data processing documentation, and establish breach notification procedures.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Awareness",
        description: "Conduct DPDP Act training programs, establish privacy awareness campaigns, and ensure staff competency.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Compliance Validation and Ongoing Monitoring",
        description: "Validate DPDP Act compliance, establish ongoing monitoring systems, and prepare for regulatory audits.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization processing personal data of Indian citizens",
      "Management commitment to DPDP Act compliance",
      "Dedicated privacy team and resources",
      "Access to data processing systems and personal data",
      "Cooperation from legal, IT, and business teams",
      "Budget allocation for implementation and compliance",
      "Timeline commitment of 6-9 months",
      "Documentation of current data processing activities"
    ],
    deliverables: [
      "Complete DPDP Act compliance documentation",
      "Privacy governance framework and procedures",
      "Data protection principles implementation guide",
      "Data subject rights management procedures",
      "Cross-border data transfer compliance procedures",
      "Data breach notification procedures",
      "Staff training materials and programs",
      "Compliance monitoring and reporting framework",
      "DPDP Act compliance validation report",
      "Ongoing compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete DPDP Act implementation support",
        "All privacy documentation development",
        "Data protection principles implementation",
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
      "Education",
      "Government",
      "Telecommunications",
      "Manufacturing",
      "Consulting",
      "Marketing and Advertising"
    ],
    compliance: [
      "DPDP Act",
      "Indian Data Protection Law",
      "ISO/IEC 27701:2019",
      "GDPR",
      "CCPA",
      "PIPEDA",
      "LGPD"
    ],
    faqs: [
      {
        question: "Do we need DPDP Act compliance if we're not in India?",
        answer: "Yes, DPDP Act applies to any organization processing personal data of Indian citizens, regardless of where the organization is located."
      },
      {
        question: "What are the penalties for DPDP Act violations?",
        answer: "DPDP Act violations can result in penalties up to ₹250 crore (approximately $30 million), making compliance critical for business operations."
      },
      {
        question: "Do we need a Data Protection Officer (DPO) under DPDP Act?",
        answer: "DPO is required for significant data fiduciaries or organizations processing large amounts of personal data under DPDP Act."
      },
      {
        question: "How long does DPDP Act compliance take?",
        answer: "Complete DPDP Act implementation typically takes 6-9 months, depending on organization size, data processing complexity, and current privacy maturity."
      }
    ],
    caseStudies: [
      {
        title: "Indian Tech Company DPDP Act Compliance",
        description: "A major Indian technology company achieved DPDP Act compliance, protecting user data and meeting regulatory requirements.",
        industry: "Information Technology",
        results: [
          "Achieved DPDP Act compliance in 8 months",
          "Protected 1M+ user records",
          "Enhanced user trust by 60%",
          "Reduced privacy-related risks by 75%"
        ]
      },
      {
        title: "E-commerce Platform Indian Privacy Compliance",
        description: "An e-commerce platform implemented DPDP Act compliance to serve Indian customers while protecting their personal data.",
        industry: "E-commerce",
        results: [
          "Achieved DPDP Act compliance",
          "Served Indian customers securely",
          "Enhanced customer trust by 50%",
          "Reduced privacy complaints by 65%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 13
  },
  {
    title: "DORA Compliance: Digital Operational Resilience Act Consultation and Implementation",
    slug: "dora-compliance-digital-operational-resilience-act-consultation-implementation",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive DORA compliance implementation services for EU financial sector organizations to ensure digital operational resilience and cybersecurity compliance.",
    detailedDescription: "Our DORA (Digital Operational Resilience Act) compliance consultation and implementation services help EU financial sector organizations implement comprehensive digital operational resilience measures to ensure compliance with EU financial sector regulations. DORA establishes uniform requirements for financial entities to manage ICT risks and ensure operational resilience in the digital age. Our expert financial compliance consultants work with banks, insurance companies, investment firms, and other financial entities to implement DORA requirements, establish ICT risk management frameworks, and ensure ongoing compliance. We guide you through the entire implementation process, ensuring your organization meets DORA requirements while building robust digital operational resilience and cybersecurity capabilities.",
    icon: "🏦",
    features: [
      "DORA compliance framework implementation",
      "ICT risk management framework establishment",
      "Digital operational resilience measures",
      "Third-party ICT risk management",
      "Incident reporting and management",
      "Digital operational resilience testing",
      "Information and intelligence sharing",
      "Financial sector cybersecurity governance",
      "Regulatory reporting and compliance",
      "Ongoing DORA compliance monitoring"
    ],
    benefits: [
      {
        title: "EU Financial Sector Compliance",
        description: "Ensure compliance with EU financial sector regulations, enabling continued operations in European financial markets."
      },
      {
        title: "Digital Operational Resilience",
        description: "Build robust digital operational resilience to withstand cyber threats and ICT disruptions."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce ICT risks and potential operational disruptions through comprehensive risk management."
      },
      {
        title: "Regulatory Confidence",
        description: "Demonstrate commitment to financial sector security to regulators, customers, and stakeholders."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage in EU financial markets with certified operational resilience capabilities."
      },
      {
        title: "Operational Continuity",
        description: "Ensure business continuity through robust ICT risk management and incident response capabilities."
      }
    ],
    process: [
      {
        step: 1,
        title: "DORA Assessment and Gap Analysis",
        description: "Assess current ICT risk management practices against DORA requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "ICT Risk Management Framework Implementation",
        description: "Implement ICT risk management framework, establish governance structure, and define roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Digital Operational Resilience Measures",
        description: "Implement digital operational resilience measures, establish monitoring systems, and create incident response procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Third-Party Risk Management and Testing",
        description: "Implement third-party ICT risk management, establish resilience testing procedures, and create reporting systems.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct DORA training programs, finalize compliance documentation, and establish monitoring processes.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Compliance Validation and Ongoing Monitoring",
        description: "Validate DORA compliance, establish ongoing monitoring systems, and prepare for regulatory audits.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "EU financial sector organization (bank, insurance, investment firm, etc.)",
      "Management commitment to DORA compliance",
      "Dedicated ICT risk management team and resources",
      "Access to financial systems and ICT infrastructure",
      "Cooperation from IT, security, and business teams",
      "Budget allocation for implementation and compliance",
      "Timeline commitment of 8-12 months",
      "Documentation of current ICT risk management practices"
    ],
    deliverables: [
      "Complete DORA compliance documentation",
      "ICT risk management framework and procedures",
      "Digital operational resilience implementation guide",
      "Third-party ICT risk management procedures",
      "Incident reporting and management procedures",
      "Resilience testing and validation procedures",
      "Staff training materials and programs",
      "Compliance monitoring and reporting framework",
      "DORA compliance validation report",
      "Ongoing compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 220000,
      currency: "INR",
      includes: [
        "Complete DORA implementation support",
        "All financial compliance documentation",
        "ICT risk management framework implementation",
        "Staff training and awareness programs",
        "Compliance validation support",
        "12 months post-compliance support"
      ],
      excludes: [
        "Financial compliance software",
        "Third-party assessment costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "ICT infrastructure costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "8-12 months",
    industry: [
      "Banking",
      "Insurance",
      "Investment Management",
      "Financial Services",
      "Fintech",
      "Payment Services",
      "Financial Technology",
      "Financial Consulting",
      "Asset Management",
      "Financial Infrastructure"
    ],
    compliance: [
      "DORA",
      "EU Financial Sector Regulation",
      "ISO/IEC 27001:2022",
      "NIST Cybersecurity Framework",
      "PCI DSS",
      "GDPR",
      "SOX"
    ],
    faqs: [
      {
        question: "Who needs DORA compliance?",
        answer: "DORA applies to EU financial entities including banks, insurance companies, investment firms, payment institutions, and other financial sector organizations."
      },
      {
        question: "What are the penalties for DORA violations?",
        answer: "DORA violations can result in administrative penalties up to €5 million or 1% of annual turnover, whichever is higher."
      },
      {
        question: "Do we need DORA compliance if we're not in the EU?",
        answer: "DORA applies to EU financial entities and may also apply to non-EU entities providing financial services in the EU."
      },
      {
        question: "How long does DORA compliance take?",
        answer: "Complete DORA implementation typically takes 8-12 months, depending on organization size, ICT complexity, and current risk management maturity."
      }
    ],
    caseStudies: [
      {
        title: "EU Bank DORA Compliance Implementation",
        description: "A major EU bank achieved DORA compliance, enhancing digital operational resilience and meeting regulatory requirements.",
        industry: "Banking",
        results: [
          "Achieved DORA compliance in 10 months",
          "Enhanced digital operational resilience by 80%",
          "Reduced ICT incidents by 70%",
          "Met EU financial sector requirements"
        ]
      },
      {
        title: "Insurance Company Digital Resilience",
        description: "An EU insurance company implemented DORA compliance to ensure operational resilience and protect customer data.",
        industry: "Insurance",
        results: [
          "Achieved DORA compliance",
          "Enhanced operational resilience",
          "Protected customer data and systems",
          "Reduced operational risks by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 14
  }
];

async function addFinalGRCServices() {
  try {
    console.log('Adding final GRC Services...');
    
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
    const servicesWithUsers = finalGRCServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} final GRC services`);

    console.log('Final GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding final GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addFinalGRCServices();
