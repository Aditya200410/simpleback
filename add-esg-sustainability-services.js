const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const esgSustainabilityServices = [
  {
    title: "ESG Assessments: Environmental, Social, and Governance Performance Evaluation",
    slug: "esg-assessments-environmental-social-governance-performance-evaluation",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ESG assessments to evaluate organizational performance across environmental, social, and governance factors and identify improvement opportunities.",
    detailedDescription: "Our ESG (Environmental, Social, and Governance) assessment services help organizations evaluate their performance across environmental, social, and governance factors to identify strengths, weaknesses, and improvement opportunities. This comprehensive service covers the complete evaluation of ESG performance, including environmental impact assessment, social responsibility evaluation, governance structure analysis, and stakeholder engagement assessment. Our expert ESG consultants work with organizations across all industries to conduct thorough ESG assessments, benchmark performance against industry standards, and develop improvement strategies. We guide you through the entire assessment process, providing detailed insights into your ESG performance while identifying opportunities for enhancement and stakeholder value creation.",
    icon: "🌍",
    features: [
      "Comprehensive ESG performance assessment",
      "Environmental impact evaluation",
      "Social responsibility assessment",
      "Governance structure analysis",
      "Stakeholder engagement evaluation",
      "ESG risk identification and analysis",
      "Industry benchmarking and comparison",
      "ESG improvement recommendations",
      "ESG reporting guidance",
      "ESG strategy development"
    ],
    benefits: [
      {
        title: "ESG Performance Insights",
        description: "Gain comprehensive insights into your organization's ESG performance across all key factors and identify improvement opportunities."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders by demonstrating commitment to ESG excellence and transparent performance evaluation."
      },
      {
        title: "Risk Identification",
        description: "Identify ESG risks and opportunities that could impact business performance and stakeholder value."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through improved ESG performance and enhanced stakeholder relationships."
      },
      {
        title: "Investment Attractiveness",
        description: "Enhance investment attractiveness by demonstrating strong ESG performance and commitment to sustainability."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with emerging ESG regulations and reporting requirements through comprehensive assessment."
      }
    ],
    process: [
      {
        step: 1,
        title: "ESG Assessment Planning and Scope Definition",
        description: "Define assessment scope, establish evaluation criteria, and develop comprehensive assessment methodology.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Data Collection and Analysis",
        description: "Collect ESG data from various sources, analyze performance metrics, and conduct stakeholder interviews.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Environmental Performance Evaluation",
        description: "Evaluate environmental performance, assess environmental impacts, and identify environmental improvement opportunities.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Social and Governance Assessment",
        description: "Assess social responsibility performance, evaluate governance structure, and analyze stakeholder engagement.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Benchmarking and Gap Analysis",
        description: "Benchmark performance against industry standards, conduct gap analysis, and identify improvement priorities.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Report Development and Recommendations",
        description: "Develop comprehensive assessment report, provide improvement recommendations, and create action plan.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization committed to ESG excellence",
      "Management commitment to ESG assessment",
      "Access to ESG data and performance metrics",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for assessment and improvement",
      "Timeline commitment of 3-4 months",
      "Documentation of current ESG practices and performance"
    ],
    deliverables: [
      "Comprehensive ESG assessment report",
      "Environmental performance evaluation",
      "Social responsibility assessment",
      "Governance structure analysis",
      "ESG risk identification and analysis",
      "Industry benchmarking report",
      "ESG improvement recommendations",
      "ESG strategy development guide",
      "ESG reporting guidance",
      "Action plan and implementation roadmap"
    ],
    pricing: {
      startingFrom: 180000,
      currency: "INR",
      includes: [
        "Complete ESG assessment and evaluation",
        "All ESG performance analysis",
        "Industry benchmarking and comparison",
        "ESG improvement recommendations",
        "ESG strategy development guidance",
        "12 months post-assessment support"
      ],
      excludes: [
        "ESG data collection costs",
        "Third-party ESG assessment fees",
        "Travel and accommodation expenses",
        "Additional analysis beyond standard scope",
        "ESG improvement implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "3-4 months",
    industry: [
      "All Industries",
      "Financial Services",
      "Manufacturing",
      "Technology",
      "Healthcare",
      "Energy",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "ESG Standards",
      "Sustainability Reporting Standards",
      "ESG Regulations",
      "Investor Requirements",
      "Stakeholder Expectations"
    ],
    faqs: [
      {
        question: "What is included in an ESG assessment?",
        answer: "An ESG assessment includes evaluation of environmental performance (climate, waste, energy), social responsibility (labor, community, diversity), and governance (ethics, transparency, risk management)."
      },
      {
        question: "How often should ESG assessments be conducted?",
        answer: "ESG assessments should be conducted annually or when significant changes occur in the organization, industry, or regulatory environment."
      },
      {
        question: "How long does an ESG assessment take?",
        answer: "Complete ESG assessment typically takes 3-4 months, depending on organization size, ESG complexity, and data availability."
      },
      {
        question: "Is ESG assessment mandatory?",
        answer: "While not mandatory, ESG assessment is increasingly required by investors, customers, and regulators, and is essential for stakeholder confidence."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services ESG Excellence",
        description: "A major financial services company conducted comprehensive ESG assessment, enhancing stakeholder confidence and investment attractiveness.",
        industry: "Financial Services",
        results: [
          "Completed comprehensive ESG assessment in 4 months",
          "Enhanced ESG performance by 60%",
          "Improved stakeholder confidence by 70%",
          "Increased investment attractiveness by 50%"
        ]
      },
      {
        title: "Manufacturing Company ESG Implementation",
        description: "A manufacturing company conducted ESG assessment to improve sustainability performance and meet customer requirements.",
        industry: "Manufacturing",
        results: [
          "Completed ESG assessment",
          "Enhanced environmental performance by 55%",
          "Improved social responsibility by 65%",
          "Strengthened governance practices by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 29
  },
  {
    title: "ESG Assurance: Independent Verification of ESG Data and Reporting",
    slug: "esg-assurance-independent-verification-esg-data-reporting",
    category: "Consultation and Certification services",
    shortDescription: "Independent ESG assurance services to verify and validate ESG data, reporting, and performance claims, ensuring accuracy and stakeholder confidence.",
    detailedDescription: "Our ESG assurance services provide independent verification and validation of ESG data, reporting, and performance claims to ensure accuracy, reliability, and stakeholder confidence. This comprehensive service covers the complete verification of ESG information, including data accuracy validation, reporting compliance assessment, performance claim verification, and assurance report development. Our expert ESG assurance consultants work with organizations to provide independent verification of their ESG data and reporting, ensuring accuracy and building stakeholder trust. We guide you through the entire assurance process, providing independent validation of your ESG performance while ensuring compliance with reporting standards and stakeholder expectations.",
    icon: "✅",
    features: [
      "Independent ESG data verification",
      "ESG reporting compliance assessment",
      "ESG performance claim validation",
      "ESG data accuracy and reliability testing",
      "ESG assurance report development",
      "ESG reporting standard compliance",
      "ESG stakeholder confidence building",
      "ESG risk assessment and validation",
      "ESG improvement recommendations",
      "ESG assurance maintenance"
    ],
    benefits: [
      {
        title: "Independent Verification",
        description: "Obtain independent verification of ESG data and performance claims, ensuring accuracy and building stakeholder confidence."
      },
      {
        title: "Stakeholder Trust",
        description: "Build trust with stakeholders through independent assurance of ESG performance and transparent reporting."
      },
      {
        title: "Reporting Compliance",
        description: "Ensure compliance with ESG reporting standards and requirements through comprehensive assurance processes."
      },
      {
        title: "Risk Mitigation",
        description: "Mitigate risks associated with ESG reporting errors and stakeholder concerns through independent verification."
      },
      {
        title: "Investment Confidence",
        description: "Enhance investment confidence through verified ESG performance and reliable reporting."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through assured ESG performance and enhanced stakeholder relationships."
      }
    ],
    process: [
      {
        step: 1,
        title: "ESG Assurance Planning and Scope Definition",
        description: "Define assurance scope, establish verification criteria, and develop comprehensive assurance methodology.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "ESG Data Collection and Review",
        description: "Collect ESG data, review reporting documentation, and assess data collection processes and controls.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "ESG Data Verification and Testing",
        description: "Verify ESG data accuracy, test data reliability, and validate performance calculations and methodologies.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "ESG Reporting Compliance Assessment",
        description: "Assess ESG reporting compliance, evaluate reporting standards adherence, and identify reporting gaps.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "ESG Performance Validation",
        description: "Validate ESG performance claims, assess improvement achievements, and verify stakeholder engagement.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "ESG Assurance Report Development",
        description: "Develop comprehensive assurance report, provide recommendations, and establish ongoing assurance processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with ESG reporting and data",
      "Management commitment to ESG assurance",
      "Access to ESG data and reporting systems",
      "Cooperation from ESG and reporting teams",
      "Budget allocation for assurance and improvement",
      "Timeline commitment of 3-4 months",
      "Documentation of ESG data collection and reporting processes"
    ],
    deliverables: [
      "Comprehensive ESG assurance report",
      "ESG data verification and validation",
      "ESG reporting compliance assessment",
      "ESG performance claim validation",
      "ESG data accuracy and reliability assessment",
      "ESG improvement recommendations",
      "ESG assurance methodology documentation",
      "Ongoing ESG assurance framework",
      "ESG stakeholder confidence building guide",
      "ESG assurance maintenance plan"
    ],
    pricing: {
      startingFrom: 200000,
      currency: "INR",
      includes: [
        "Complete ESG assurance and verification",
        "All ESG data verification and validation",
        "ESG reporting compliance assessment",
        "ESG performance claim validation",
        "ESG assurance report development",
        "12 months post-assurance support"
      ],
      excludes: [
        "ESG data collection and testing costs",
        "Third-party ESG verification fees",
        "Travel and accommodation expenses",
        "Additional verification beyond standard scope",
        "ESG improvement implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "3-4 months",
    industry: [
      "All Industries",
      "Financial Services",
      "Manufacturing",
      "Technology",
      "Healthcare",
      "Energy",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "ESG Reporting Standards",
      "Sustainability Reporting Standards",
      "ESG Assurance Standards",
      "Investor Requirements",
      "Stakeholder Expectations"
    ],
    faqs: [
      {
        question: "What is ESG assurance and why is it important?",
        answer: "ESG assurance is independent verification of ESG data and reporting to ensure accuracy and build stakeholder confidence. It's important for investment decisions and stakeholder trust."
      },
      {
        question: "How often should ESG assurance be conducted?",
        answer: "ESG assurance should be conducted annually or when significant changes occur in ESG reporting or performance."
      },
      {
        question: "How long does ESG assurance take?",
        answer: "Complete ESG assurance typically takes 3-4 months, depending on organization size, ESG complexity, and data availability."
      },
      {
        question: "Is ESG assurance mandatory?",
        answer: "While not mandatory, ESG assurance is increasingly required by investors and stakeholders, and is essential for credible ESG reporting."
      }
    ],
    caseStudies: [
      {
        title: "Technology Company ESG Assurance",
        description: "A major technology company obtained ESG assurance, enhancing stakeholder confidence and investment attractiveness.",
        industry: "Technology",
        results: [
          "Completed ESG assurance in 4 months",
          "Enhanced stakeholder confidence by 80%",
          "Improved investment attractiveness by 60%",
          "Strengthened ESG reporting credibility by 75%"
        ]
      },
      {
        title: "Energy Company ESG Verification",
        description: "An energy company obtained ESG assurance to validate their sustainability performance and build stakeholder trust.",
        industry: "Energy",
        results: [
          "Completed ESG assurance",
          "Validated sustainability performance",
          "Enhanced stakeholder trust by 70%",
          "Improved ESG reporting accuracy by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 30
  },
  {
    title: "ESG Certification: Environmental, Social, and Governance Standards Certification",
    slug: "esg-certification-environmental-social-governance-standards-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ESG certification services to certify organizational compliance with environmental, social, and governance standards and demonstrate ESG excellence.",
    detailedDescription: "Our ESG certification services help organizations achieve certification for their environmental, social, and governance performance, demonstrating compliance with ESG standards and excellence in sustainable business practices. This comprehensive service covers the complete certification process, including ESG standard compliance assessment, performance evaluation, certification preparation, and ongoing compliance maintenance. Our expert ESG certification consultants work with organizations to implement ESG standards, prepare for certification, and maintain ongoing compliance. We guide you through the entire certification process, ensuring your organization meets ESG certification requirements while demonstrating commitment to sustainable business practices and stakeholder value creation.",
    icon: "🏆",
    features: [
      "ESG certification implementation",
      "ESG standard compliance assessment",
      "ESG performance evaluation and improvement",
      "ESG certification preparation",
      "ESG stakeholder engagement",
      "ESG reporting and disclosure",
      "ESG risk management",
      "ESG continuous improvement",
      "ESG certification maintenance",
      "ESG excellence demonstration"
    ],
    benefits: [
      {
        title: "ESG Excellence Recognition",
        description: "Achieve recognition for ESG excellence through certified compliance with environmental, social, and governance standards."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders by demonstrating certified commitment to ESG excellence and sustainable practices."
      },
      {
        title: "Market Differentiation",
        description: "Differentiate your organization in the market through certified ESG performance and sustainability credentials."
      },
      {
        title: "Investment Attractiveness",
        description: "Enhance investment attractiveness through certified ESG performance and demonstrated sustainability commitment."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with ESG regulations and standards through comprehensive certification processes."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified ESG capabilities and enhanced stakeholder relationships."
      }
    ],
    process: [
      {
        step: 1,
        title: "ESG Certification Planning and Standard Selection",
        description: "Select appropriate ESG certification standards, define certification scope, and develop implementation roadmap.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "ESG Standard Implementation",
        description: "Implement ESG standards, establish compliance frameworks, and define roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "ESG Performance Evaluation and Improvement",
        description: "Evaluate ESG performance, implement improvement measures, and establish monitoring and reporting systems.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "ESG Certification Preparation",
        description: "Prepare for ESG certification, conduct internal assessment, and ensure compliance with certification requirements.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "ESG Certification Audit",
        description: "Support ESG certification audit, address findings, and ensure successful certification achievement.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "ESG Certification Maintenance",
        description: "Establish ongoing ESG certification maintenance, continuous improvement, and compliance monitoring.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization committed to ESG excellence",
      "Management commitment to ESG certification",
      "Dedicated ESG team and resources",
      "Access to ESG data and performance metrics",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for certification and maintenance",
      "Timeline commitment of 6-9 months",
      "Documentation of current ESG practices and performance"
    ],
    deliverables: [
      "Complete ESG certification implementation",
      "ESG standard compliance documentation",
      "ESG performance evaluation and improvement plan",
      "ESG certification preparation package",
      "ESG certification audit support",
      "ESG certificate upon successful audit",
      "ESG certification maintenance plan",
      "ESG continuous improvement framework",
      "ESG stakeholder engagement guide",
      "ESG reporting and disclosure procedures"
    ],
    pricing: {
      startingFrom: 220000,
      currency: "INR",
      includes: [
        "Complete ESG certification implementation",
        "All ESG standard compliance documentation",
        "ESG performance evaluation and improvement",
        "ESG certification preparation",
        "ESG certification audit support",
        "12 months post-certification support"
      ],
      excludes: [
        "ESG certification fees",
        "ESG data collection and testing costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "ESG improvement implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "All Industries",
      "Financial Services",
      "Manufacturing",
      "Technology",
      "Healthcare",
      "Energy",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "ESG Certification Standards",
      "Sustainability Standards",
      "ESG Reporting Standards",
      "Investor Requirements",
      "Stakeholder Expectations"
    ],
    faqs: [
      {
        question: "What ESG certification standards are available?",
        answer: "Various ESG certification standards are available, including industry-specific standards, sustainability certifications, and ESG performance standards tailored to different sectors."
      },
      {
        question: "How long does ESG certification take?",
        answer: "Complete ESG certification typically takes 6-9 months, depending on organization size, ESG complexity, and current performance level."
      },
      {
        question: "Is ESG certification mandatory?",
        answer: "While not mandatory, ESG certification demonstrates commitment to sustainability and may be required by customers, investors, or regulatory authorities."
      },
      {
        question: "How often does ESG certification need renewal?",
        answer: "ESG certification typically requires annual renewal or periodic reassessment to maintain compliance and demonstrate ongoing ESG excellence."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services ESG Certification",
        description: "A major financial services company achieved ESG certification, enhancing stakeholder confidence and investment attractiveness.",
        industry: "Financial Services",
        results: [
          "Achieved ESG certification in 8 months",
          "Enhanced stakeholder confidence by 85%",
          "Improved investment attractiveness by 70%",
          "Demonstrated ESG excellence to stakeholders"
        ]
      },
      {
        title: "Manufacturing Company ESG Excellence",
        description: "A manufacturing company achieved ESG certification to demonstrate sustainability commitment and meet customer requirements.",
        industry: "Manufacturing",
        results: [
          "Achieved ESG certification",
          "Demonstrated sustainability commitment",
          "Enhanced customer confidence by 75%",
          "Improved market differentiation by 60%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 31
  },
  {
    title: "GHG Assurance: Greenhouse Gas Emissions Data Verification and Assurance",
    slug: "ghg-assurance-greenhouse-gas-emissions-data-verification-assurance",
    category: "Consultation and Certification services",
    shortDescription: "Specialized GHG assurance services to verify and provide assurance on greenhouse gas emissions data, ensuring accuracy and compliance with carbon reporting standards.",
    detailedDescription: "Our GHG (Greenhouse Gas) assurance services provide independent verification and assurance of greenhouse gas emissions data to ensure accuracy, reliability, and compliance with carbon reporting standards. This specialized service covers the complete verification of GHG emissions data, including emissions calculation validation, data accuracy testing, reporting compliance assessment, and assurance report development. Our expert GHG assurance consultants work with organizations to provide independent verification of their GHG emissions data and reporting, ensuring accuracy and building stakeholder confidence in carbon performance. We guide you through the entire assurance process, providing independent validation of your GHG emissions data while ensuring compliance with carbon reporting standards and stakeholder expectations.",
    icon: "🌡️",
    features: [
      "GHG emissions data verification",
      "GHG calculation methodology validation",
      "GHG data accuracy and reliability testing",
      "GHG reporting compliance assessment",
      "GHG assurance report development",
      "Carbon footprint verification",
      "GHG reduction claim validation",
      "GHG monitoring and measurement verification",
      "GHG improvement recommendations",
      "GHG assurance maintenance"
    ],
    benefits: [
      {
        title: "GHG Data Accuracy",
        description: "Ensure accuracy and reliability of GHG emissions data through independent verification and validation processes."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build confidence with stakeholders through verified GHG emissions data and transparent carbon reporting."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with GHG reporting regulations and carbon disclosure requirements through comprehensive assurance."
      },
      {
        title: "Investment Confidence",
        description: "Enhance investment confidence through verified GHG performance and reliable carbon reporting."
      },
      {
        title: "Risk Mitigation",
        description: "Mitigate risks associated with GHG reporting errors and carbon performance claims through independent verification."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through assured GHG performance and enhanced stakeholder relationships."
      }
    ],
    process: [
      {
        step: 1,
        title: "GHG Assurance Planning and Scope Definition",
        description: "Define GHG assurance scope, establish verification criteria, and develop comprehensive assurance methodology.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "GHG Data Collection and Review",
        description: "Collect GHG emissions data, review calculation methodologies, and assess data collection processes and controls.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "GHG Calculation Verification and Testing",
        description: "Verify GHG calculation methodologies, test data accuracy, and validate emissions calculations and assumptions.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "GHG Reporting Compliance Assessment",
        description: "Assess GHG reporting compliance, evaluate reporting standards adherence, and identify reporting gaps.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "GHG Performance Validation",
        description: "Validate GHG reduction claims, assess carbon performance achievements, and verify monitoring systems.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "GHG Assurance Report Development",
        description: "Develop comprehensive GHG assurance report, provide recommendations, and establish ongoing assurance processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with GHG emissions data and reporting",
      "Management commitment to GHG assurance",
      "Access to GHG data and calculation systems",
      "Cooperation from GHG and reporting teams",
      "Budget allocation for assurance and improvement",
      "Timeline commitment of 3-4 months",
      "Documentation of GHG data collection and calculation processes"
    ],
    deliverables: [
      "Comprehensive GHG assurance report",
      "GHG emissions data verification and validation",
      "GHG calculation methodology validation",
      "GHG reporting compliance assessment",
      "GHG performance claim validation",
      "GHG data accuracy and reliability assessment",
      "GHG improvement recommendations",
      "GHG assurance methodology documentation",
      "Ongoing GHG assurance framework",
      "GHG assurance maintenance plan"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete GHG assurance and verification",
        "All GHG data verification and validation",
        "GHG calculation methodology validation",
        "GHG reporting compliance assessment",
        "GHG assurance report development",
        "12 months post-assurance support"
      ],
      excludes: [
        "GHG data collection and testing costs",
        "Third-party GHG verification fees",
        "Travel and accommodation expenses",
        "Additional verification beyond standard scope",
        "GHG improvement implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "3-4 months",
    industry: [
      "All Industries",
      "Manufacturing",
      "Energy",
      "Transportation",
      "Construction",
      "Technology",
      "Healthcare",
      "Government",
      "Education",
      "Consulting"
    ],
    compliance: [
      "GHG Reporting Standards",
      "Carbon Disclosure Standards",
      "Climate Reporting Requirements",
      "ESG Reporting Standards",
      "Investor Requirements"
    ],
    faqs: [
      {
        question: "What is GHG assurance and why is it important?",
        answer: "GHG assurance is independent verification of greenhouse gas emissions data to ensure accuracy and build stakeholder confidence in carbon performance and reporting."
      },
      {
        question: "How often should GHG assurance be conducted?",
        answer: "GHG assurance should be conducted annually or when significant changes occur in GHG emissions or reporting methodologies."
      },
      {
        question: "How long does GHG assurance take?",
        answer: "Complete GHG assurance typically takes 3-4 months, depending on organization size, GHG complexity, and data availability."
      },
      {
        question: "Is GHG assurance mandatory?",
        answer: "While not mandatory, GHG assurance is increasingly required by investors and stakeholders, and is essential for credible carbon reporting."
      }
    ],
    caseStudies: [
      {
        title: "Manufacturing Company GHG Assurance",
        description: "A major manufacturing company obtained GHG assurance, enhancing stakeholder confidence in their carbon performance and reporting.",
        industry: "Manufacturing",
        results: [
          "Completed GHG assurance in 4 months",
          "Enhanced stakeholder confidence by 75%",
          "Improved carbon reporting credibility by 80%",
          "Validated GHG reduction achievements"
        ]
      },
      {
        title: "Energy Company Carbon Verification",
        description: "An energy company obtained GHG assurance to validate their carbon performance and build stakeholder trust.",
        industry: "Energy",
        results: [
          "Completed GHG assurance",
          "Validated carbon performance data",
          "Enhanced stakeholder trust by 70%",
          "Improved GHG reporting accuracy by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 32
  }
];

async function addESGSustainabilityServices() {
  try {
    console.log('Adding ESG & Sustainability GRC Services...');
    
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
    const servicesWithUsers = esgSustainabilityServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} ESG & Sustainability GRC services`);

    console.log('ESG & Sustainability GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding ESG & Sustainability GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addESGSustainabilityServices();
