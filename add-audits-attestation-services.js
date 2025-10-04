const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const auditsAttestationServices = [
  {
    title: "IT General Controls Testing: Comprehensive IT Controls Audit Services",
    slug: "it-general-controls-testing-comprehensive-it-controls-audit-services",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive IT General Controls testing services to audit foundational IT controls including access management, change control, and system operations.",
    detailedDescription: "Our IT General Controls Testing services provide comprehensive auditing of foundational IT controls that are critical to the security and integrity of information systems. This service covers the complete evaluation of IT general controls including access management, change control, system operations, and data backup and recovery. Our expert IT audit consultants work with organizations to assess the effectiveness of IT controls, identify control weaknesses, and provide recommendations for improvement. We guide you through the entire audit process, ensuring comprehensive evaluation of your IT control environment while providing actionable insights for enhancing IT security and compliance.",
    icon: "🔒",
    features: [
      "IT General Controls comprehensive testing",
      "Access management controls audit",
      "Change control procedures evaluation",
      "System operations controls assessment",
      "Data backup and recovery testing",
      "IT security controls validation",
      "IT compliance assessment",
      "IT risk identification and analysis",
      "IT control improvement recommendations",
      "IT audit report development"
    ],
    benefits: [
      {
        title: "IT Control Assurance",
        description: "Ensure effectiveness of IT general controls through comprehensive testing and validation of control mechanisms."
      },
      {
        title: "Security Enhancement",
        description: "Identify and address IT security weaknesses through systematic control testing and improvement recommendations."
      },
      {
        title: "Compliance Validation",
        description: "Validate compliance with IT regulations and standards through comprehensive control assessment and testing."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce IT risks through identification of control weaknesses and implementation of improvements."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders through demonstrated IT control effectiveness and security assurance."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence in IT management through robust control frameworks and continuous improvement."
      }
    ],
    process: [
      {
        step: 1,
        title: "IT Controls Assessment Planning",
        description: "Plan IT controls testing scope, define testing criteria, and develop comprehensive testing methodology.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "IT Controls Documentation Review",
        description: "Review IT controls documentation, assess control design, and identify testing requirements.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "IT Controls Testing Execution",
        description: "Execute comprehensive IT controls testing, validate control effectiveness, and document test results.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "IT Controls Gap Analysis",
        description: "Analyze test results, identify control gaps, and assess control weaknesses and deficiencies.",
        duration: "1-2 weeks"
      },
      {
        step: 5,
        title: "IT Controls Improvement Recommendations",
        description: "Develop improvement recommendations, create remediation plans, and provide implementation guidance.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "IT Controls Audit Report",
        description: "Develop comprehensive audit report, present findings, and establish ongoing monitoring processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with IT systems and controls",
      "Management commitment to IT controls testing",
      "Access to IT systems and control documentation",
      "Cooperation from IT and security teams",
      "Budget allocation for testing and improvement",
      "Timeline commitment of 2-3 months",
      "Documentation of current IT controls and procedures"
    ],
    deliverables: [
      "Comprehensive IT controls testing report",
      "IT controls effectiveness assessment",
      "IT controls gap analysis and findings",
      "IT controls improvement recommendations",
      "IT controls remediation plan",
      "IT controls testing methodology documentation",
      "IT controls monitoring framework",
      "IT controls training materials",
      "IT controls audit report",
      "Ongoing IT controls monitoring plan"
    ],
    pricing: {
      startingFrom: 120000,
      currency: "INR",
      includes: [
        "Complete IT controls testing and assessment",
        "All IT controls documentation review",
        "IT controls testing execution",
        "IT controls improvement recommendations",
        "IT controls audit report development",
        "12 months post-testing support"
      ],
      excludes: [
        "IT controls testing tools and software",
        "Third-party IT assessment costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "IT controls improvement implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "2-3 months",
    industry: [
      "All Industries",
      "Financial Services",
      "Technology",
      "Healthcare",
      "Manufacturing",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "IT Control Standards",
      "Information Security Standards",
      "Regulatory Requirements",
      "Industry Standards",
      "Best Practices"
    ],
    faqs: [
      {
        question: "What are IT General Controls?",
        answer: "IT General Controls are foundational controls that apply to all IT systems, including access management, change control, system operations, and data backup and recovery."
      },
      {
        question: "How often should IT General Controls be tested?",
        answer: "IT General Controls should be tested annually or when significant changes occur in IT systems or control environment."
      },
      {
        question: "How long does IT General Controls testing take?",
        answer: "Complete IT General Controls testing typically takes 2-3 months, depending on organization size and IT complexity."
      },
      {
        question: "Is IT General Controls testing mandatory?",
        answer: "While not mandatory, IT General Controls testing is essential for IT security and may be required by regulations or business partners."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services IT Controls Testing",
        description: "A major financial services company conducted comprehensive IT General Controls testing, enhancing IT security and compliance.",
        industry: "Financial Services",
        results: [
          "Completed IT controls testing in 3 months",
          "Enhanced IT security by 70%",
          "Improved IT compliance by 80%",
          "Reduced IT risks by 65%"
        ]
      },
      {
        title: "Technology Company IT Controls Assessment",
        description: "A technology company conducted IT General Controls testing to ensure robust IT security and operational excellence.",
        industry: "Technology",
        results: [
          "Completed IT controls testing",
          "Enhanced IT security by 75%",
          "Improved IT operations by 60%",
          "Strengthened IT compliance by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 33
  },
  {
    title: "Business Process Control Testing: Comprehensive Business Controls Audit Services",
    slug: "business-process-control-testing-comprehensive-business-controls-audit-services",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive Business Process Control Testing services to audit controls within business processes ensuring accuracy, integrity, and compliance.",
    detailedDescription: "Our Business Process Control Testing services provide comprehensive auditing of controls within business processes to ensure accuracy, integrity, and compliance with organizational policies and regulatory requirements. This service covers the complete evaluation of business process controls including financial controls, operational controls, compliance controls, and risk management controls. Our expert business process audit consultants work with organizations to assess the effectiveness of business controls, identify control weaknesses, and provide recommendations for improvement. We guide you through the entire audit process, ensuring comprehensive evaluation of your business control environment while providing actionable insights for enhancing business process integrity and compliance.",
    icon: "📊",
    features: [
      "Business Process Controls comprehensive testing",
      "Financial controls audit and validation",
      "Operational controls assessment",
      "Compliance controls evaluation",
      "Risk management controls testing",
      "Business process integrity validation",
      "Control effectiveness assessment",
      "Business risk identification and analysis",
      "Business control improvement recommendations",
      "Business process audit report development"
    ],
    benefits: [
      {
        title: "Business Control Assurance",
        description: "Ensure effectiveness of business process controls through comprehensive testing and validation of control mechanisms."
      },
      {
        title: "Process Integrity",
        description: "Enhance business process integrity through systematic control testing and improvement recommendations."
      },
      {
        title: "Compliance Validation",
        description: "Validate compliance with business regulations and standards through comprehensive control assessment and testing."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce business risks through identification of control weaknesses and implementation of improvements."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence through robust business control frameworks and continuous improvement."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders through demonstrated business control effectiveness and process assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Business Controls Assessment Planning",
        description: "Plan business controls testing scope, define testing criteria, and develop comprehensive testing methodology.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Business Controls Documentation Review",
        description: "Review business controls documentation, assess control design, and identify testing requirements.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Business Controls Testing Execution",
        description: "Execute comprehensive business controls testing, validate control effectiveness, and document test results.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Business Controls Gap Analysis",
        description: "Analyze test results, identify control gaps, and assess control weaknesses and deficiencies.",
        duration: "1-2 weeks"
      },
      {
        step: 5,
        title: "Business Controls Improvement Recommendations",
        description: "Develop improvement recommendations, create remediation plans, and provide implementation guidance.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Business Controls Audit Report",
        description: "Develop comprehensive audit report, present findings, and establish ongoing monitoring processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with business processes and controls",
      "Management commitment to business controls testing",
      "Access to business process documentation",
      "Cooperation from business and operational teams",
      "Budget allocation for testing and improvement",
      "Timeline commitment of 2-3 months",
      "Documentation of current business controls and procedures"
    ],
    deliverables: [
      "Comprehensive business controls testing report",
      "Business controls effectiveness assessment",
      "Business controls gap analysis and findings",
      "Business controls improvement recommendations",
      "Business controls remediation plan",
      "Business controls testing methodology documentation",
      "Business controls monitoring framework",
      "Business controls training materials",
      "Business controls audit report",
      "Ongoing business controls monitoring plan"
    ],
    pricing: {
      startingFrom: 110000,
      currency: "INR",
      includes: [
        "Complete business controls testing and assessment",
        "All business controls documentation review",
        "Business controls testing execution",
        "Business controls improvement recommendations",
        "Business controls audit report development",
        "12 months post-testing support"
      ],
      excludes: [
        "Business controls testing tools and software",
        "Third-party business assessment costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "Business controls improvement implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "2-3 months",
    industry: [
      "All Industries",
      "Financial Services",
      "Manufacturing",
      "Healthcare",
      "Technology",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "Business Control Standards",
      "Regulatory Requirements",
      "Industry Standards",
      "Best Practices",
      "Compliance Standards"
    ],
    faqs: [
      {
        question: "What are Business Process Controls?",
        answer: "Business Process Controls are controls within business processes that ensure accuracy, integrity, and compliance with organizational policies and regulatory requirements."
      },
      {
        question: "How often should Business Process Controls be tested?",
        answer: "Business Process Controls should be tested annually or when significant changes occur in business processes or control environment."
      },
      {
        question: "How long does Business Process Control testing take?",
        answer: "Complete Business Process Control testing typically takes 2-3 months, depending on organization size and business complexity."
      },
      {
        question: "Is Business Process Control testing mandatory?",
        answer: "While not mandatory, Business Process Control testing is essential for business integrity and may be required by regulations or business partners."
      }
    ],
    caseStudies: [
      {
        title: "Manufacturing Company Business Controls Testing",
        description: "A major manufacturing company conducted comprehensive Business Process Control testing, enhancing business integrity and compliance.",
        industry: "Manufacturing",
        results: [
          "Completed business controls testing in 3 months",
          "Enhanced business integrity by 75%",
          "Improved business compliance by 80%",
          "Reduced business risks by 70%"
        ]
      },
      {
        title: "Healthcare Company Process Controls Assessment",
        description: "A healthcare company conducted Business Process Control testing to ensure robust business controls and operational excellence.",
        industry: "Healthcare",
        results: [
          "Completed business controls testing",
          "Enhanced business controls by 70%",
          "Improved business operations by 65%",
          "Strengthened business compliance by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 34
  }
];

async function addAuditsAttestationServices() {
  try {
    console.log('Adding Audits and Attestation GRC Services...');
    
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
    const servicesWithUsers = auditsAttestationServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Audits and Attestation GRC services`);

    console.log('Audits and Attestation GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Audits and Attestation GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addAuditsAttestationServices();
