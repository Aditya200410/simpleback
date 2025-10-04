const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const securityAssessmentTestingServices = [
  {
    title: "VAPT: On-premises Infrastructure Vulnerability Assessment & Penetration Testing",
    slug: "vapt-on-premises-infrastructure-vulnerability-assessment-penetration-testing",
    category: " VAPT (Vulnerability Assessment & Penetration Testing)",
    shortDescription: "Comprehensive VAPT services for on-premises infrastructure to identify vulnerabilities, assess security posture, and provide remediation guidance for enhanced security.",
    detailedDescription: "Our On-premises Infrastructure VAPT (Vulnerability Assessment & Penetration Testing) services provide comprehensive security testing of your on-premises infrastructure including servers, network devices, databases, and internal systems. This service combines automated vulnerability scanning with manual penetration testing to identify security weaknesses, misconfigurations, and potential attack vectors. Our expert security consultants work with organizations to assess their on-premises infrastructure security, identify vulnerabilities, and provide detailed remediation guidance. We guide you through the entire VAPT process, ensuring comprehensive security assessment while providing actionable insights for enhancing your infrastructure security posture.",
    icon: "🏢",
    features: [
      "Comprehensive on-premises infrastructure VAPT",
      "Network vulnerability assessment",
      "Server and system penetration testing",
      "Database security assessment",
      "Internal network security testing",
      "Infrastructure misconfiguration analysis",
      "Security control effectiveness testing",
      "Vulnerability prioritization and risk scoring",
      "Detailed remediation guidance",
      "Security posture improvement recommendations"
    ],
    benefits: [
      {
        title: "Infrastructure Security Assurance",
        description: "Ensure comprehensive security of on-premises infrastructure through systematic vulnerability assessment and penetration testing."
      },
      {
        title: "Vulnerability Identification",
        description: "Identify security vulnerabilities, misconfigurations, and potential attack vectors in your on-premises infrastructure."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce security risks through prioritized vulnerability remediation and security control implementation."
      },
      {
        title: "Compliance Support",
        description: "Support compliance requirements through comprehensive security assessment and documented security testing."
      },
      {
        title: "Security Posture Enhancement",
        description: "Enhance overall security posture through systematic security assessment and continuous improvement recommendations."
      },
      {
        title: "Incident Prevention",
        description: "Prevent security incidents through proactive vulnerability identification and remediation."
      }
    ],
    process: [
      {
        step: 1,
        title: "VAPT Planning and Scope Definition",
        description: "Define VAPT scope, establish testing methodology, and develop comprehensive assessment plan.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Infrastructure Discovery and Reconnaissance",
        description: "Discover infrastructure components, map network topology, and identify potential attack surfaces.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Vulnerability Assessment and Scanning",
        description: "Conduct automated vulnerability scanning, identify security weaknesses, and assess vulnerability severity.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Penetration Testing and Exploitation",
        description: "Perform manual penetration testing, attempt exploitation of vulnerabilities, and validate security controls.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Risk Analysis and Prioritization",
        description: "Analyze findings, prioritize vulnerabilities by risk level, and develop remediation recommendations.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Report Development and Remediation Guidance",
        description: "Develop comprehensive VAPT report, provide detailed remediation guidance, and establish follow-up processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with on-premises infrastructure",
      "Management commitment to security assessment",
      "Access to infrastructure systems and networks",
      "Cooperation from IT and security teams",
      "Budget allocation for assessment and remediation",
      "Timeline commitment of 6-8 weeks",
      "Documentation of current infrastructure and security controls"
    ],
    deliverables: [
      "Comprehensive VAPT assessment report",
      "Vulnerability assessment findings",
      "Penetration testing results",
      "Risk analysis and prioritization",
      "Detailed remediation guidance",
      "Security control recommendations",
      "VAPT methodology documentation",
      "Follow-up testing plan",
      "Security improvement roadmap",
      "Ongoing security monitoring guidance"
    ],
    pricing: {
      startingFrom: 150000,
      currency: "INR",
      includes: [
        "Complete on-premises infrastructure VAPT",
        "All vulnerability assessment and testing",
        "Penetration testing and exploitation",
        "Detailed remediation guidance",
        "VAPT report development",
        "12 months post-assessment support"
      ],
      excludes: [
        "VAPT tools and software licenses",
        "Third-party security testing costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "Vulnerability remediation implementation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 weeks",
    industry: [
      "All Industries",
      "Financial Services",
      "Healthcare",
      "Manufacturing",
      "Technology",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "Security Assessment Standards",
      "Penetration Testing Standards",
      "Vulnerability Management Standards",
      "Regulatory Requirements",
      "Industry Best Practices"
    ],
    faqs: [
      {
        question: "What is the difference between vulnerability assessment and penetration testing?",
        answer: "Vulnerability assessment identifies potential security weaknesses, while penetration testing attempts to exploit those weaknesses to validate their impact and security control effectiveness."
      },
      {
        question: "How often should on-premises infrastructure VAPT be conducted?",
        answer: "On-premises infrastructure VAPT should be conducted annually or when significant changes occur in infrastructure or security controls."
      },
      {
        question: "How long does on-premises infrastructure VAPT take?",
        answer: "Complete on-premises infrastructure VAPT typically takes 6-8 weeks, depending on infrastructure size and complexity."
      },
      {
        question: "Is on-premises infrastructure VAPT mandatory?",
        answer: "While not mandatory, on-premises infrastructure VAPT is essential for security assurance and may be required by regulations or business partners."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services Infrastructure VAPT",
        description: "A major financial services company conducted comprehensive on-premises infrastructure VAPT, enhancing security posture and compliance.",
        industry: "Financial Services",
        results: [
          "Completed infrastructure VAPT in 7 weeks",
          "Identified and remediated 45 critical vulnerabilities",
          "Enhanced security posture by 80%",
          "Improved compliance by 75%"
        ]
      },
      {
        title: "Healthcare Infrastructure Security Assessment",
        description: "A healthcare organization conducted on-premises infrastructure VAPT to ensure patient data security and regulatory compliance.",
        industry: "Healthcare",
        results: [
          "Completed infrastructure VAPT",
          "Enhanced patient data security by 85%",
          "Improved regulatory compliance by 70%",
          "Reduced security risks by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 35
  },
  {
    title: "VAPT: Cloud Infrastructure Vulnerability Assessment & Penetration Testing",
    slug: "vapt-cloud-infrastructure-vulnerability-assessment-penetration-testing",
    category: " VAPT (Vulnerability Assessment & Penetration Testing)",
    shortDescription: "Comprehensive VAPT services for cloud infrastructure to identify vulnerabilities, assess cloud security posture, and provide remediation guidance for enhanced cloud security.",
    detailedDescription: "Our Cloud Infrastructure VAPT (Vulnerability Assessment & Penetration Testing) services provide comprehensive security testing of your cloud infrastructure including cloud servers, containers, serverless functions, and cloud-native services. This service combines cloud-specific vulnerability scanning with manual penetration testing to identify security weaknesses, misconfigurations, and potential attack vectors in cloud environments. Our expert cloud security consultants work with organizations to assess their cloud infrastructure security, identify vulnerabilities, and provide detailed remediation guidance. We guide you through the entire cloud VAPT process, ensuring comprehensive security assessment while providing actionable insights for enhancing your cloud security posture.",
    icon: "☁️",
    features: [
      "Comprehensive cloud infrastructure VAPT",
      "Cloud platform security assessment",
      "Container and Kubernetes security testing",
      "Serverless function security assessment",
      "Cloud-native service security testing",
      "Cloud misconfiguration analysis",
      "Cloud security control effectiveness testing",
      "Cloud vulnerability prioritization and risk scoring",
      "Detailed cloud remediation guidance",
      "Cloud security posture improvement recommendations"
    ],
    benefits: [
      {
        title: "Cloud Security Assurance",
        description: "Ensure comprehensive security of cloud infrastructure through systematic vulnerability assessment and penetration testing."
      },
      {
        title: "Cloud Vulnerability Identification",
        description: "Identify security vulnerabilities, misconfigurations, and potential attack vectors in your cloud infrastructure."
      },
      {
        title: "Cloud Risk Mitigation",
        description: "Systematically reduce cloud security risks through prioritized vulnerability remediation and security control implementation."
      },
      {
        title: "Cloud Compliance Support",
        description: "Support cloud compliance requirements through comprehensive security assessment and documented security testing."
      },
      {
        title: "Cloud Security Posture Enhancement",
        description: "Enhance overall cloud security posture through systematic security assessment and continuous improvement recommendations."
      },
      {
        title: "Cloud Incident Prevention",
        description: "Prevent cloud security incidents through proactive vulnerability identification and remediation."
      }
    ],
    process: [
      {
        step: 1,
        title: "Cloud VAPT Planning and Scope Definition",
        description: "Define cloud VAPT scope, establish cloud-specific testing methodology, and develop comprehensive assessment plan.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Cloud Infrastructure Discovery and Reconnaissance",
        description: "Discover cloud infrastructure components, map cloud architecture, and identify potential attack surfaces.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Cloud Vulnerability Assessment and Scanning",
        description: "Conduct cloud-specific vulnerability scanning, identify security weaknesses, and assess vulnerability severity.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Cloud Penetration Testing and Exploitation",
        description: "Perform cloud-specific penetration testing, attempt exploitation of vulnerabilities, and validate cloud security controls.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Cloud Risk Analysis and Prioritization",
        description: "Analyze cloud findings, prioritize vulnerabilities by risk level, and develop cloud remediation recommendations.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Cloud Report Development and Remediation Guidance",
        description: "Develop comprehensive cloud VAPT report, provide detailed remediation guidance, and establish follow-up processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with cloud infrastructure",
      "Management commitment to cloud security assessment",
      "Access to cloud infrastructure and services",
      "Cooperation from cloud and security teams",
      "Budget allocation for assessment and remediation",
      "Timeline commitment of 6-8 weeks",
      "Documentation of current cloud infrastructure and security controls"
    ],
    deliverables: [
      "Comprehensive cloud VAPT assessment report",
      "Cloud vulnerability assessment findings",
      "Cloud penetration testing results",
      "Cloud risk analysis and prioritization",
      "Detailed cloud remediation guidance",
      "Cloud security control recommendations",
      "Cloud VAPT methodology documentation",
      "Follow-up cloud testing plan",
      "Cloud security improvement roadmap",
      "Ongoing cloud security monitoring guidance"
    ],
    pricing: {
      startingFrom: 160000,
      currency: "INR",
      includes: [
        "Complete cloud infrastructure VAPT",
        "All cloud vulnerability assessment and testing",
        "Cloud penetration testing and exploitation",
        "Detailed cloud remediation guidance",
        "Cloud VAPT report development",
        "12 months post-assessment support"
      ],
      excludes: [
        "Cloud VAPT tools and software licenses",
        "Third-party cloud security testing costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "Cloud vulnerability remediation implementation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 weeks",
    industry: [
      "All Industries",
      "Technology",
      "Financial Services",
      "Healthcare",
      "Manufacturing",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "Cloud Security Standards",
      "Cloud Penetration Testing Standards",
      "Cloud Vulnerability Management Standards",
      "Cloud Regulatory Requirements",
      "Cloud Industry Best Practices"
    ],
    faqs: [
      {
        question: "What cloud platforms do you support for VAPT?",
        answer: "We support VAPT for all major cloud platforms including AWS, Azure, Google Cloud, and other cloud providers with cloud-specific security testing methodologies."
      },
      {
        question: "How often should cloud infrastructure VAPT be conducted?",
        answer: "Cloud infrastructure VAPT should be conducted annually or when significant changes occur in cloud infrastructure or security controls."
      },
      {
        question: "How long does cloud infrastructure VAPT take?",
        answer: "Complete cloud infrastructure VAPT typically takes 6-8 weeks, depending on cloud infrastructure size and complexity."
      },
      {
        question: "Is cloud infrastructure VAPT mandatory?",
        answer: "While not mandatory, cloud infrastructure VAPT is essential for cloud security assurance and may be required by regulations or business partners."
      }
    ],
    caseStudies: [
      {
        title: "Technology Company Cloud VAPT",
        description: "A major technology company conducted comprehensive cloud infrastructure VAPT, enhancing cloud security posture and compliance.",
        industry: "Technology",
        results: [
          "Completed cloud infrastructure VAPT in 7 weeks",
          "Identified and remediated 38 critical cloud vulnerabilities",
          "Enhanced cloud security posture by 85%",
          "Improved cloud compliance by 80%"
        ]
      },
      {
        title: "Financial Services Cloud Security Assessment",
        description: "A financial services company conducted cloud infrastructure VAPT to ensure cloud security and regulatory compliance.",
        industry: "Financial Services",
        results: [
          "Completed cloud infrastructure VAPT",
          "Enhanced cloud security by 90%",
          "Improved cloud compliance by 75%",
          "Reduced cloud security risks by 80%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 36
  },
  {
    title: "VAPT: Mobile Application Vulnerability Assessment & Penetration Testing (Android & iOS)",
    slug: "vapt-mobile-application-vulnerability-assessment-penetration-testing-android-ios",
    category: " VAPT (Vulnerability Assessment & Penetration Testing)",
    shortDescription: "Comprehensive VAPT services for mobile applications (Android & iOS) to identify vulnerabilities, assess mobile security posture, and provide remediation guidance.",
    detailedDescription: "Our Mobile Application VAPT (Vulnerability Assessment & Penetration Testing) services provide comprehensive security testing of mobile applications for both Android and iOS platforms. This service combines static and dynamic analysis with manual penetration testing to identify security vulnerabilities, insecure coding practices, and potential attack vectors in mobile applications. Our expert mobile security consultants work with organizations to assess their mobile application security, identify vulnerabilities, and provide detailed remediation guidance. We guide you through the entire mobile VAPT process, ensuring comprehensive security assessment while providing actionable insights for enhancing your mobile application security posture.",
    icon: "📱",
    features: [
      "Comprehensive mobile application VAPT",
      "Android application security assessment",
      "iOS application security assessment",
      "Static application security testing (SAST)",
      "Dynamic application security testing (DAST)",
      "Mobile application penetration testing",
      "Mobile security vulnerability analysis",
      "Mobile app misconfiguration assessment",
      "Mobile security control effectiveness testing",
      "Detailed mobile remediation guidance"
    ],
    benefits: [
      {
        title: "Mobile Security Assurance",
        description: "Ensure comprehensive security of mobile applications through systematic vulnerability assessment and penetration testing."
      },
      {
        title: "Mobile Vulnerability Identification",
        description: "Identify security vulnerabilities, insecure coding practices, and potential attack vectors in mobile applications."
      },
      {
        title: "Mobile Risk Mitigation",
        description: "Systematically reduce mobile security risks through prioritized vulnerability remediation and security control implementation."
      },
      {
        title: "Mobile Compliance Support",
        description: "Support mobile compliance requirements through comprehensive security assessment and documented security testing."
      },
      {
        title: "Mobile Security Posture Enhancement",
        description: "Enhance overall mobile security posture through systematic security assessment and continuous improvement recommendations."
      },
      {
        title: "Mobile Incident Prevention",
        description: "Prevent mobile security incidents through proactive vulnerability identification and remediation."
      }
    ],
    process: [
      {
        step: 1,
        title: "Mobile VAPT Planning and Scope Definition",
        description: "Define mobile VAPT scope, establish mobile-specific testing methodology, and develop comprehensive assessment plan.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Mobile Application Analysis and Reconnaissance",
        description: "Analyze mobile application architecture, identify attack surfaces, and assess mobile security controls.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Mobile Vulnerability Assessment and Scanning",
        description: "Conduct mobile-specific vulnerability scanning, identify security weaknesses, and assess vulnerability severity.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Mobile Penetration Testing and Exploitation",
        description: "Perform mobile-specific penetration testing, attempt exploitation of vulnerabilities, and validate mobile security controls.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Mobile Risk Analysis and Prioritization",
        description: "Analyze mobile findings, prioritize vulnerabilities by risk level, and develop mobile remediation recommendations.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Mobile Report Development and Remediation Guidance",
        description: "Develop comprehensive mobile VAPT report, provide detailed remediation guidance, and establish follow-up processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with mobile applications",
      "Management commitment to mobile security assessment",
      "Access to mobile applications and source code",
      "Cooperation from mobile development and security teams",
      "Budget allocation for assessment and remediation",
      "Timeline commitment of 6-8 weeks",
      "Documentation of current mobile applications and security controls"
    ],
    deliverables: [
      "Comprehensive mobile VAPT assessment report",
      "Mobile vulnerability assessment findings",
      "Mobile penetration testing results",
      "Mobile risk analysis and prioritization",
      "Detailed mobile remediation guidance",
      "Mobile security control recommendations",
      "Mobile VAPT methodology documentation",
      "Follow-up mobile testing plan",
      "Mobile security improvement roadmap",
      "Ongoing mobile security monitoring guidance"
    ],
    pricing: {
      startingFrom: 140000,
      currency: "INR",
      includes: [
        "Complete mobile application VAPT",
        "All mobile vulnerability assessment and testing",
        "Mobile penetration testing and exploitation",
        "Detailed mobile remediation guidance",
        "Mobile VAPT report development",
        "12 months post-assessment support"
      ],
      excludes: [
        "Mobile VAPT tools and software licenses",
        "Third-party mobile security testing costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "Mobile vulnerability remediation implementation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 weeks",
    industry: [
      "Technology",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Education",
      "Government",
      "Consulting",
      "Non-Profit",
      "Entertainment"
    ],
    compliance: [
      "Mobile Security Standards",
      "Mobile Penetration Testing Standards",
      "Mobile Vulnerability Management Standards",
      "Mobile Regulatory Requirements",
      "Mobile Industry Best Practices"
    ],
    faqs: [
      {
        question: "What mobile platforms do you support for VAPT?",
        answer: "We support VAPT for both Android and iOS platforms with platform-specific security testing methodologies and tools."
      },
      {
        question: "How often should mobile application VAPT be conducted?",
        answer: "Mobile application VAPT should be conducted with each major release or annually, whichever comes first."
      },
      {
        question: "How long does mobile application VAPT take?",
        answer: "Complete mobile application VAPT typically takes 6-8 weeks, depending on application complexity and platform coverage."
      },
      {
        question: "Is mobile application VAPT mandatory?",
        answer: "While not mandatory, mobile application VAPT is essential for mobile security assurance and may be required by app stores or business partners."
      }
    ],
    caseStudies: [
      {
        title: "E-commerce Mobile App VAPT",
        description: "A major e-commerce company conducted comprehensive mobile application VAPT, enhancing mobile security and user trust.",
        industry: "E-commerce",
        results: [
          "Completed mobile app VAPT in 7 weeks",
          "Identified and remediated 32 critical mobile vulnerabilities",
          "Enhanced mobile security by 85%",
          "Improved user trust by 70%"
        ]
      },
      {
        title: "Financial Services Mobile Security Assessment",
        description: "A financial services company conducted mobile application VAPT to ensure mobile banking security and regulatory compliance.",
        industry: "Financial Services",
        results: [
          "Completed mobile app VAPT",
          "Enhanced mobile banking security by 90%",
          "Improved mobile compliance by 80%",
          "Reduced mobile security risks by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 37
  },
  {
    title: "VAPT: Web Application Vulnerability Assessment & Penetration Testing",
    slug: "vapt-web-application-vulnerability-assessment-penetration-testing",
    category: " VAPT (Vulnerability Assessment & Penetration Testing)",
    shortDescription: "Comprehensive VAPT services for web applications to identify vulnerabilities, assess web security posture, and provide remediation guidance for enhanced web security.",
    detailedDescription: "Our Web Application VAPT (Vulnerability Assessment & Penetration Testing) services provide comprehensive security testing of web applications including web services, APIs, and web-based systems. This service combines automated vulnerability scanning with manual penetration testing to identify security weaknesses, OWASP Top 10 vulnerabilities, and potential attack vectors in web applications. Our expert web security consultants work with organizations to assess their web application security, identify vulnerabilities, and provide detailed remediation guidance. We guide you through the entire web VAPT process, ensuring comprehensive security assessment while providing actionable insights for enhancing your web application security posture.",
    icon: "🌐",
    features: [
      "Comprehensive web application VAPT",
      "OWASP Top 10 vulnerability assessment",
      "Web application penetration testing",
      "API security assessment",
      "Web service security testing",
      "Web application misconfiguration analysis",
      "Web security control effectiveness testing",
      "Web vulnerability prioritization and risk scoring",
      "Detailed web remediation guidance",
      "Web security posture improvement recommendations"
    ],
    benefits: [
      {
        title: "Web Security Assurance",
        description: "Ensure comprehensive security of web applications through systematic vulnerability assessment and penetration testing."
      },
      {
        title: "Web Vulnerability Identification",
        description: "Identify security vulnerabilities, OWASP Top 10 issues, and potential attack vectors in web applications."
      },
      {
        title: "Web Risk Mitigation",
        description: "Systematically reduce web security risks through prioritized vulnerability remediation and security control implementation."
      },
      {
        title: "Web Compliance Support",
        description: "Support web compliance requirements through comprehensive security assessment and documented security testing."
      },
      {
        title: "Web Security Posture Enhancement",
        description: "Enhance overall web security posture through systematic security assessment and continuous improvement recommendations."
      },
      {
        title: "Web Incident Prevention",
        description: "Prevent web security incidents through proactive vulnerability identification and remediation."
      }
    ],
    process: [
      {
        step: 1,
        title: "Web VAPT Planning and Scope Definition",
        description: "Define web VAPT scope, establish web-specific testing methodology, and develop comprehensive assessment plan.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Web Application Analysis and Reconnaissance",
        description: "Analyze web application architecture, identify attack surfaces, and assess web security controls.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Web Vulnerability Assessment and Scanning",
        description: "Conduct web-specific vulnerability scanning, identify security weaknesses, and assess vulnerability severity.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Web Penetration Testing and Exploitation",
        description: "Perform web-specific penetration testing, attempt exploitation of vulnerabilities, and validate web security controls.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Web Risk Analysis and Prioritization",
        description: "Analyze web findings, prioritize vulnerabilities by risk level, and develop web remediation recommendations.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "Web Report Development and Remediation Guidance",
        description: "Develop comprehensive web VAPT report, provide detailed remediation guidance, and establish follow-up processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with web applications",
      "Management commitment to web security assessment",
      "Access to web applications and systems",
      "Cooperation from web development and security teams",
      "Budget allocation for assessment and remediation",
      "Timeline commitment of 6-8 weeks",
      "Documentation of current web applications and security controls"
    ],
    deliverables: [
      "Comprehensive web VAPT assessment report",
      "Web vulnerability assessment findings",
      "Web penetration testing results",
      "Web risk analysis and prioritization",
      "Detailed web remediation guidance",
      "Web security control recommendations",
      "Web VAPT methodology documentation",
      "Follow-up web testing plan",
      "Web security improvement roadmap",
      "Ongoing web security monitoring guidance"
    ],
    pricing: {
      startingFrom: 130000,
      currency: "INR",
      includes: [
        "Complete web application VAPT",
        "All web vulnerability assessment and testing",
        "Web penetration testing and exploitation",
        "Detailed web remediation guidance",
        "Web VAPT report development",
        "12 months post-assessment support"
      ],
      excludes: [
        "Web VAPT tools and software licenses",
        "Third-party web security testing costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "Web vulnerability remediation implementation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 weeks",
    industry: [
      "All Industries",
      "Technology",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Education",
      "Government",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "Web Security Standards",
      "OWASP Standards",
      "Web Penetration Testing Standards",
      "Web Vulnerability Management Standards",
      "Web Regulatory Requirements"
    ],
    faqs: [
      {
        question: "What web application vulnerabilities do you test for?",
        answer: "We test for OWASP Top 10 vulnerabilities including injection flaws, broken authentication, sensitive data exposure, and other common web security issues."
      },
      {
        question: "How often should web application VAPT be conducted?",
        answer: "Web application VAPT should be conducted with each major release or annually, whichever comes first."
      },
      {
        question: "How long does web application VAPT take?",
        answer: "Complete web application VAPT typically takes 6-8 weeks, depending on application complexity and functionality."
      },
      {
        question: "Is web application VAPT mandatory?",
        answer: "While not mandatory, web application VAPT is essential for web security assurance and may be required by regulations or business partners."
      }
    ],
    caseStudies: [
      {
        title: "E-commerce Web App VAPT",
        description: "A major e-commerce company conducted comprehensive web application VAPT, enhancing web security and customer trust.",
        industry: "E-commerce",
        results: [
          "Completed web app VAPT in 7 weeks",
          "Identified and remediated 28 critical web vulnerabilities",
          "Enhanced web security by 80%",
          "Improved customer trust by 65%"
        ]
      },
      {
        title: "Healthcare Web Application Security Assessment",
        description: "A healthcare organization conducted web application VAPT to ensure patient data security and regulatory compliance.",
        industry: "Healthcare",
        results: [
          "Completed web app VAPT",
          "Enhanced patient data security by 85%",
          "Improved web compliance by 75%",
          "Reduced web security risks by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 38
  },
  {
    title: "VAPT: SaaS Application Vulnerability Assessment & Penetration Testing",
    slug: "vapt-saas-application-vulnerability-assessment-penetration-testing",
    category: " VAPT (Vulnerability Assessment & Penetration Testing)",
    shortDescription: "Comprehensive VAPT services for SaaS applications to identify vulnerabilities, assess SaaS security posture, and provide remediation guidance for enhanced SaaS security.",
    detailedDescription: "Our SaaS Application VAPT (Vulnerability Assessment & Penetration Testing) services provide comprehensive security testing of Software-as-a-Service (SaaS) applications including multi-tenant systems, cloud-based applications, and SaaS platforms. This service combines SaaS-specific vulnerability scanning with manual penetration testing to identify security weaknesses, tenant isolation issues, and potential attack vectors in SaaS applications. Our expert SaaS security consultants work with organizations to assess their SaaS application security, identify vulnerabilities, and provide detailed remediation guidance. We guide you through the entire SaaS VAPT process, ensuring comprehensive security assessment while providing actionable insights for enhancing your SaaS application security posture.",
    icon: "💻",
    features: [
      "Comprehensive SaaS application VAPT",
      "Multi-tenant security assessment",
      "SaaS application penetration testing",
      "Tenant isolation security testing",
      "SaaS API security assessment",
      "SaaS application misconfiguration analysis",
      "SaaS security control effectiveness testing",
      "SaaS vulnerability prioritization and risk scoring",
      "Detailed SaaS remediation guidance",
      "SaaS security posture improvement recommendations"
    ],
    benefits: [
      {
        title: "SaaS Security Assurance",
        description: "Ensure comprehensive security of SaaS applications through systematic vulnerability assessment and penetration testing."
      },
      {
        title: "SaaS Vulnerability Identification",
        description: "Identify security vulnerabilities, tenant isolation issues, and potential attack vectors in SaaS applications."
      },
      {
        title: "SaaS Risk Mitigation",
        description: "Systematically reduce SaaS security risks through prioritized vulnerability remediation and security control implementation."
      },
      {
        title: "SaaS Compliance Support",
        description: "Support SaaS compliance requirements through comprehensive security assessment and documented security testing."
      },
      {
        title: "SaaS Security Posture Enhancement",
        description: "Enhance overall SaaS security posture through systematic security assessment and continuous improvement recommendations."
      },
      {
        title: "SaaS Incident Prevention",
        description: "Prevent SaaS security incidents through proactive vulnerability identification and remediation."
      }
    ],
    process: [
      {
        step: 1,
        title: "SaaS VAPT Planning and Scope Definition",
        description: "Define SaaS VAPT scope, establish SaaS-specific testing methodology, and develop comprehensive assessment plan.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "SaaS Application Analysis and Reconnaissance",
        description: "Analyze SaaS application architecture, identify attack surfaces, and assess SaaS security controls.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "SaaS Vulnerability Assessment and Scanning",
        description: "Conduct SaaS-specific vulnerability scanning, identify security weaknesses, and assess vulnerability severity.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "SaaS Penetration Testing and Exploitation",
        description: "Perform SaaS-specific penetration testing, attempt exploitation of vulnerabilities, and validate SaaS security controls.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "SaaS Risk Analysis and Prioritization",
        description: "Analyze SaaS findings, prioritize vulnerabilities by risk level, and develop SaaS remediation recommendations.",
        duration: "1-2 weeks"
      },
      {
        step: 6,
        title: "SaaS Report Development and Remediation Guidance",
        description: "Develop comprehensive SaaS VAPT report, provide detailed remediation guidance, and establish follow-up processes.",
        duration: "1-2 weeks"
      }
    ],
    requirements: [
      "Organization with SaaS applications",
      "Management commitment to SaaS security assessment",
      "Access to SaaS applications and systems",
      "Cooperation from SaaS development and security teams",
      "Budget allocation for assessment and remediation",
      "Timeline commitment of 6-8 weeks",
      "Documentation of current SaaS applications and security controls"
    ],
    deliverables: [
      "Comprehensive SaaS VAPT assessment report",
      "SaaS vulnerability assessment findings",
      "SaaS penetration testing results",
      "SaaS risk analysis and prioritization",
      "Detailed SaaS remediation guidance",
      "SaaS security control recommendations",
      "SaaS VAPT methodology documentation",
      "Follow-up SaaS testing plan",
      "SaaS security improvement roadmap",
      "Ongoing SaaS security monitoring guidance"
    ],
    pricing: {
      startingFrom: 170000,
      currency: "INR",
      includes: [
        "Complete SaaS application VAPT",
        "All SaaS vulnerability assessment and testing",
        "SaaS penetration testing and exploitation",
        "Detailed SaaS remediation guidance",
        "SaaS VAPT report development",
        "12 months post-assessment support"
      ],
      excludes: [
        "SaaS VAPT tools and software licenses",
        "Third-party SaaS security testing costs",
        "Travel and accommodation expenses",
        "Additional testing beyond standard scope",
        "SaaS vulnerability remediation implementation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 weeks",
    industry: [
      "Technology",
      "SaaS",
      "Cloud Services",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Education",
      "Government",
      "Consulting"
    ],
    compliance: [
      "SaaS Security Standards",
      "Cloud Security Standards",
      "SaaS Penetration Testing Standards",
      "SaaS Vulnerability Management Standards",
      "SaaS Regulatory Requirements"
    ],
    faqs: [
      {
        question: "What SaaS-specific vulnerabilities do you test for?",
        answer: "We test for SaaS-specific vulnerabilities including tenant isolation issues, multi-tenancy security, SaaS API vulnerabilities, and cloud-specific security issues."
      },
      {
        question: "How often should SaaS application VAPT be conducted?",
        answer: "SaaS application VAPT should be conducted with each major release or annually, whichever comes first."
      },
      {
        question: "How long does SaaS application VAPT take?",
        answer: "Complete SaaS application VAPT typically takes 6-8 weeks, depending on SaaS complexity and multi-tenancy features."
      },
      {
        question: "Is SaaS application VAPT mandatory?",
        answer: "While not mandatory, SaaS application VAPT is essential for SaaS security assurance and may be required by customers or regulatory authorities."
      }
    ],
    caseStudies: [
      {
        title: "SaaS Platform VAPT",
        description: "A major SaaS platform conducted comprehensive SaaS application VAPT, enhancing SaaS security and customer confidence.",
        industry: "SaaS",
        results: [
          "Completed SaaS app VAPT in 7 weeks",
          "Identified and remediated 35 critical SaaS vulnerabilities",
          "Enhanced SaaS security by 85%",
          "Improved customer confidence by 75%"
        ]
      },
      {
        title: "Cloud Services SaaS Security Assessment",
        description: "A cloud services company conducted SaaS application VAPT to ensure multi-tenant security and regulatory compliance.",
        industry: "Cloud Services",
        results: [
          "Completed SaaS app VAPT",
          "Enhanced multi-tenant security by 90%",
          "Improved SaaS compliance by 80%",
          "Reduced SaaS security risks by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 39
  }
];

async function addSecurityAssessmentTestingServices() {
  try {
    console.log('Adding Security Assessment and Testing GRC Services...');
    
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
    const servicesWithUsers = securityAssessmentTestingServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Security Assessment and Testing GRC services`);

    console.log('Security Assessment and Testing GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Security Assessment and Testing GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addSecurityAssessmentTestingServices();
