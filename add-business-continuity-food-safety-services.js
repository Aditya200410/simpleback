const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const businessContinuityFoodSafetyServices = [
  {
    title: "ISO 22301: Business Continuity Management Systems Consultation and Certification",
    slug: "iso-22301-business-continuity-management-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 22301 Business Continuity Management Systems implementation and certification services to ensure organizational resilience and continuity of operations during disruptions.",
    detailedDescription: "Our ISO 22301 Business Continuity Management Systems (BCMS) consultation and certification services help organizations implement comprehensive business continuity frameworks to ensure resilience and continuity of operations during disruptions. This service covers the complete implementation of business continuity management systems, including risk assessment, business impact analysis, continuity planning, and incident response. Our expert business continuity consultants work with organizations to establish robust BCMS frameworks, implement continuity strategies, and prepare for ISO 22301 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 22301 requirements while building resilience capabilities that protect against operational disruptions and ensure business continuity.",
    icon: "🔄",
    features: [
      "Business Continuity Management System implementation",
      "Business impact analysis and risk assessment",
      "Business continuity planning and strategy development",
      "Incident response and crisis management",
      "Recovery and restoration procedures",
      "Business continuity testing and validation",
      "Stakeholder communication and management",
      "Business continuity governance and oversight",
      "Continuous improvement and monitoring",
      "ISO 22301 certification preparation"
    ],
    benefits: [
      {
        title: "Organizational Resilience",
        description: "Build comprehensive organizational resilience to withstand and recover from operational disruptions and crises."
      },
      {
        title: "Business Continuity Assurance",
        description: "Ensure continuity of critical business operations during disruptions through systematic planning and preparation."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically identify, assess, and mitigate risks that could disrupt business operations and continuity."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders by demonstrating commitment to business continuity and operational resilience."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet regulatory requirements for business continuity and operational resilience in various industries."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified business continuity capabilities and resilience assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Business Continuity Assessment and Analysis",
        description: "Conduct business impact analysis, assess current continuity capabilities, and identify critical business functions and dependencies.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "BCMS Framework Design and Implementation",
        description: "Design business continuity management system, establish governance structure, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Business Continuity Planning",
        description: "Develop business continuity plans, establish recovery procedures, and create incident response frameworks.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Testing and Validation",
        description: "Conduct business continuity testing, validate recovery procedures, and establish monitoring and improvement processes.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct business continuity training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 22301 certification audit, address findings, and establish continuous improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization requiring business continuity assurance",
      "Management commitment to business continuity",
      "Dedicated business continuity team and resources",
      "Access to business processes and systems",
      "Cooperation from all business units and stakeholders",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current business operations and dependencies"
    ],
    deliverables: [
      "Complete ISO 22301 implementation documentation",
      "Business continuity management system framework",
      "Business impact analysis and risk assessment reports",
      "Business continuity plans and procedures",
      "Incident response and crisis management procedures",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 22301 certificate upon successful audit",
      "Continuous improvement framework and plan"
    ],
    pricing: {
      startingFrom: 200000,
      currency: "INR",
      includes: [
        "Complete ISO 22301 implementation support",
        "All business continuity documentation development",
        "Business impact analysis and planning",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Business continuity software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Recovery site and infrastructure costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Financial Services",
      "Healthcare",
      "Manufacturing",
      "Technology",
      "Government",
      "Education",
      "Energy",
      "Telecommunications",
      "Transportation",
      "Consulting"
    ],
    compliance: [
      "ISO 22301:2019",
      "ISO/IEC 27001:2022",
      "SOX",
      "Basel III",
      "Industry-specific continuity requirements"
    ],
    faqs: [
      {
        question: "What is the difference between business continuity and disaster recovery?",
        answer: "Business continuity focuses on maintaining operations during disruptions, while disaster recovery focuses on restoring operations after a disaster. ISO 22301 covers both aspects comprehensively."
      },
      {
        question: "Do we need ISO 22301 if we already have disaster recovery plans?",
        answer: "ISO 22301 provides a comprehensive framework that includes disaster recovery but also covers broader business continuity aspects like crisis management and stakeholder communication."
      },
      {
        question: "How long does ISO 22301 certification take?",
        answer: "Complete ISO 22301 implementation and certification typically takes 6-9 months, depending on organization size, complexity, and current continuity maturity."
      },
      {
        question: "Is ISO 22301 certification mandatory?",
        answer: "While not mandatory, ISO 22301 certification demonstrates commitment to business continuity and may be required by customers, partners, or regulators."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services Business Continuity Implementation",
        description: "A major financial services company achieved ISO 22301 certification, ensuring operational resilience and regulatory compliance.",
        industry: "Financial Services",
        results: [
          "Achieved ISO 22301 certification in 8 months",
          "Enhanced operational resilience by 80%",
          "Reduced business disruption risks by 70%",
          "Met regulatory requirements for business continuity"
        ]
      },
      {
        title: "Manufacturing Company Continuity Excellence",
        description: "A manufacturing company implemented ISO 22301 to ensure production continuity and supply chain resilience.",
        industry: "Manufacturing",
        results: [
          "Achieved ISO 22301 certification",
          "Enhanced production continuity by 75%",
          "Improved supply chain resilience by 60%",
          "Reduced operational disruption risks by 65%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 19
  },
  {
    title: "ISO 22000: Food Safety Management Systems Consultation and Certification",
    slug: "iso-22000-food-safety-management-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 22000 Food Safety Management Systems implementation and certification services to ensure food safety throughout the food chain and protect consumer health.",
    detailedDescription: "Our ISO 22000 Food Safety Management Systems (FSMS) consultation and certification services help organizations in the food industry implement comprehensive food safety frameworks to ensure food safety throughout the food chain. This service covers the complete implementation of food safety management systems, including hazard analysis, prerequisite programs, HACCP principles, and food safety communication. Our expert food safety consultants work with food manufacturers, processors, distributors, retailers, and food service organizations to establish robust FSMS frameworks, implement food safety controls, and prepare for ISO 22000 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 22000 requirements while protecting consumer health and ensuring food safety compliance.",
    icon: "🍽️",
    features: [
      "Food Safety Management System implementation",
      "Hazard analysis and critical control points (HACCP)",
      "Prerequisite programs (PRPs) implementation",
      "Food safety communication and training",
      "Food safety emergency preparedness and response",
      "Food safety monitoring and measurement",
      "Food safety verification and validation",
      "Food safety governance and management review",
      "Continuous improvement and corrective actions",
      "ISO 22000 certification preparation"
    ],
    benefits: [
      {
        title: "Food Safety Assurance",
        description: "Implement comprehensive food safety management systems to ensure food safety throughout the food chain and protect consumer health."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet food safety regulatory requirements and industry standards through systematic food safety management."
      },
      {
        title: "Consumer Protection",
        description: "Protect consumer health and safety through robust food safety controls and hazard management."
      },
      {
        title: "Brand Protection",
        description: "Protect brand reputation and reduce food safety incidents through comprehensive risk management."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence in food safety management through systematic processes and continuous improvement."
      },
      {
        title: "Market Access",
        description: "Gain access to markets requiring food safety certification and meet customer requirements for food safety assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Food Safety Assessment and Hazard Analysis",
        description: "Conduct food safety assessment, analyze hazards, identify critical control points, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "FSMS Framework Design and Implementation",
        description: "Design food safety management system, establish governance structure, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "HACCP and Prerequisite Programs Implementation",
        description: "Implement HACCP principles, establish prerequisite programs, and create food safety control procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Food Safety Monitoring and Verification",
        description: "Establish food safety monitoring systems, implement verification procedures, and create emergency response plans.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct food safety training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 22000 certification audit, address findings, and establish continuous improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization in the food industry (manufacturer, processor, distributor, retailer, food service)",
      "Management commitment to food safety",
      "Dedicated food safety team and resources",
      "Access to food production and handling processes",
      "Cooperation from production, quality, and management teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-8 months",
      "Documentation of current food safety practices"
    ],
    deliverables: [
      "Complete ISO 22000 implementation documentation",
      "Food safety management system framework",
      "HACCP plan and critical control point procedures",
      "Prerequisite programs implementation guide",
      "Food safety monitoring and verification procedures",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 22000 certificate upon successful audit",
      "Continuous improvement framework and plan"
    ],
    pricing: {
      startingFrom: 180000,
      currency: "INR",
      includes: [
        "Complete ISO 22000 implementation support",
        "All food safety documentation development",
        "HACCP plan development and implementation",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Food safety testing and laboratory costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Food safety equipment and infrastructure"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "Food Manufacturing",
      "Food Processing",
      "Food Distribution",
      "Food Retail",
      "Food Service",
      "Beverage Production",
      "Agricultural Processing",
      "Food Packaging",
      "Food Ingredients",
      "Food Technology"
    ],
    compliance: [
      "ISO 22000:2018",
      "HACCP",
      "FSSC 22000",
      "BRC Global Standards",
      "SQF",
      "IFS",
      "Food Safety Regulations"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 22000 and HACCP?",
        answer: "ISO 22000 is a comprehensive food safety management system standard that includes HACCP principles, while HACCP focuses specifically on hazard analysis and critical control points."
      },
      {
        question: "Do we need ISO 22000 if we already have HACCP?",
        answer: "ISO 22000 provides a broader management system framework that includes HACCP but also covers management commitment, communication, and continuous improvement."
      },
      {
        question: "How long does ISO 22000 certification take?",
        answer: "Complete ISO 22000 implementation and certification typically takes 6-8 months, depending on organization size, food safety complexity, and current management maturity."
      },
      {
        question: "Is ISO 22000 certification mandatory?",
        answer: "While not mandatory, ISO 22000 certification demonstrates commitment to food safety and may be required by customers, retailers, or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Food Manufacturing Company Safety Excellence",
        description: "A major food manufacturing company achieved ISO 22000 certification, enhancing food safety and meeting customer requirements.",
        industry: "Food Manufacturing",
        results: [
          "Achieved ISO 22000 certification in 7 months",
          "Enhanced food safety by 85%",
          "Reduced food safety incidents by 90%",
          "Met major retailer food safety requirements"
        ]
      },
      {
        title: "Food Service Chain Safety Implementation",
        description: "A food service chain implemented ISO 22000 to ensure food safety across all locations and protect customer health.",
        industry: "Food Service",
        results: [
          "Achieved ISO 22000 certification",
          "Ensured food safety across 50+ locations",
          "Enhanced customer trust by 70%",
          "Reduced food safety complaints by 80%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 20
  },
  {
    title: "HACCP: Hazard Analysis and Critical Control Points Consultation and Implementation",
    slug: "haccp-hazard-analysis-critical-control-points-consultation-implementation",
    category: "Consultation and Certification services",
    shortDescription: "Specialized HACCP implementation services to identify, evaluate, and control food safety hazards through systematic hazard analysis and critical control point management.",
    detailedDescription: "Our HACCP (Hazard Analysis and Critical Control Points) consultation and implementation services help food industry organizations implement systematic approaches to food safety through hazard analysis and critical control point management. HACCP is a preventive food safety system that identifies, evaluates, and controls hazards that could cause food safety problems. Our expert HACCP consultants work with food manufacturers, processors, distributors, and food service organizations to develop and implement HACCP plans, establish critical control points, and ensure effective food safety management. We guide you through the entire HACCP implementation process, ensuring your organization meets HACCP requirements while protecting consumer health and ensuring food safety compliance.",
    icon: "🔍",
    features: [
      "HACCP plan development and implementation",
      "Hazard analysis and identification",
      "Critical control point (CCP) determination",
      "Critical limit establishment and monitoring",
      "Corrective action procedures",
      "Verification and validation procedures",
      "HACCP team training and development",
      "HACCP documentation and record keeping",
      "HACCP system maintenance and review",
      "HACCP certification preparation"
    ],
    benefits: [
      {
        title: "Systematic Food Safety Management",
        description: "Implement systematic approach to food safety through hazard analysis and critical control point management."
      },
      {
        title: "Hazard Prevention",
        description: "Prevent food safety hazards through proactive identification and control measures rather than reactive testing."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet food safety regulatory requirements and industry standards through HACCP implementation."
      },
      {
        title: "Consumer Protection",
        description: "Protect consumer health and safety through systematic hazard control and food safety management."
      },
      {
        title: "Cost Reduction",
        description: "Reduce costs associated with food safety incidents, recalls, and regulatory non-compliance."
      },
      {
        title: "Market Access",
        description: "Gain access to markets requiring HACCP certification and meet customer requirements for food safety assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "HACCP Team Formation and Prerequisites",
        description: "Form HACCP team, establish prerequisite programs, and conduct initial food safety assessment.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Hazard Analysis and Identification",
        description: "Conduct comprehensive hazard analysis, identify potential hazards, and assess their significance.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Critical Control Point Determination",
        description: "Determine critical control points, establish critical limits, and create monitoring procedures.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "HACCP Plan Development",
        description: "Develop comprehensive HACCP plan, establish corrective actions, and create verification procedures.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Implementation and Training",
        description: "Implement HACCP plan, conduct team training, and establish monitoring and record-keeping systems.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Validation and Continuous Improvement",
        description: "Validate HACCP system effectiveness, establish review procedures, and ensure continuous improvement.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization in the food industry",
      "Management commitment to HACCP implementation",
      "Dedicated HACCP team and resources",
      "Access to food production and handling processes",
      "Cooperation from production, quality, and management teams",
      "Budget allocation for implementation and maintenance",
      "Timeline commitment of 4-6 months",
      "Documentation of current food safety practices"
    ],
    deliverables: [
      "Complete HACCP implementation documentation",
      "HACCP plan and procedures",
      "Hazard analysis and critical control point documentation",
      "Monitoring and verification procedures",
      "Corrective action procedures",
      "Staff training materials and programs",
      "HACCP system validation report",
      "Continuous improvement framework",
      "HACCP certification preparation package",
      "Ongoing HACCP maintenance plan"
    ],
    pricing: {
      startingFrom: 120000,
      currency: "INR",
      includes: [
        "Complete HACCP implementation support",
        "All HACCP documentation development",
        "HACCP team training and development",
        "Hazard analysis and CCP determination",
        "HACCP system validation",
        "12 months post-implementation support"
      ],
      excludes: [
        "HACCP certification fees",
        "Food safety testing and laboratory costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Food safety equipment and infrastructure"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "4-6 months",
    industry: [
      "Food Manufacturing",
      "Food Processing",
      "Food Distribution",
      "Food Service",
      "Beverage Production",
      "Agricultural Processing",
      "Food Packaging",
      "Food Ingredients",
      "Seafood Processing",
      "Dairy Processing"
    ],
    compliance: [
      "HACCP",
      "ISO 22000:2018",
      "FSSC 22000",
      "BRC Global Standards",
      "SQF",
      "Food Safety Regulations"
    ],
    faqs: [
      {
        question: "What are the seven principles of HACCP?",
        answer: "The seven HACCP principles are: 1) Conduct hazard analysis, 2) Determine critical control points, 3) Establish critical limits, 4) Establish monitoring procedures, 5) Establish corrective actions, 6) Establish verification procedures, 7) Establish record-keeping procedures."
      },
      {
        question: "Is HACCP mandatory for all food businesses?",
        answer: "HACCP is mandatory for certain food businesses (like meat and poultry processors) and highly recommended for all food businesses to ensure food safety."
      },
      {
        question: "How long does HACCP implementation take?",
        answer: "Complete HACCP implementation typically takes 4-6 months, depending on organization size, food safety complexity, and current practices."
      },
      {
        question: "Do we need HACCP if we already have good manufacturing practices?",
        answer: "HACCP complements GMPs by providing systematic hazard analysis and control, making it essential for comprehensive food safety management."
      }
    ],
    caseStudies: [
      {
        title: "Seafood Processing HACCP Implementation",
        description: "A seafood processing company implemented HACCP to ensure food safety and meet export requirements.",
        industry: "Seafood Processing",
        results: [
          "Implemented HACCP in 5 months",
          "Enhanced food safety by 90%",
          "Met international export requirements",
          "Reduced food safety incidents by 95%"
        ]
      },
      {
        title: "Dairy Processing Safety Excellence",
        description: "A dairy processing company implemented HACCP to ensure milk and dairy product safety.",
        industry: "Dairy Processing",
        results: [
          "Achieved HACCP implementation",
          "Enhanced dairy product safety by 85%",
          "Met regulatory requirements",
          "Improved customer confidence by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 21
  }
];

async function addBusinessContinuityFoodSafetyServices() {
  try {
    console.log('Adding Business Continuity and Food Safety GRC Services...');
    
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
    const servicesWithUsers = businessContinuityFoodSafetyServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Business Continuity and Food Safety GRC services`);

    console.log('Business Continuity and Food Safety GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Business Continuity and Food Safety GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addBusinessContinuityFoodSafetyServices();
