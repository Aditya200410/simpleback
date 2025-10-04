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
    title: "ISO 27018: Protection of Personally Identifiable Information (PII) in Public Clouds Consultation and Certification",
    slug: "iso-27018-protection-pii-public-clouds-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Specialized ISO 27018 implementation and certification services to protect personally identifiable information in public cloud environments and ensure compliance with international privacy standards.",
    detailedDescription: "Our ISO 27018 consultation and certification services focus specifically on protecting personally identifiable information (PII) in public cloud computing environments. This specialized standard provides guidelines for implementing privacy controls that complement ISO 27002 for cloud service providers handling PII. Our expert consultants help organizations implement comprehensive PII protection measures, establish privacy controls for cloud environments, and ensure compliance with international privacy standards. We guide you through the entire process from initial assessment to certification, ensuring your cloud services meet the highest standards for PII protection while maintaining operational efficiency and regulatory compliance.",
    icon: "🔐",
    features: [
      "PII protection framework implementation",
      "Cloud privacy control establishment",
      "Data processing transparency measures",
      "User consent management systems",
      "PII breach notification procedures",
      "Data portability and deletion controls",
      "Cloud service provider privacy assessment",
      "Privacy monitoring and compliance systems",
      "Staff privacy training programs",
      "Third-party privacy risk management"
    ],
    benefits: [
      {
        title: "Enhanced PII Protection",
        description: "Implement comprehensive controls specifically designed to protect personally identifiable information in cloud environments."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet privacy requirements for GDPR, CCPA, and other international data protection regulations in cloud contexts."
      },
      {
        title: "Customer Trust",
        description: "Build stronger customer relationships by demonstrating commitment to protecting personal information in cloud services."
      },
      {
        title: "Risk Reduction",
        description: "Systematically reduce privacy risks associated with cloud computing and PII processing activities."
      },
      {
        title: "Competitive Advantage",
        description: "Differentiate your cloud services with certified PII protection capabilities."
      },
      {
        title: "Operational Clarity",
        description: "Establish clear processes and responsibilities for PII protection in cloud environments."
      }
    ],
    process: [
      {
        step: 1,
        title: "PII Assessment and Mapping",
        description: "Identify and map all PII processing activities in cloud environments, assess current privacy controls.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Privacy Framework Design",
        description: "Design PII protection framework, establish privacy governance, and define cloud privacy policies.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Privacy Controls Implementation",
        description: "Implement ISO 27018 privacy controls, establish monitoring systems, and configure access management.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Transparency and Consent",
        description: "Implement transparency measures, establish consent management, and create user notification systems.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct privacy training, finalize documentation, and prepare for internal audit.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Internal Audit and Review",
        description: "Conduct internal privacy audits, perform management review, and address non-conformities.",
        duration: "2-3 weeks"
      },
      {
        step: 7,
        title: "Certification Audit",
        description: "Support certification audit process and achieve ISO 27018 certification.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Cloud infrastructure handling PII",
      "Management commitment to PII protection",
      "Dedicated privacy team and resources",
      "Access to cloud environments and PII processing",
      "Cooperation from legal, IT, and business teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-8 months",
      "Documentation of current PII processing activities"
    ],
    deliverables: [
      "Complete PII protection documentation",
      "Cloud privacy policies and procedures",
      "PII processing activity register",
      "Privacy impact assessment framework",
      "User consent management system",
      "PII breach notification procedures",
      "Staff training materials and programs",
      "Internal audit program and reports",
      "Certification audit preparation package",
      "ISO 27018 certificate upon successful audit"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete ISO 27018 implementation support",
        "All PII protection documentation",
        "Privacy impact assessment framework",
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
        "Privacy management software"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "Cloud Service Providers",
      "Information Technology",
      "Healthcare",
      "Financial Services",
      "E-commerce",
      "Government",
      "Education",
      "Telecommunications",
      "Consulting",
      "Marketing and Advertising"
    ],
    compliance: [
      "ISO/IEC 27018:2019",
      "ISO/IEC 27017:2015",
      "GDPR",
      "CCPA",
      "PIPEDA",
      "DPDP Act",
      "LGPD"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 27018 and ISO 27017?",
        answer: "ISO 27018 focuses specifically on protecting PII in public clouds, while ISO 27017 covers general cloud security controls. ISO 27018 extends ISO 27017 with privacy-specific requirements."
      },
      {
        question: "Do we need ISO 27017 before implementing ISO 27018?",
        answer: "ISO 27018 extends ISO 27017, so you need either an existing ISO 27017 implementation or implement both standards together for comprehensive cloud privacy protection."
      },
      {
        question: "Is ISO 27018 applicable to private clouds?",
        answer: "ISO 27018 is specifically designed for public cloud environments, but many of its principles can be adapted for private cloud implementations."
      },
      {
        question: "How does ISO 27018 help with GDPR compliance?",
        answer: "ISO 27018 provides specific guidance for implementing GDPR requirements in cloud environments, including data processing transparency and user rights management."
      }
    ],
    caseStudies: [
      {
        title: "Cloud Service Provider PII Protection",
        description: "A leading cloud service provider achieved ISO 27018 certification, enhancing customer trust and enabling expansion into privacy-sensitive markets.",
        industry: "Cloud Service Providers",
        results: [
          "Achieved ISO 27018 certification in 6 months",
          "Increased customer trust scores by 50%",
          "Expanded into European markets",
          "Reduced privacy-related customer complaints by 80%"
        ]
      },
      {
        title: "Healthcare Cloud PII Compliance",
        description: "A healthcare cloud platform achieved ISO 27018 certification while maintaining HIPAA compliance for patient data protection.",
        industry: "Healthcare",
        results: [
          "Achieved ISO 27018 certification",
          "Enhanced HIPAA compliance in cloud",
          "Improved patient data security by 70%",
          "Reduced privacy audit findings by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 4
  },
  {
    title: "ISO 20000-1: IT Service Management (ITSM) Consultation and Certification",
    slug: "iso-20000-1-it-service-management-itsm-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 20000-1 ITSM implementation and certification services to establish world-class IT service management systems that improve service quality and operational efficiency.",
    detailedDescription: "Our ISO 20000-1 IT Service Management (ITSM) consultation and certification services help organizations implement comprehensive service management systems that align with international best practices. This service covers the complete implementation of IT service management processes, service delivery frameworks, and continuous improvement mechanisms. Our expert ITSM consultants work with your organization to establish service management governance, implement ITIL-aligned processes, develop service level agreements, and create robust incident and problem management systems. We guide you through the entire certification process, ensuring your IT service management system meets the highest international standards while delivering measurable improvements in service quality, customer satisfaction, and operational efficiency.",
    icon: "⚙️",
    features: [
      "ITSM framework implementation",
      "Service management process establishment",
      "Service level management system",
      "Incident and problem management",
      "Change and release management",
      "Service continuity and availability management",
      "Capacity and performance management",
      "Service reporting and analytics",
      "Customer satisfaction management",
      "Continuous improvement framework"
    ],
    benefits: [
      {
        title: "Improved Service Quality",
        description: "Implement systematic approach to IT service delivery, resulting in higher service quality and customer satisfaction."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline IT operations through standardized processes, reducing service disruptions and improving response times."
      },
      {
        title: "Cost Optimization",
        description: "Optimize IT service costs through better resource management, capacity planning, and service level optimization."
      },
      {
        title: "Risk Reduction",
        description: "Reduce IT service risks through robust incident management, change control, and service continuity planning."
      },
      {
        title: "Customer Satisfaction",
        description: "Enhance customer satisfaction through improved service delivery, better communication, and proactive service management."
      },
      {
        title: "Competitive Advantage",
        description: "Demonstrate IT service excellence to customers and stakeholders, gaining competitive advantage in the market."
      }
    ],
    process: [
      {
        step: 1,
        title: "ITSM Assessment and Gap Analysis",
        description: "Evaluate current IT service management practices, identify gaps against ISO 20000-1 requirements, and assess service maturity.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Service Management Framework Design",
        description: "Design ITSM framework, establish service management governance, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Process Implementation",
        description: "Implement core ITSM processes including incident, problem, change, and service level management.",
        duration: "6-8 weeks"
      },
      {
        step: 4,
        title: "Service Level Management",
        description: "Establish service level agreements, implement service reporting, and create customer satisfaction measurement systems.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct ITSM training programs, finalize documentation, and establish continuous improvement processes.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Internal Audit and Review",
        description: "Conduct internal ITSM audits, perform management review, and address any identified non-conformities.",
        duration: "2-3 weeks"
      },
      {
        step: 7,
        title: "Certification Audit",
        description: "Support certification audit process and achieve ISO 20000-1 certification.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "IT service delivery organization",
      "Management commitment to service excellence",
      "Dedicated ITSM team and resources",
      "Access to IT service processes and systems",
      "Cooperation from IT, business, and customer teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 8-12 months",
      "Documentation of current IT service practices"
    ],
    deliverables: [
      "Complete ITSM documentation package",
      "Service management policies and procedures",
      "Service level agreements and reporting",
      "Incident and problem management procedures",
      "Change and release management processes",
      "Service continuity and availability plans",
      "Staff training materials and programs",
      "Internal audit program and reports",
      "Certification audit preparation package",
      "ISO 20000-1 certificate upon successful audit"
    ],
    pricing: {
      startingFrom: 220000,
      currency: "INR",
      includes: [
        "Complete ISO 20000-1 implementation support",
        "All ITSM documentation development",
        "Service management process implementation",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "ITSM tool licensing costs",
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
    duration: "8-12 months",
    industry: [
      "Information Technology",
      "Telecommunications",
      "Financial Services",
      "Healthcare",
      "Government",
      "Education",
      "Manufacturing",
      "Retail",
      "Consulting",
      "Media and Entertainment"
    ],
    compliance: [
      "ISO/IEC 20000-1:2018",
      "ITIL 4",
      "COBIT",
      "ISO/IEC 27001:2022",
      "SOX",
      "PCI DSS"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 20000-1 and ITIL?",
        answer: "ISO 20000-1 is a certification standard for IT service management systems, while ITIL provides best practice guidance. ISO 20000-1 certification demonstrates compliance with international standards."
      },
      {
        question: "How long does ISO 20000-1 certification take?",
        answer: "The complete ISO 20000-1 implementation and certification process typically takes 8-12 months, depending on organization size and current service management maturity."
      },
      {
        question: "Do we need ITIL knowledge before implementing ISO 20000-1?",
        answer: "While ITIL knowledge is helpful, our consultants will guide you through the implementation process and provide necessary training on ITSM best practices."
      },
      {
        question: "What is the validity period of ISO 20000-1 certification?",
        answer: "ISO 20000-1 certification is valid for 3 years with annual surveillance audits required to maintain certification status."
      }
    ],
    caseStudies: [
      {
        title: "IT Service Provider Excellence Achievement",
        description: "A managed IT service provider achieved ISO 20000-1 certification, improving service quality and winning major enterprise contracts.",
        industry: "Information Technology",
        results: [
          "Achieved ISO 20000-1 certification in 10 months",
          "Improved service availability to 99.9%",
          "Reduced incident resolution time by 50%",
          "Won 5 new enterprise contracts worth $5M"
        ]
      },
      {
        title: "Financial Services ITSM Implementation",
        description: "A financial services company implemented ISO 20000-1 to improve IT service delivery and meet regulatory requirements.",
        industry: "Financial Services",
        results: [
          "Achieved ISO 20000-1 certification",
          "Enhanced IT service reliability by 40%",
          "Improved customer satisfaction scores by 35%",
          "Reduced IT service costs by 25%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 5
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
