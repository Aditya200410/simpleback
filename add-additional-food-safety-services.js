const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const additionalFoodSafetyServices = [
  {
    title: "FSSC: Food Safety System Certification Consultation and Certification",
    slug: "fssc-food-safety-system-certification-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive FSSC 22000 Food Safety System Certification implementation and certification services to ensure food safety compliance and meet global food safety standards.",
    detailedDescription: "Our FSSC 22000 (Food Safety System Certification) consultation and certification services help organizations implement comprehensive food safety management systems that meet global food safety standards. FSSC 22000 is a globally recognized food safety certification scheme that combines ISO 22000 with additional requirements specific to food manufacturing. Our expert FSSC consultants work with food manufacturers, processors, and related organizations to implement FSSC 22000 requirements, establish robust food safety controls, and prepare for FSSC certification. We guide you through the entire implementation and certification process, ensuring your organization meets FSSC 22000 requirements while achieving global food safety certification and market access.",
    icon: "🌍",
    features: [
      "FSSC 22000 implementation and certification",
      "Food safety management system development",
      "HACCP and prerequisite programs implementation",
      "Food safety governance and management",
      "Food safety monitoring and verification",
      "Food safety emergency preparedness",
      "Food safety communication and training",
      "Continuous improvement and corrective actions",
      "Global food safety standard compliance",
      "FSSC certification preparation"
    ],
    benefits: [
      {
        title: "Global Food Safety Recognition",
        description: "Achieve globally recognized food safety certification that demonstrates commitment to food safety excellence."
      },
      {
        title: "Market Access",
        description: "Gain access to global markets requiring FSSC certification and meet international food safety requirements."
      },
      {
        title: "Customer Confidence",
        description: "Build customer confidence through certified food safety management systems and global recognition."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet food safety regulatory requirements and industry standards through comprehensive FSSC implementation."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence in food safety management through systematic processes and continuous improvement."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified food safety capabilities and global market recognition."
      }
    ],
    process: [
      {
        step: 1,
        title: "FSSC Assessment and Gap Analysis",
        description: "Assess current food safety practices against FSSC 22000 requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "FSSC Framework Implementation",
        description: "Implement FSSC 22000 framework, establish food safety governance, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Food Safety Controls Implementation",
        description: "Implement food safety controls, establish HACCP plans, and create prerequisite programs.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Monitoring and Verification",
        description: "Establish food safety monitoring systems, implement verification procedures, and create emergency response plans.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct FSSC training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support FSSC certification audit, address findings, and establish continuous improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Food manufacturing or processing organization",
      "Management commitment to FSSC implementation",
      "Dedicated food safety team and resources",
      "Access to food production and handling processes",
      "Cooperation from production, quality, and management teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-8 months",
      "Documentation of current food safety practices"
    ],
    deliverables: [
      "Complete FSSC 22000 implementation documentation",
      "Food safety management system framework",
      "FSSC-specific requirements implementation guide",
      "HACCP plan and critical control point procedures",
      "Food safety monitoring and verification procedures",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "FSSC 22000 certificate upon successful audit",
      "Continuous improvement framework and plan"
    ],
    pricing: {
      startingFrom: 190000,
      currency: "INR",
      includes: [
        "Complete FSSC 22000 implementation support",
        "All food safety documentation development",
        "FSSC-specific requirements implementation",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "FSSC certification fees",
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
      "Food Packaging",
      "Food Ingredients",
      "Beverage Production",
      "Agricultural Processing",
      "Food Technology",
      "Food Distribution",
      "Food Retail",
      "Food Service"
    ],
    compliance: [
      "FSSC 22000",
      "ISO 22000:2018",
      "HACCP",
      "BRC Global Standards",
      "SQF",
      "IFS",
      "Food Safety Regulations"
    ],
    faqs: [
      {
        question: "What is the difference between FSSC 22000 and ISO 22000?",
        answer: "FSSC 22000 is a certification scheme that includes ISO 22000 plus additional requirements specific to food manufacturing, providing global recognition and market access."
      },
      {
        question: "Do we need FSSC 22000 if we already have ISO 22000?",
        answer: "FSSC 22000 provides additional global recognition and may be required by customers or markets. It builds upon ISO 22000 with additional requirements."
      },
      {
        question: "How long does FSSC 22000 certification take?",
        answer: "Complete FSSC 22000 implementation and certification typically takes 6-8 months, depending on organization size and current food safety maturity."
      },
      {
        question: "Is FSSC 22000 certification mandatory?",
        answer: "While not mandatory, FSSC 22000 certification provides global recognition and may be required by customers, retailers, or export markets."
      }
    ],
    caseStudies: [
      {
        title: "Food Manufacturing Global Certification",
        description: "A major food manufacturing company achieved FSSC 22000 certification, enabling global market access and customer confidence.",
        industry: "Food Manufacturing",
        results: [
          "Achieved FSSC 22000 certification in 7 months",
          "Gained access to global markets",
          "Enhanced customer confidence by 80%",
          "Met international food safety requirements"
        ]
      },
      {
        title: "Food Processing Export Excellence",
        description: "A food processing company implemented FSSC 22000 to meet export requirements and serve international customers.",
        industry: "Food Processing",
        results: [
          "Achieved FSSC 22000 certification",
          "Enabled international exports",
          "Served global customers securely",
          "Enhanced food safety by 85%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 22
  },
  {
    title: "HALAL: Islamic Food Certification Consultation and Certification",
    slug: "halal-islamic-food-certification-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive HALAL certification services to ensure food and products comply with Islamic dietary laws and meet HALAL requirements for Muslim consumers worldwide.",
    detailedDescription: "Our HALAL certification consultation and certification services help organizations ensure their food and products comply with Islamic dietary laws and meet HALAL requirements for Muslim consumers worldwide. HALAL certification verifies that products are permissible under Islamic law and free from prohibited substances. Our expert HALAL consultants work with food manufacturers, processors, restaurants, and product manufacturers to implement HALAL compliance programs, establish HALAL control systems, and prepare for HALAL certification. We guide you through the entire certification process, ensuring your products meet HALAL requirements while gaining access to the growing global HALAL market and serving Muslim consumers with confidence.",
    icon: "☪️",
    features: [
      "HALAL certification implementation",
      "Islamic dietary law compliance",
      "HALAL ingredient verification and sourcing",
      "HALAL production process control",
      "HALAL facility and equipment requirements",
      "HALAL staff training and awareness",
      "HALAL documentation and record keeping",
      "HALAL audit and inspection support",
      "HALAL market access and compliance",
      "HALAL certification maintenance"
    ],
    benefits: [
      {
        title: "Muslim Market Access",
        description: "Gain access to the growing global HALAL market and serve Muslim consumers worldwide with certified HALAL products."
      },
      {
        title: "Religious Compliance",
        description: "Ensure products comply with Islamic dietary laws and meet religious requirements for Muslim consumers."
      },
      {
        title: "Consumer Trust",
        description: "Build trust with Muslim consumers through certified HALAL products and transparent compliance processes."
      },
      {
        title: "Market Expansion",
        description: "Expand market reach to Muslim-majority countries and communities worldwide through HALAL certification."
      },
      {
        title: "Brand Differentiation",
        description: "Differentiate products in the market through HALAL certification and appeal to Muslim consumers."
      },
      {
        title: "Export Opportunities",
        description: "Access export opportunities to Muslim-majority countries requiring HALAL certification for food imports."
      }
    ],
    process: [
      {
        step: 1,
        title: "HALAL Assessment and Compliance Review",
        description: "Assess current products and processes against HALAL requirements, identify compliance gaps, and develop implementation roadmap.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "HALAL Compliance Framework Implementation",
        description: "Implement HALAL compliance framework, establish HALAL control systems, and define roles and responsibilities.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "HALAL Production Process Control",
        description: "Implement HALAL production controls, establish ingredient verification procedures, and create HALAL facility requirements.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "HALAL Documentation and Training",
        description: "Develop HALAL documentation, conduct staff training, and establish HALAL record-keeping systems.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "HALAL Audit Preparation",
        description: "Prepare for HALAL audit, conduct internal review, and ensure compliance with HALAL requirements.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "HALAL Certification and Maintenance",
        description: "Support HALAL certification audit, address findings, and establish ongoing HALAL compliance maintenance.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization producing food or consumer products",
      "Management commitment to HALAL compliance",
      "Dedicated HALAL compliance team and resources",
      "Access to production processes and ingredient sourcing",
      "Cooperation from production, quality, and management teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 4-6 months",
      "Documentation of current production processes and ingredients"
    ],
    deliverables: [
      "Complete HALAL compliance documentation",
      "HALAL compliance framework and procedures",
      "HALAL ingredient verification and sourcing guide",
      "HALAL production process control procedures",
      "HALAL facility and equipment requirements",
      "Staff training materials and programs",
      "HALAL audit preparation package",
      "HALAL certificate upon successful audit",
      "Ongoing HALAL compliance maintenance plan",
      "HALAL market access guidance"
    ],
    pricing: {
      startingFrom: 100000,
      currency: "INR",
      includes: [
        "Complete HALAL compliance implementation support",
        "All HALAL documentation development",
        "HALAL ingredient verification and sourcing",
        "Staff training and awareness programs",
        "HALAL audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "HALAL certification fees",
        "HALAL ingredient testing costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "HALAL equipment and facility modifications"
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
      "Food Service",
      "Restaurants",
      "Beverage Production",
      "Cosmetics",
      "Pharmaceuticals",
      "Food Ingredients",
      "Food Packaging",
      "Food Distribution"
    ],
    compliance: [
      "HALAL Certification",
      "Islamic Dietary Laws",
      "HALAL Standards",
      "Muslim Consumer Requirements",
      "Export Requirements",
      "Religious Compliance"
    ],
    faqs: [
      {
        question: "What makes a product HALAL?",
        answer: "A product is HALAL if it contains only permissible ingredients according to Islamic law, is processed using HALAL methods, and is free from prohibited substances like pork, alcohol, and non-HALAL additives."
      },
      {
        question: "Do we need HALAL certification for all products?",
        answer: "HALAL certification is required for products intended for Muslim consumers. It's essential for accessing Muslim markets and serving Muslim customers."
      },
      {
        question: "How long does HALAL certification take?",
        answer: "Complete HALAL certification typically takes 4-6 months, depending on product complexity, ingredient sourcing, and current compliance level."
      },
      {
        question: "Is HALAL certification mandatory?",
        answer: "HALAL certification is mandatory for products sold to Muslim consumers and in Muslim-majority countries. It's essential for market access and consumer trust."
      }
    ],
    caseStudies: [
      {
        title: "Food Manufacturing HALAL Certification",
        description: "A major food manufacturing company achieved HALAL certification, enabling access to Muslim markets and serving Muslim consumers worldwide.",
        industry: "Food Manufacturing",
        results: [
          "Achieved HALAL certification in 5 months",
          "Gained access to Muslim markets",
          "Enhanced Muslim consumer trust by 90%",
          "Increased sales in Muslim-majority countries by 60%"
        ]
      },
      {
        title: "Restaurant Chain HALAL Compliance",
        description: "A restaurant chain implemented HALAL certification to serve Muslim customers and expand to Muslim-majority markets.",
        industry: "Food Service",
        results: [
          "Achieved HALAL certification",
          "Served Muslim customers confidently",
          "Expanded to Muslim-majority markets",
          "Enhanced customer satisfaction by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 23
  },
  {
    title: "KOSHER: Jewish Dietary Law Certification Consultation and Certification",
    slug: "kosher-jewish-dietary-law-certification-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive KOSHER certification services to ensure food and products comply with Jewish dietary laws and meet KOSHER requirements for Jewish consumers worldwide.",
    detailedDescription: "Our KOSHER certification consultation and certification services help organizations ensure their food and products comply with Jewish dietary laws and meet KOSHER requirements for Jewish consumers worldwide. KOSHER certification verifies that products are prepared according to Jewish dietary laws and are suitable for consumption by observant Jews. Our expert KOSHER consultants work with food manufacturers, processors, restaurants, and product manufacturers to implement KOSHER compliance programs, establish KOSHER control systems, and prepare for KOSHER certification. We guide you through the entire certification process, ensuring your products meet KOSHER requirements while gaining access to the global KOSHER market and serving Jewish consumers with confidence.",
    icon: "✡️",
    features: [
      "KOSHER certification implementation",
      "Jewish dietary law compliance",
      "KOSHER ingredient verification and sourcing",
      "KOSHER production process control",
      "KOSHER facility and equipment requirements",
      "KOSHER staff training and awareness",
      "KOSHER documentation and record keeping",
      "KOSHER audit and inspection support",
      "KOSHER market access and compliance",
      "KOSHER certification maintenance"
    ],
    benefits: [
      {
        title: "Jewish Market Access",
        description: "Gain access to the global KOSHER market and serve Jewish consumers worldwide with certified KOSHER products."
      },
      {
        title: "Religious Compliance",
        description: "Ensure products comply with Jewish dietary laws and meet religious requirements for Jewish consumers."
      },
      {
        title: "Consumer Trust",
        description: "Build trust with Jewish consumers through certified KOSHER products and transparent compliance processes."
      },
      {
        title: "Market Expansion",
        description: "Expand market reach to Jewish communities worldwide and countries with significant Jewish populations."
      },
      {
        title: "Brand Differentiation",
        description: "Differentiate products in the market through KOSHER certification and appeal to Jewish consumers."
      },
      {
        title: "Export Opportunities",
        description: "Access export opportunities to countries with Jewish populations requiring KOSHER certification for food imports."
      }
    ],
    process: [
      {
        step: 1,
        title: "KOSHER Assessment and Compliance Review",
        description: "Assess current products and processes against KOSHER requirements, identify compliance gaps, and develop implementation roadmap.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "KOSHER Compliance Framework Implementation",
        description: "Implement KOSHER compliance framework, establish KOSHER control systems, and define roles and responsibilities.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "KOSHER Production Process Control",
        description: "Implement KOSHER production controls, establish ingredient verification procedures, and create KOSHER facility requirements.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "KOSHER Documentation and Training",
        description: "Develop KOSHER documentation, conduct staff training, and establish KOSHER record-keeping systems.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "KOSHER Audit Preparation",
        description: "Prepare for KOSHER audit, conduct internal review, and ensure compliance with KOSHER requirements.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "KOSHER Certification and Maintenance",
        description: "Support KOSHER certification audit, address findings, and establish ongoing KOSHER compliance maintenance.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization producing food or consumer products",
      "Management commitment to KOSHER compliance",
      "Dedicated KOSHER compliance team and resources",
      "Access to production processes and ingredient sourcing",
      "Cooperation from production, quality, and management teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 4-6 months",
      "Documentation of current production processes and ingredients"
    ],
    deliverables: [
      "Complete KOSHER compliance documentation",
      "KOSHER compliance framework and procedures",
      "KOSHER ingredient verification and sourcing guide",
      "KOSHER production process control procedures",
      "KOSHER facility and equipment requirements",
      "Staff training materials and programs",
      "KOSHER audit preparation package",
      "KOSHER certificate upon successful audit",
      "Ongoing KOSHER compliance maintenance plan",
      "KOSHER market access guidance"
    ],
    pricing: {
      startingFrom: 100000,
      currency: "INR",
      includes: [
        "Complete KOSHER compliance implementation support",
        "All KOSHER documentation development",
        "KOSHER ingredient verification and sourcing",
        "Staff training and awareness programs",
        "KOSHER audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "KOSHER certification fees",
        "KOSHER ingredient testing costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "KOSHER equipment and facility modifications"
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
      "Food Service",
      "Restaurants",
      "Beverage Production",
      "Cosmetics",
      "Pharmaceuticals",
      "Food Ingredients",
      "Food Packaging",
      "Food Distribution"
    ],
    compliance: [
      "KOSHER Certification",
      "Jewish Dietary Laws",
      "KOSHER Standards",
      "Jewish Consumer Requirements",
      "Export Requirements",
      "Religious Compliance"
    ],
    faqs: [
      {
        question: "What makes a product KOSHER?",
        answer: "A product is KOSHER if it contains only permissible ingredients according to Jewish dietary law, is processed using KOSHER methods, and is free from prohibited substances like pork, shellfish, and non-KOSHER additives."
      },
      {
        question: "Do we need KOSHER certification for all products?",
        answer: "KOSHER certification is required for products intended for Jewish consumers. It's essential for accessing Jewish markets and serving Jewish customers."
      },
      {
        question: "How long does KOSHER certification take?",
        answer: "Complete KOSHER certification typically takes 4-6 months, depending on product complexity, ingredient sourcing, and current compliance level."
      },
      {
        question: "Is KOSHER certification mandatory?",
        answer: "KOSHER certification is mandatory for products sold to Jewish consumers and in markets with significant Jewish populations. It's essential for market access and consumer trust."
      }
    ],
    caseStudies: [
      {
        title: "Food Manufacturing KOSHER Certification",
        description: "A major food manufacturing company achieved KOSHER certification, enabling access to Jewish markets and serving Jewish consumers worldwide.",
        industry: "Food Manufacturing",
        results: [
          "Achieved KOSHER certification in 5 months",
          "Gained access to Jewish markets",
          "Enhanced Jewish consumer trust by 90%",
          "Increased sales in Jewish communities by 50%"
        ]
      },
      {
        title: "Restaurant Chain KOSHER Compliance",
        description: "A restaurant chain implemented KOSHER certification to serve Jewish customers and expand to markets with Jewish populations.",
        industry: "Food Service",
        results: [
          "Achieved KOSHER certification",
          "Served Jewish customers confidently",
          "Expanded to Jewish communities",
          "Enhanced customer satisfaction by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 24
  }
];

async function addAdditionalFoodSafetyServices() {
  try {
    console.log('Adding Additional Food Safety GRC Services...');
    
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
    const servicesWithUsers = additionalFoodSafetyServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Additional Food Safety GRC services`);

    console.log('Additional Food Safety GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Additional Food Safety GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addAdditionalFoodSafetyServices();
