const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const qualityEnvironmentalOHSServices = [
  {
    title: "ISO 9001: Quality Management Systems Consultation and Certification",
    slug: "iso-9001-quality-management-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 9001 Quality Management Systems implementation and certification services to establish world-class quality management and ensure customer satisfaction.",
    detailedDescription: "Our ISO 9001 Quality Management Systems (QMS) consultation and certification services help organizations implement comprehensive quality management frameworks to ensure consistent product and service quality, customer satisfaction, and continuous improvement. This service covers the complete implementation of quality management systems, including quality planning, process management, customer focus, and continuous improvement. Our expert quality consultants work with organizations across all industries to establish robust QMS frameworks, implement quality controls, and prepare for ISO 9001 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 9001 requirements while achieving operational excellence and customer satisfaction.",
    icon: "⭐",
    features: [
      "Quality Management System implementation",
      "Quality planning and objective setting",
      "Process management and control",
      "Customer focus and satisfaction",
      "Quality assurance and control",
      "Continuous improvement processes",
      "Management review and oversight",
      "Quality documentation and records",
      "Internal audit and corrective actions",
      "ISO 9001 certification preparation"
    ],
    benefits: [
      {
        title: "Enhanced Quality Performance",
        description: "Implement systematic approach to quality management, resulting in improved product and service quality and customer satisfaction."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence through standardized processes, continuous improvement, and systematic quality management."
      },
      {
        title: "Customer Satisfaction",
        description: "Enhance customer satisfaction through consistent quality delivery, customer focus, and continuous improvement."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified quality management capabilities and customer confidence."
      },
      {
        title: "Cost Reduction",
        description: "Reduce costs through improved efficiency, reduced defects, and systematic process management."
      },
      {
        title: "Market Access",
        description: "Gain access to markets requiring quality certification and meet customer requirements for quality assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Quality Assessment and Gap Analysis",
        description: "Assess current quality practices against ISO 9001 requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "QMS Framework Design and Implementation",
        description: "Design quality management system framework, establish quality governance, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Quality Process Implementation",
        description: "Implement quality processes, establish quality controls, and create customer satisfaction measurement systems.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Quality Assurance and Control",
        description: "Establish quality assurance procedures, implement quality control measures, and create continuous improvement processes.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct quality management training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 9001 certification audit, address findings, and establish continuous improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization committed to quality excellence",
      "Management commitment to quality management",
      "Dedicated quality team and resources",
      "Access to organizational processes and systems",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current quality practices"
    ],
    deliverables: [
      "Complete ISO 9001 implementation documentation",
      "Quality management system framework",
      "Quality process implementation guide",
      "Quality assurance and control procedures",
      "Customer satisfaction measurement systems",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 9001 certificate upon successful audit",
      "Continuous improvement framework and plan"
    ],
    pricing: {
      startingFrom: 150000,
      currency: "INR",
      includes: [
        "Complete ISO 9001 implementation support",
        "All quality management documentation",
        "Quality process implementation",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Quality management software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Quality testing and measurement equipment"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Manufacturing",
      "Services",
      "Technology",
      "Healthcare",
      "Education",
      "Government",
      "Financial Services",
      "Construction",
      "Transportation",
      "Consulting"
    ],
    compliance: [
      "ISO 9001:2015",
      "Quality Management Standards",
      "Customer Requirements",
      "Industry Standards",
      "Regulatory Requirements"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 9001 and other quality standards?",
        answer: "ISO 9001 is a comprehensive quality management system standard that focuses on customer satisfaction, continuous improvement, and process management across all organizational functions."
      },
      {
        question: "Do we need ISO 9001 if we already have good quality practices?",
        answer: "ISO 9001 provides a systematic framework that formalizes and enhances existing quality practices, ensuring consistency and continuous improvement."
      },
      {
        question: "How long does ISO 9001 certification take?",
        answer: "Complete ISO 9001 implementation and certification typically takes 6-9 months, depending on organization size, complexity, and current quality maturity."
      },
      {
        question: "Is ISO 9001 certification mandatory?",
        answer: "While not mandatory, ISO 9001 certification demonstrates commitment to quality and may be required by customers, partners, or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Manufacturing Company Quality Excellence",
        description: "A major manufacturing company achieved ISO 9001 certification, enhancing product quality and customer satisfaction.",
        industry: "Manufacturing",
        results: [
          "Achieved ISO 9001 certification in 8 months",
          "Enhanced product quality by 75%",
          "Improved customer satisfaction by 60%",
          "Reduced quality-related costs by 40%"
        ]
      },
      {
        title: "Service Company Quality Implementation",
        description: "A service company implemented ISO 9001 to ensure consistent service delivery and customer satisfaction.",
        industry: "Services",
        results: [
          "Achieved ISO 9001 certification",
          "Enhanced service quality by 70%",
          "Improved customer satisfaction by 55%",
          "Reduced service delivery issues by 65%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 25
  },
  {
    title: "ISO 14001: Environmental Management Systems Consultation and Certification",
    slug: "iso-14001-environmental-management-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 14001 Environmental Management Systems implementation and certification services to ensure environmental responsibility and sustainability compliance.",
    detailedDescription: "Our ISO 14001 Environmental Management Systems (EMS) consultation and certification services help organizations implement comprehensive environmental management frameworks to ensure environmental responsibility, compliance with environmental regulations, and sustainable business practices. This service covers the complete implementation of environmental management systems, including environmental policy, environmental aspects identification, legal compliance, and continuous environmental improvement. Our expert environmental consultants work with organizations across all industries to establish robust EMS frameworks, implement environmental controls, and prepare for ISO 14001 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 14001 requirements while achieving environmental excellence and sustainability goals.",
    icon: "🌱",
    features: [
      "Environmental Management System implementation",
      "Environmental policy and objectives",
      "Environmental aspects and impacts assessment",
      "Legal compliance and regulatory requirements",
      "Environmental monitoring and measurement",
      "Environmental emergency preparedness",
      "Environmental training and awareness",
      "Environmental management review",
      "Continuous environmental improvement",
      "ISO 14001 certification preparation"
    ],
    benefits: [
      {
        title: "Environmental Responsibility",
        description: "Demonstrate commitment to environmental responsibility and sustainable business practices through systematic environmental management."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with environmental regulations and legal requirements through comprehensive environmental management systems."
      },
      {
        title: "Cost Reduction",
        description: "Reduce environmental costs through improved resource efficiency, waste reduction, and environmental risk management."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders by demonstrating commitment to environmental protection and sustainability."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified environmental management capabilities and sustainability credentials."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce environmental risks and potential environmental incidents through comprehensive risk management."
      }
    ],
    process: [
      {
        step: 1,
        title: "Environmental Assessment and Impact Analysis",
        description: "Assess current environmental practices, identify environmental aspects and impacts, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "EMS Framework Design and Implementation",
        description: "Design environmental management system framework, establish environmental governance, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Environmental Controls Implementation",
        description: "Implement environmental controls, establish monitoring systems, and create environmental emergency procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Legal Compliance and Monitoring",
        description: "Establish legal compliance procedures, implement environmental monitoring, and create continuous improvement processes.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct environmental management training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 14001 certification audit, address findings, and establish continuous environmental improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization committed to environmental responsibility",
      "Management commitment to environmental management",
      "Dedicated environmental team and resources",
      "Access to environmental data and processes",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current environmental practices"
    ],
    deliverables: [
      "Complete ISO 14001 implementation documentation",
      "Environmental management system framework",
      "Environmental aspects and impacts assessment",
      "Environmental controls and procedures",
      "Legal compliance and monitoring procedures",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 14001 certificate upon successful audit",
      "Continuous environmental improvement plan"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete ISO 14001 implementation support",
        "All environmental management documentation",
        "Environmental aspects and impacts assessment",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Environmental monitoring equipment",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Environmental testing and analysis costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Manufacturing",
      "Energy",
      "Construction",
      "Transportation",
      "Agriculture",
      "Mining",
      "Chemical",
      "Technology",
      "Healthcare",
      "Government"
    ],
    compliance: [
      "ISO 14001:2015",
      "Environmental Regulations",
      "Environmental Laws",
      "Sustainability Standards",
      "ESG Requirements"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 14001 and other environmental standards?",
        answer: "ISO 14001 is a comprehensive environmental management system standard that focuses on systematic environmental management, legal compliance, and continuous environmental improvement."
      },
      {
        question: "Do we need ISO 14001 if we already have environmental practices?",
        answer: "ISO 14001 provides a systematic framework that formalizes and enhances existing environmental practices, ensuring consistency and continuous improvement."
      },
      {
        question: "How long does ISO 14001 certification take?",
        answer: "Complete ISO 14001 implementation and certification typically takes 6-9 months, depending on organization size, environmental complexity, and current environmental maturity."
      },
      {
        question: "Is ISO 14001 certification mandatory?",
        answer: "While not mandatory, ISO 14001 certification demonstrates commitment to environmental responsibility and may be required by customers, partners, or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Manufacturing Company Environmental Excellence",
        description: "A major manufacturing company achieved ISO 14001 certification, enhancing environmental performance and sustainability.",
        industry: "Manufacturing",
        results: [
          "Achieved ISO 14001 certification in 8 months",
          "Reduced environmental impacts by 60%",
          "Improved resource efficiency by 45%",
          "Enhanced environmental compliance by 80%"
        ]
      },
      {
        title: "Energy Company Environmental Management",
        description: "An energy company implemented ISO 14001 to ensure environmental responsibility and regulatory compliance.",
        industry: "Energy",
        results: [
          "Achieved ISO 14001 certification",
          "Enhanced environmental performance by 70%",
          "Improved regulatory compliance by 85%",
          "Reduced environmental risks by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 26
  },
  {
    title: "ISO 45001: Occupational Health and Safety Management Systems Consultation and Certification",
    slug: "iso-45001-occupational-health-safety-management-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 45001 Occupational Health and Safety Management Systems implementation and certification services to ensure worker safety and health protection.",
    detailedDescription: "Our ISO 45001 Occupational Health and Safety Management Systems (OHSMS) consultation and certification services help organizations implement comprehensive health and safety management frameworks to ensure worker safety, health protection, and compliance with occupational health and safety regulations. This service covers the complete implementation of OHS management systems, including hazard identification, risk assessment, legal compliance, and continuous health and safety improvement. Our expert occupational health and safety consultants work with organizations across all industries to establish robust OHSMS frameworks, implement safety controls, and prepare for ISO 45001 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 45001 requirements while achieving occupational health and safety excellence.",
    icon: "🛡️",
    features: [
      "Occupational Health and Safety Management System implementation",
      "Hazard identification and risk assessment",
      "Legal compliance and regulatory requirements",
      "Health and safety objectives and planning",
      "Health and safety monitoring and measurement",
      "Emergency preparedness and response",
      "Health and safety training and awareness",
      "Incident investigation and corrective actions",
      "Health and safety management review",
      "ISO 45001 certification preparation"
    ],
    benefits: [
      {
        title: "Worker Safety and Health Protection",
        description: "Ensure comprehensive protection of worker health and safety through systematic occupational health and safety management."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with occupational health and safety regulations and legal requirements through comprehensive OHS management systems."
      },
      {
        title: "Risk Reduction",
        description: "Systematically reduce occupational health and safety risks and prevent workplace accidents and injuries."
      },
      {
        title: "Cost Reduction",
        description: "Reduce costs associated with workplace accidents, injuries, and regulatory non-compliance through proactive safety management."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders by demonstrating commitment to worker health and safety protection."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified occupational health and safety management capabilities and safety credentials."
      }
    ],
    process: [
      {
        step: 1,
        title: "Health and Safety Assessment and Risk Analysis",
        description: "Assess current health and safety practices, identify hazards and risks, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "OHSMS Framework Design and Implementation",
        description: "Design occupational health and safety management system framework, establish OHS governance, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Health and Safety Controls Implementation",
        description: "Implement health and safety controls, establish monitoring systems, and create emergency response procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Legal Compliance and Monitoring",
        description: "Establish legal compliance procedures, implement health and safety monitoring, and create continuous improvement processes.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct occupational health and safety training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 45001 certification audit, address findings, and establish continuous health and safety improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization committed to worker health and safety",
      "Management commitment to occupational health and safety",
      "Dedicated health and safety team and resources",
      "Access to workplace environments and safety data",
      "Cooperation from all departments and workers",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current health and safety practices"
    ],
    deliverables: [
      "Complete ISO 45001 implementation documentation",
      "Occupational health and safety management system framework",
      "Hazard identification and risk assessment procedures",
      "Health and safety controls and procedures",
      "Legal compliance and monitoring procedures",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 45001 certificate upon successful audit",
      "Continuous health and safety improvement plan"
    ],
    pricing: {
      startingFrom: 170000,
      currency: "INR",
      includes: [
        "Complete ISO 45001 implementation support",
        "All occupational health and safety documentation",
        "Hazard identification and risk assessment",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Health and safety equipment",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Health and safety testing and monitoring costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Manufacturing",
      "Construction",
      "Mining",
      "Transportation",
      "Healthcare",
      "Energy",
      "Chemical",
      "Agriculture",
      "Government",
      "Services"
    ],
    compliance: [
      "ISO 45001:2018",
      "Occupational Health and Safety Regulations",
      "Workplace Safety Laws",
      "Health and Safety Standards",
      "Regulatory Requirements"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 45001 and OHSAS 18001?",
        answer: "ISO 45001 is the new international standard for occupational health and safety management systems, replacing OHSAS 18001 with enhanced requirements and better integration with other ISO standards."
      },
      {
        question: "Do we need ISO 45001 if we already have safety practices?",
        answer: "ISO 45001 provides a systematic framework that formalizes and enhances existing safety practices, ensuring consistency and continuous improvement in occupational health and safety."
      },
      {
        question: "How long does ISO 45001 certification take?",
        answer: "Complete ISO 45001 implementation and certification typically takes 6-9 months, depending on organization size, workplace complexity, and current health and safety maturity."
      },
      {
        question: "Is ISO 45001 certification mandatory?",
        answer: "While not mandatory, ISO 45001 certification demonstrates commitment to worker health and safety and may be required by customers, partners, or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Manufacturing Company Safety Excellence",
        description: "A major manufacturing company achieved ISO 45001 certification, enhancing worker safety and reducing workplace accidents.",
        industry: "Manufacturing",
        results: [
          "Achieved ISO 45001 certification in 8 months",
          "Reduced workplace accidents by 70%",
          "Enhanced worker safety by 80%",
          "Improved health and safety compliance by 85%"
        ]
      },
      {
        title: "Construction Company Safety Implementation",
        description: "A construction company implemented ISO 45001 to ensure worker safety and regulatory compliance.",
        industry: "Construction",
        results: [
          "Achieved ISO 45001 certification",
          "Enhanced construction site safety by 75%",
          "Reduced workplace injuries by 65%",
          "Improved safety compliance by 90%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 27
  },
  {
    title: "ISO 50001: Energy Management Systems Consultation and Certification",
    slug: "iso-50001-energy-management-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 50001 Energy Management Systems implementation and certification services to improve energy performance and reduce energy consumption.",
    detailedDescription: "Our ISO 50001 Energy Management Systems (EnMS) consultation and certification services help organizations implement comprehensive energy management frameworks to improve energy performance, reduce energy consumption, and achieve energy efficiency goals. This service covers the complete implementation of energy management systems, including energy policy, energy planning, energy performance monitoring, and continuous energy improvement. Our expert energy management consultants work with organizations across all industries to establish robust EnMS frameworks, implement energy controls, and prepare for ISO 50001 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 50001 requirements while achieving energy efficiency and sustainability goals.",
    icon: "⚡",
    features: [
      "Energy Management System implementation",
      "Energy policy and objectives",
      "Energy planning and baseline establishment",
      "Energy performance monitoring and measurement",
      "Energy efficiency improvement programs",
      "Energy legal compliance and requirements",
      "Energy training and awareness",
      "Energy management review and oversight",
      "Continuous energy improvement",
      "ISO 50001 certification preparation"
    ],
    benefits: [
      {
        title: "Energy Performance Improvement",
        description: "Implement systematic approach to energy management, resulting in improved energy performance and reduced energy consumption."
      },
      {
        title: "Cost Reduction",
        description: "Reduce energy costs through improved energy efficiency, better energy management, and systematic energy optimization."
      },
      {
        title: "Environmental Sustainability",
        description: "Contribute to environmental sustainability through reduced energy consumption and lower carbon emissions."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with energy regulations and legal requirements through comprehensive energy management systems."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified energy management capabilities and energy efficiency credentials."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders by demonstrating commitment to energy efficiency and environmental responsibility."
      }
    ],
    process: [
      {
        step: 1,
        title: "Energy Assessment and Baseline Establishment",
        description: "Assess current energy consumption, establish energy baseline, identify energy performance opportunities, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "EnMS Framework Design and Implementation",
        description: "Design energy management system framework, establish energy governance, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Energy Planning and Controls Implementation",
        description: "Implement energy planning procedures, establish energy controls, and create energy performance monitoring systems.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Energy Monitoring and Improvement",
        description: "Establish energy monitoring systems, implement energy efficiency programs, and create continuous improvement processes.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct energy management training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 50001 certification audit, address findings, and establish continuous energy improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization committed to energy efficiency",
      "Management commitment to energy management",
      "Dedicated energy management team and resources",
      "Access to energy consumption data and systems",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current energy consumption and practices"
    ],
    deliverables: [
      "Complete ISO 50001 implementation documentation",
      "Energy management system framework",
      "Energy planning and baseline documentation",
      "Energy performance monitoring procedures",
      "Energy efficiency improvement programs",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 50001 certificate upon successful audit",
      "Continuous energy improvement plan"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete ISO 50001 implementation support",
        "All energy management documentation",
        "Energy baseline and planning development",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "Energy monitoring equipment",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Energy efficiency equipment and infrastructure"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Manufacturing",
      "Energy",
      "Construction",
      "Transportation",
      "Healthcare",
      "Technology",
      "Government",
      "Education",
      "Agriculture",
      "Services"
    ],
    compliance: [
      "ISO 50001:2018",
      "Energy Regulations",
      "Energy Efficiency Standards",
      "Environmental Regulations",
      "Sustainability Requirements"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 50001 and other energy standards?",
        answer: "ISO 50001 is a comprehensive energy management system standard that focuses on systematic energy management, continuous improvement, and energy performance optimization."
      },
      {
        question: "Do we need ISO 50001 if we already have energy efficiency measures?",
        answer: "ISO 50001 provides a systematic framework that formalizes and enhances existing energy efficiency measures, ensuring consistency and continuous improvement."
      },
      {
        question: "How long does ISO 50001 certification take?",
        answer: "Complete ISO 50001 implementation and certification typically takes 6-9 months, depending on organization size, energy complexity, and current energy management maturity."
      },
      {
        question: "Is ISO 50001 certification mandatory?",
        answer: "While not mandatory, ISO 50001 certification demonstrates commitment to energy efficiency and may be required by customers, partners, or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Manufacturing Company Energy Excellence",
        description: "A major manufacturing company achieved ISO 50001 certification, enhancing energy performance and reducing energy costs.",
        industry: "Manufacturing",
        results: [
          "Achieved ISO 50001 certification in 8 months",
          "Reduced energy consumption by 25%",
          "Improved energy efficiency by 30%",
          "Reduced energy costs by 35%"
        ]
      },
      {
        title: "Healthcare Facility Energy Management",
        description: "A healthcare facility implemented ISO 50001 to improve energy efficiency and reduce operational costs.",
        industry: "Healthcare",
        results: [
          "Achieved ISO 50001 certification",
          "Enhanced energy efficiency by 40%",
          "Reduced energy costs by 30%",
          "Improved environmental performance by 50%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 28
  }
];

async function addQualityEnvironmentalOHSServices() {
  try {
    console.log('Adding Quality, Environmental, and OHS GRC Services...');
    
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
    const servicesWithUsers = qualityEnvironmentalOHSServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Quality, Environmental, and OHS GRC services`);

    console.log('Quality, Environmental, and OHS GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Quality, Environmental, and OHS GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addQualityEnvironmentalOHSServices();
