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
    title: "CSA STAR: Cloud Security Alliance Security Trust Assurance and Risk Consultation and Certification",
    slug: "csa-star-cloud-security-alliance-security-trust-assurance-risk-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive CSA STAR implementation and certification services to document and validate security controls provided by cloud computing offerings, ensuring transparency and trust in cloud services.",
    detailedDescription: "Our CSA STAR (Security Trust Assurance and Risk) consultation and certification services help cloud service providers and cloud service customers implement comprehensive security frameworks that document and validate security controls in cloud computing environments. The CSA STAR program provides a standardized approach to assessing cloud security capabilities, enabling organizations to make informed decisions about cloud service adoption. Our expert consultants work with your organization to implement CSA STAR controls, conduct security assessments, prepare for STAR certification, and establish ongoing compliance monitoring. We guide you through the entire process from initial assessment to certification, ensuring your cloud services meet the highest security standards while providing transparency to customers and stakeholders about your security capabilities.",
    icon: "⭐",
    features: [
      "CSA STAR control implementation and documentation",
      "Cloud security assessment and gap analysis",
      "Security control mapping and validation",
      "CSA STAR certification preparation",
      "Cloud security governance framework",
      "Third-party security assessment coordination",
      "Security transparency reporting",
      "Cloud risk management implementation",
      "Security monitoring and compliance systems",
      "Customer security assurance programs"
    ],
    benefits: [
      {
        title: "Enhanced Cloud Security Transparency",
        description: "Provide transparent documentation of security controls to customers and stakeholders, building trust and confidence in your cloud services."
      },
      {
        title: "Competitive Advantage",
        description: "Differentiate your cloud services in the market with certified security capabilities and transparent security reporting."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically identify, assess, and mitigate cloud security risks through standardized security controls and assessments."
      },
      {
        title: "Customer Trust",
        description: "Build stronger customer relationships by demonstrating commitment to cloud security best practices and transparency."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet various regulatory requirements for cloud security through comprehensive security control implementation."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline cloud security operations through standardized processes and automated security monitoring."
      }
    ],
    process: [
      {
        step: 1,
        title: "CSA STAR Assessment and Gap Analysis",
        description: "Evaluate current cloud security practices against CSA STAR requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Security Control Implementation",
        description: "Implement CSA STAR security controls, establish security governance, and create comprehensive security documentation.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Security Assessment and Validation",
        description: "Conduct comprehensive security assessments, validate control implementation, and prepare security documentation.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "CSA STAR Documentation",
        description: "Prepare CSA STAR documentation, create security transparency reports, and establish ongoing monitoring processes.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Certification Preparation",
        description: "Prepare for CSA STAR certification, conduct internal audits, and address any identified non-conformities.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification and Ongoing Compliance",
        description: "Support certification process and establish ongoing compliance monitoring and reporting systems.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Cloud service provider or cloud service customer organization",
      "Management commitment to cloud security transparency",
      "Dedicated cloud security team and resources",
      "Access to cloud environments and security configurations",
      "Cooperation from IT, security, and business teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 4-6 months",
      "Documentation of current cloud security practices"
    ],
    deliverables: [
      "Complete CSA STAR documentation package",
      "Cloud security control implementation guide",
      "Security assessment reports and validation",
      "CSA STAR certification preparation package",
      "Security transparency reporting framework",
      "Cloud risk management procedures",
      "Staff training materials and programs",
      "Ongoing compliance monitoring system",
      "CSA STAR certificate upon successful assessment",
      "Customer security assurance documentation"
    ],
    pricing: {
      startingFrom: 150000,
      currency: "INR",
      includes: [
        "Complete CSA STAR implementation support",
        "All security documentation development",
        "Security assessment and validation",
        "Staff training and awareness programs",
        "Certification preparation support",
        "12 months post-certification support"
      ],
      excludes: [
        "CSA STAR certification fees",
        "Third-party assessment costs",
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
    duration: "4-6 months",
    industry: [
      "Cloud Service Providers",
      "Information Technology",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Government",
      "Education",
      "Manufacturing",
      "Telecommunications",
      "Consulting"
    ],
    compliance: [
      "CSA STAR",
      "ISO/IEC 27001:2022",
      "ISO/IEC 27017:2015",
      "SOC 2",
      "GDPR",
      "HIPAA",
      "PCI DSS"
    ],
    faqs: [
      {
        question: "What is the difference between CSA STAR and other cloud security certifications?",
        answer: "CSA STAR focuses specifically on cloud security transparency and provides a standardized way to document and validate cloud security controls, making it easier for customers to assess cloud service security."
      },
      {
        question: "Do we need to be a cloud service provider to implement CSA STAR?",
        answer: "CSA STAR is beneficial for both cloud service providers (to demonstrate security capabilities) and cloud service customers (to assess provider security)."
      },
      {
        question: "How long does CSA STAR certification take?",
        answer: "The complete CSA STAR implementation and certification process typically takes 4-6 months, depending on organization size and current cloud security maturity."
      },
      {
        question: "Is CSA STAR certification mandatory?",
        answer: "CSA STAR certification is not mandatory but provides significant competitive advantages and customer trust benefits for cloud service providers."
      }
    ],
    caseStudies: [
      {
        title: "Cloud Service Provider STAR Certification",
        description: "A leading cloud service provider achieved CSA STAR certification, enhancing customer trust and winning major enterprise contracts.",
        industry: "Cloud Service Providers",
        results: [
          "Achieved CSA STAR certification in 5 months",
          "Increased customer trust scores by 60%",
          "Won 4 new enterprise contracts worth $3M",
          "Reduced security-related customer concerns by 75%"
        ]
      },
      {
        title: "Financial Services Cloud Security Assessment",
        description: "A financial services company used CSA STAR framework to assess cloud providers and ensure regulatory compliance.",
        industry: "Financial Services",
        results: [
          "Successfully assessed 5 cloud providers",
          "Enhanced regulatory compliance by 80%",
          "Reduced cloud security risks by 70%",
          "Improved cloud adoption confidence by 90%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 6
  },
  {
    title: "NIST Implementation: National Institute of Standards and Technology Controls and Guidelines Consultation",
    slug: "nist-implementation-national-institute-standards-technology-controls-guidelines-consultation",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive NIST implementation services to implement controls and guidelines from the National Institute of Standards and Technology, ensuring robust cybersecurity frameworks and compliance.",
    detailedDescription: "Our NIST implementation consultation services help organizations implement comprehensive cybersecurity frameworks based on the National Institute of Standards and Technology (NIST) guidelines and controls. This service covers the implementation of NIST Cybersecurity Framework (CSF), NIST SP 800-53 controls, NIST SP 800-171 requirements, and other relevant NIST publications. Our expert consultants work with your organization to assess current security posture, implement NIST controls, establish security governance, and create comprehensive security documentation. We guide you through the entire implementation process, ensuring your organization meets NIST requirements while building robust cybersecurity capabilities that protect against evolving threats and meet regulatory compliance requirements.",
    icon: "🏛️",
    features: [
      "NIST Cybersecurity Framework implementation",
      "NIST SP 800-53 control implementation",
      "NIST SP 800-171 compliance for federal contractors",
      "Security control assessment and validation",
      "Cybersecurity risk management implementation",
      "Security governance framework establishment",
      "Incident response and recovery planning",
      "Security awareness and training programs",
      "Continuous monitoring and improvement",
      "Compliance documentation and reporting"
    ],
    benefits: [
      {
        title: "Enhanced Cybersecurity Posture",
        description: "Implement comprehensive cybersecurity controls based on industry best practices and federal standards."
      },
      {
        title: "Regulatory Compliance",
        description: "Meet federal and industry regulatory requirements through NIST-compliant security implementations."
      },
      {
        title: "Risk Reduction",
        description: "Systematically identify, assess, and mitigate cybersecurity risks through structured NIST frameworks."
      },
      {
        title: "Federal Contract Eligibility",
        description: "Meet NIST SP 800-171 requirements for federal contractor eligibility and government contracts."
      },
      {
        title: "Operational Resilience",
        description: "Build operational resilience through comprehensive incident response and recovery capabilities."
      },
      {
        title: "Continuous Improvement",
        description: "Establish continuous monitoring and improvement processes for ongoing cybersecurity enhancement."
      }
    ],
    process: [
      {
        step: 1,
        title: "NIST Assessment and Current State Analysis",
        description: "Assess current cybersecurity posture against NIST frameworks, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "NIST Framework Implementation",
        description: "Implement NIST Cybersecurity Framework, establish security governance, and define roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Control Implementation and Validation",
        description: "Implement NIST controls, conduct security assessments, and validate control effectiveness.",
        duration: "6-8 weeks"
      },
      {
        step: 4,
        title: "Incident Response and Recovery",
        description: "Establish incident response procedures, implement recovery capabilities, and conduct security testing.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct security training programs, finalize documentation, and establish monitoring processes.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Continuous Monitoring Setup",
        description: "Establish continuous monitoring systems, implement improvement processes, and prepare for ongoing compliance.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization with cybersecurity requirements",
      "Management commitment to NIST implementation",
      "Dedicated cybersecurity team and resources",
      "Access to IT systems and security configurations",
      "Cooperation from IT, security, and business teams",
      "Budget allocation for implementation and ongoing maintenance",
      "Timeline commitment of 6-9 months",
      "Documentation of current security practices"
    ],
    deliverables: [
      "Complete NIST implementation documentation",
      "Cybersecurity framework implementation guide",
      "Security control assessment reports",
      "Incident response and recovery procedures",
      "Security governance documentation",
      "Staff training materials and programs",
      "Continuous monitoring framework",
      "Compliance reporting templates",
      "NIST compliance validation report",
      "Ongoing maintenance and improvement plan"
    ],
    pricing: {
      startingFrom: 180000,
      currency: "INR",
      includes: [
        "Complete NIST implementation support",
        "All cybersecurity documentation development",
        "Security control implementation and validation",
        "Staff training and awareness programs",
        "Incident response planning",
        "12 months post-implementation support"
      ],
      excludes: [
        "Security tools and software licensing",
        "Third-party assessment costs",
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
    duration: "6-9 months",
    industry: [
      "Government Contractors",
      "Information Technology",
      "Financial Services",
      "Healthcare",
      "Defense",
      "Energy",
      "Manufacturing",
      "Education",
      "Telecommunications",
      "Consulting"
    ],
    compliance: [
      "NIST Cybersecurity Framework",
      "NIST SP 800-53",
      "NIST SP 800-171",
      "FISMA",
      "FedRAMP",
      "CMMC",
      "SOX",
      "HIPAA"
    ],
    faqs: [
      {
        question: "What is the difference between NIST Cybersecurity Framework and NIST SP 800-53?",
        answer: "The NIST Cybersecurity Framework provides high-level guidance for managing cybersecurity risk, while NIST SP 800-53 provides specific security controls for federal information systems."
      },
      {
        question: "Do we need NIST SP 800-171 compliance for all federal contracts?",
        answer: "NIST SP 800-171 compliance is required for federal contractors handling Controlled Unclassified Information (CUI) and is often a prerequisite for government contracts."
      },
      {
        question: "How long does NIST implementation take?",
        answer: "Complete NIST implementation typically takes 6-9 months, depending on organization size, complexity, and current cybersecurity maturity level."
      },
      {
        question: "Is NIST implementation mandatory for private companies?",
        answer: "While not mandatory for private companies, NIST implementation provides significant cybersecurity benefits and may be required for certain contracts or regulations."
      }
    ],
    caseStudies: [
      {
        title: "Federal Contractor NIST SP 800-171 Compliance",
        description: "A defense contractor achieved NIST SP 800-171 compliance, enabling eligibility for federal contracts worth $10M annually.",
        industry: "Defense",
        results: [
          "Achieved NIST SP 800-171 compliance in 7 months",
          "Became eligible for federal contracts",
          "Won 3 new government contracts worth $10M",
          "Enhanced cybersecurity posture by 85%"
        ]
      },
      {
        title: "Healthcare Organization NIST Framework Implementation",
        description: "A healthcare organization implemented NIST Cybersecurity Framework to enhance patient data protection and meet regulatory requirements.",
        industry: "Healthcare",
        results: [
          "Implemented NIST Cybersecurity Framework",
          "Enhanced patient data security by 70%",
          "Met HIPAA compliance requirements",
          "Reduced cybersecurity incidents by 60%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 7
  },
  {
    title: "TISAX: Trusted Information Security Assessment Exchange Consultation and Certification",
    slug: "tisax-trusted-information-security-assessment-exchange-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Specialized TISAX implementation and certification services for the automotive industry, providing security standards based on ISO 27001 to ensure information security in automotive supply chains.",
    detailedDescription: "Our TISAX (Trusted Information Security Assessment Exchange) consultation and certification services help automotive industry organizations implement comprehensive information security management systems based on ISO 27001 standards. TISAX is specifically designed for the automotive industry to ensure information security throughout the supply chain, protecting sensitive automotive data, intellectual property, and customer information. Our expert consultants work with automotive manufacturers, suppliers, and service providers to implement TISAX requirements, establish security governance, and prepare for TISAX assessment. We guide you through the entire process from initial assessment to certification, ensuring your organization meets automotive industry security standards while protecting critical business information and maintaining supply chain security.",
    icon: "🚗",
    features: [
      "TISAX assessment preparation and implementation",
      "Automotive industry security control implementation",
      "Supply chain security management",
      "Information security governance establishment",
      "Intellectual property protection measures",
      "Customer data protection implementation",
      "Third-party security assessment coordination",
      "Security incident response for automotive industry",
      "Compliance monitoring and reporting",
      "TISAX certification support"
    ],
    benefits: [
      {
        title: "Automotive Industry Compliance",
        description: "Meet TISAX requirements for automotive industry participation and supply chain security standards."
      },
      {
        title: "Supply Chain Security",
        description: "Ensure information security throughout the automotive supply chain, protecting sensitive data and intellectual property."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage in automotive industry tenders and contracts requiring TISAX certification."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce information security risks specific to automotive industry operations and data handling."
      },
      {
        title: "Customer Trust",
        description: "Build trust with automotive industry partners and customers through certified security capabilities."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline automotive industry security operations through standardized TISAX processes and controls."
      }
    ],
    process: [
      {
        step: 1,
        title: "TISAX Assessment and Gap Analysis",
        description: "Evaluate current security practices against TISAX requirements, identify gaps specific to automotive industry, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Automotive Security Framework Implementation",
        description: "Implement TISAX security controls, establish automotive industry security governance, and define roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Supply Chain Security Implementation",
        description: "Implement supply chain security measures, establish third-party security requirements, and create security assessment procedures.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Information Protection and Compliance",
        description: "Implement intellectual property protection, customer data security, and automotive industry compliance measures.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct automotive industry security training, finalize TISAX documentation, and prepare for assessment.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "TISAX Assessment and Certification",
        description: "Support TISAX assessment process, address findings, and achieve TISAX certification.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Automotive industry organization (manufacturer, supplier, or service provider)",
      "Management commitment to automotive industry security",
      "Dedicated security team and resources",
      "Access to automotive industry systems and data",
      "Cooperation from IT, security, and business teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-8 months",
      "Documentation of current automotive industry security practices"
    ],
    deliverables: [
      "Complete TISAX implementation documentation",
      "Automotive industry security framework",
      "Supply chain security procedures",
      "Information protection policies and procedures",
      "TISAX assessment preparation package",
      "Staff training materials and programs",
      "Compliance monitoring framework",
      "TISAX certification support documentation",
      "TISAX certificate upon successful assessment",
      "Ongoing compliance maintenance plan"
    ],
    pricing: {
      startingFrom: 200000,
      currency: "INR",
      includes: [
        "Complete TISAX implementation support",
        "All automotive industry security documentation",
        "Supply chain security implementation",
        "Staff training and awareness programs",
        "TISAX assessment preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "TISAX assessment fees",
        "Third-party assessment costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Automotive industry security tools"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "Automotive Manufacturing",
      "Automotive Suppliers",
      "Automotive Service Providers",
      "Automotive Technology",
      "Automotive Parts Manufacturing",
      "Automotive Software",
      "Automotive Consulting",
      "Automotive Testing",
      "Automotive Logistics",
      "Automotive Retail"
    ],
    compliance: [
      "TISAX",
      "ISO/IEC 27001:2022",
      "VDA ISA",
      "GDPR",
      "Automotive Industry Standards",
      "Supply Chain Security Standards"
    ],
    faqs: [
      {
        question: "What is the difference between TISAX and ISO 27001?",
        answer: "TISAX is based on ISO 27001 but specifically tailored for the automotive industry, with additional requirements for supply chain security and automotive-specific information protection."
      },
      {
        question: "Do all automotive suppliers need TISAX certification?",
        answer: "TISAX certification is typically required by automotive manufacturers for their suppliers and service providers to ensure supply chain security."
      },
      {
        question: "How long does TISAX certification take?",
        answer: "The complete TISAX implementation and certification process typically takes 6-8 months, depending on organization size and current security maturity."
      },
      {
        question: "Is TISAX certification valid internationally?",
        answer: "Yes, TISAX certification is recognized internationally within the automotive industry and provides global supply chain security assurance."
      }
    ],
    caseStudies: [
      {
        title: "Automotive Supplier TISAX Certification",
        description: "A major automotive parts supplier achieved TISAX certification, enabling partnerships with leading automotive manufacturers.",
        industry: "Automotive Suppliers",
        results: [
          "Achieved TISAX certification in 7 months",
          "Secured partnerships with 3 major automakers",
          "Increased automotive industry revenue by 40%",
          "Enhanced supply chain security by 80%"
        ]
      },
      {
        title: "Automotive Technology Company Security Implementation",
        description: "An automotive technology company implemented TISAX to protect intellectual property and meet industry security requirements.",
        industry: "Automotive Technology",
        results: [
          "Achieved TISAX certification",
          "Protected critical IP assets",
          "Met automotive industry security standards",
          "Reduced security incidents by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 8
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
