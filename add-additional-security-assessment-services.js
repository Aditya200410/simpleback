const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const additionalSecurityAssessmentServices = [
  {
    title: "Source Code Review: Comprehensive Security Code Analysis and Review",
    slug: "source-code-review-comprehensive-security-code-analysis-review",
    category: "Source Code Review",
    shortDescription: "Comprehensive source code review services to analyze source code for security flaws, vulnerabilities, and coding best practices to ensure secure software development.",
    detailedDescription: "Our Source Code Review services provide comprehensive analysis of source code to identify security flaws, vulnerabilities, and coding best practices violations. This service combines automated static analysis with manual code review to identify security issues, insecure coding practices, and potential vulnerabilities in source code. Our expert security code reviewers work with development teams to analyze source code, identify security weaknesses, and provide detailed remediation guidance. We guide you through the entire code review process, ensuring comprehensive security analysis while providing actionable insights for enhancing your software security posture and secure coding practices.",
    icon: "🔍",
    features: [
      "Comprehensive source code security review",
      "Automated static application security testing (SAST)",
      "Manual code review and analysis",
      "Security vulnerability identification",
      "Insecure coding practice detection",
      "Code quality and security assessment",
      "Security best practices validation",
      "Vulnerability prioritization and risk scoring",
      "Detailed code remediation guidance",
      "Secure coding training and recommendations"
    ],
    benefits: [
      {
        title: "Code Security Assurance",
        description: "Ensure comprehensive security of source code through systematic analysis and identification of security flaws and vulnerabilities."
      },
      {
        title: "Vulnerability Prevention",
        description: "Prevent security vulnerabilities through early identification of insecure coding practices and security flaws in source code."
      },
      {
        title: "Secure Coding Enhancement",
        description: "Enhance secure coding practices through identification of coding best practices violations and security recommendations."
      },
      {
        title: "Development Security Integration",
        description: "Integrate security into the development process through comprehensive code review and secure coding guidance."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce security risks through prioritized vulnerability remediation and secure coding implementation."
      },
      {
        title: "Compliance Support",
        description: "Support security compliance requirements through comprehensive code analysis and documented security review."
      }
    ],
    process: [
      {
        step: 1,
        title: "Code Review Planning and Scope Definition",
        description: "Define code review scope, establish review methodology, and develop comprehensive analysis plan.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Code Analysis and Static Testing",
        description: "Conduct automated static analysis, identify potential security issues, and assess code quality and security.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Manual Code Review and Analysis",
        description: "Perform manual code review, analyze security-critical sections, and identify security vulnerabilities.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Security Vulnerability Assessment",
        description: "Assess identified vulnerabilities, prioritize security issues, and evaluate security impact and risk.",
        duration: "1-2 weeks"
      },
      {
        step: 5,
        title: "Code Remediation Guidance",
        description: "Develop detailed remediation guidance, provide secure coding recommendations, and create improvement plans.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Code Review Report and Training",
        description: "Develop comprehensive code review report, provide secure coding training, and establish ongoing review processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with software development",
      "Management commitment to code security review",
      "Access to source code and development processes",
      "Cooperation from development and security teams",
      "Budget allocation for review and remediation",
      "Timeline commitment of 4-6 weeks",
      "Documentation of current development processes and security practices"
    ],
    deliverables: [
      "Comprehensive source code review report",
      "Security vulnerability assessment findings",
      "Code quality and security analysis",
      "Security best practices recommendations",
      "Detailed code remediation guidance",
      "Secure coding training materials",
      "Code review methodology documentation",
      "Follow-up code review plan",
      "Secure coding improvement roadmap",
      "Ongoing code security monitoring guidance"
    ],
    pricing: {
      startingFrom: 100000,
      currency: "INR",
      includes: [
        "Complete source code security review",
        "All automated and manual code analysis",
        "Security vulnerability identification",
        "Detailed code remediation guidance",
        "Secure coding training materials",
        "12 months post-review support"
      ],
      excludes: [
        "Code review tools and software licenses",
        "Third-party code analysis costs",
        "Travel and accommodation expenses",
        "Additional review beyond standard scope",
        "Code remediation implementation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "4-6 weeks",
    industry: [
      "Technology",
      "Software Development",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Education",
      "Government",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "Secure Coding Standards",
      "Software Security Standards",
      "Code Review Standards",
      "Development Security Standards",
      "Industry Best Practices"
    ],
    faqs: [
      {
        question: "What programming languages do you support for code review?",
        answer: "We support code review for all major programming languages including Java, C#, Python, JavaScript, C/C++, PHP, and others with language-specific security analysis."
      },
      {
        question: "How often should source code review be conducted?",
        answer: "Source code review should be conducted with each major release or during critical development phases, and integrated into the development process."
      },
      {
        question: "How long does source code review take?",
        answer: "Complete source code review typically takes 4-6 weeks, depending on codebase size and complexity."
      },
      {
        question: "Is source code review mandatory?",
        answer: "While not mandatory, source code review is essential for software security assurance and may be required by customers or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Software Company Code Security Review",
        description: "A major software company conducted comprehensive source code review, enhancing software security and development practices.",
        industry: "Software Development",
        results: [
          "Completed code review in 5 weeks",
          "Identified and remediated 25 critical security vulnerabilities",
          "Enhanced code security by 80%",
          "Improved secure coding practices by 75%"
        ]
      },
      {
        title: "Financial Services Code Analysis",
        description: "A financial services company conducted source code review to ensure secure financial software development.",
        industry: "Financial Services",
        results: [
          "Completed code review",
          "Enhanced financial software security by 85%",
          "Improved secure coding practices by 70%",
          "Reduced security vulnerabilities by 80%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 40
  },
  {
    title: "CISF Implementation and Review: Cybersecurity Information Sharing and Forecast Framework",
    slug: "cisf-implementation-review-cybersecurity-information-sharing-forecast-framework",
    category: "Source Code Review",
    shortDescription: "Comprehensive CISF implementation and review services to implement and review controls from the Cybersecurity Information Sharing and Forecast framework for enhanced cybersecurity.",
    detailedDescription: "Our CISF (Cybersecurity Information Sharing and Forecast) Implementation and Review services provide comprehensive implementation and review of controls from the Cybersecurity Information Sharing and Forecast framework. This service covers the complete implementation of CISF controls, including cybersecurity information sharing, threat intelligence integration, security forecasting, and collaborative security management. Our expert CISF consultants work with organizations to implement CISF frameworks, establish information sharing protocols, and prepare for CISF review and validation. We guide you through the entire implementation and review process, ensuring your organization meets CISF requirements while building robust cybersecurity information sharing capabilities.",
    icon: "🛡️",
    features: [
      "CISF framework implementation",
      "Cybersecurity information sharing protocols",
      "Threat intelligence integration",
      "Security forecasting and prediction",
      "Collaborative security management",
      "CISF control implementation",
      "Information sharing governance",
      "Threat intelligence sharing",
      "Security collaboration frameworks",
      "CISF review and validation"
    ],
    benefits: [
      {
        title: "Cybersecurity Collaboration",
        description: "Implement comprehensive cybersecurity information sharing and collaboration frameworks for enhanced security posture."
      },
      {
        title: "Threat Intelligence Integration",
        description: "Integrate threat intelligence sharing and forecasting capabilities for proactive cybersecurity management."
      },
      {
        title: "Security Forecasting",
        description: "Implement security forecasting and prediction capabilities for proactive threat management and risk mitigation."
      },
      {
        title: "Information Sharing Excellence",
        description: "Achieve excellence in cybersecurity information sharing through systematic CISF implementation and governance."
      },
      {
        title: "Collaborative Security",
        description: "Build collaborative security capabilities through CISF framework implementation and information sharing protocols."
      },
      {
        title: "Proactive Cybersecurity",
        description: "Implement proactive cybersecurity management through threat intelligence sharing and security forecasting."
      }
    ],
    process: [
      {
        step: 1,
        title: "CISF Assessment and Planning",
        description: "Assess current cybersecurity information sharing capabilities, plan CISF implementation, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "CISF Framework Implementation",
        description: "Implement CISF framework, establish information sharing protocols, and define roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Threat Intelligence Integration",
        description: "Implement threat intelligence sharing capabilities, establish forecasting systems, and create collaboration frameworks.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Information Sharing Governance",
        description: "Establish information sharing governance, implement security collaboration protocols, and create monitoring systems.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "CISF Review and Validation",
        description: "Conduct CISF review, validate implementation effectiveness, and ensure compliance with CISF requirements.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Training and Continuous Improvement",
        description: "Conduct CISF training, establish continuous improvement processes, and validate implementation effectiveness.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization committed to cybersecurity collaboration",
      "Management commitment to CISF implementation",
      "Dedicated cybersecurity team and resources",
      "Access to cybersecurity data and threat intelligence",
      "Cooperation from cybersecurity and IT teams",
      "Budget allocation for implementation and review",
      "Timeline commitment of 6-9 months",
      "Documentation of current cybersecurity practices and information sharing"
    ],
    deliverables: [
      "Complete CISF implementation documentation",
      "CISF framework and procedures",
      "Cybersecurity information sharing protocols",
      "Threat intelligence integration guide",
      "Security forecasting and prediction systems",
      "Staff training materials and programs",
      "CISF review and validation report",
      "Continuous improvement framework",
      "CISF compliance validation report",
      "Ongoing CISF maintenance plan"
    ],
    pricing: {
      startingFrom: 200000,
      currency: "INR",
      includes: [
        "Complete CISF implementation support",
        "All cybersecurity information sharing documentation",
        "CISF framework implementation",
        "Staff training and awareness programs",
        "CISF review and validation",
        "12 months post-implementation support"
      ],
      excludes: [
        "CISF framework licensing fees",
        "Threat intelligence platform costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "Cybersecurity tools and platforms"
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
      "Healthcare",
      "Government",
      "Technology",
      "Energy",
      "Transportation",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "CISF Framework",
      "Cybersecurity Information Sharing Standards",
      "Threat Intelligence Standards",
      "Cybersecurity Collaboration Standards",
      "Information Security Standards"
    ],
    faqs: [
      {
        question: "What is CISF and why is it important?",
        answer: "CISF (Cybersecurity Information Sharing and Forecast) is a framework for cybersecurity information sharing and threat intelligence collaboration, essential for proactive cybersecurity management."
      },
      {
        question: "How often should CISF implementation be reviewed?",
        answer: "CISF implementation should be reviewed annually or when significant changes occur in cybersecurity threats or information sharing requirements."
      },
      {
        question: "How long does CISF implementation take?",
        answer: "Complete CISF implementation typically takes 6-9 months, depending on organization size and current cybersecurity maturity."
      },
      {
        question: "Is CISF implementation mandatory?",
        answer: "While not mandatory, CISF implementation is essential for cybersecurity collaboration and may be required by industry standards or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services CISF Implementation",
        description: "A major financial services company implemented CISF framework, enhancing cybersecurity collaboration and threat intelligence sharing.",
        industry: "Financial Services",
        results: [
          "Achieved CISF implementation in 8 months",
          "Enhanced cybersecurity collaboration by 80%",
          "Improved threat intelligence sharing by 75%",
          "Strengthened security forecasting by 70%"
        ]
      },
      {
        title: "Government Agency CISF Excellence",
        description: "A government agency implemented CISF to enhance cybersecurity information sharing and collaborative security management.",
        industry: "Government",
        results: [
          "Achieved CISF implementation",
          "Enhanced information sharing by 85%",
          "Improved collaborative security by 80%",
          "Strengthened threat intelligence by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 41
  }
];

async function addAdditionalSecurityAssessmentServices() {
  try {
    console.log('Adding Additional Security Assessment GRC Services...');
    
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
    const servicesWithUsers = additionalSecurityAssessmentServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Additional Security Assessment GRC services`);

    console.log('Additional Security Assessment GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Additional Security Assessment GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addAdditionalSecurityAssessmentServices();
