const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const aiMLGRCServices = [
  {
    title: "NIST AI RMF: AI Risk Management Framework Consultation and Implementation",
    slug: "nist-ai-rmf-ai-risk-management-framework-consultation-implementation",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive NIST AI RMF implementation services to manage risks in AI systems and ensure responsible AI development and deployment through structured risk management frameworks.",
    detailedDescription: "Our NIST AI RMF (AI Risk Management Framework) consultation and implementation services help organizations implement comprehensive risk management frameworks specifically designed for artificial intelligence systems. The NIST AI RMF provides guidance for managing risks throughout the AI lifecycle, from development to deployment and monitoring. Our expert AI risk consultants work with organizations developing, deploying, or using AI systems to implement structured risk management processes, establish AI governance frameworks, and ensure responsible AI practices. We guide you through the entire implementation process, ensuring your AI systems are developed and deployed responsibly while managing potential risks and ensuring compliance with emerging AI regulations and standards.",
    icon: "🤖",
    features: [
      "NIST AI RMF framework implementation",
      "AI risk assessment and management",
      "AI system lifecycle risk management",
      "AI governance framework establishment",
      "Responsible AI development practices",
      "AI bias detection and mitigation",
      "AI transparency and explainability",
      "AI system monitoring and validation",
      "AI incident response and management",
      "AI compliance and regulatory alignment"
    ],
    benefits: [
      {
        title: "Responsible AI Development",
        description: "Implement structured risk management processes to ensure AI systems are developed and deployed responsibly with proper risk controls."
      },
      {
        title: "AI Risk Mitigation",
        description: "Systematically identify, assess, and mitigate risks associated with AI systems throughout their lifecycle."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with emerging AI regulations and standards through comprehensive risk management frameworks."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build trust with stakeholders by demonstrating commitment to responsible AI practices and risk management."
      },
      {
        title: "Operational Resilience",
        description: "Enhance operational resilience by implementing robust AI risk management and incident response capabilities."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through responsible AI practices and comprehensive risk management capabilities."
      }
    ],
    process: [
      {
        step: 1,
        title: "AI Risk Assessment and Current State Analysis",
        description: "Assess current AI systems and practices against NIST AI RMF requirements, identify risks, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "AI Governance Framework Implementation",
        description: "Establish AI governance structure, define roles and responsibilities, and implement AI risk management policies.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "AI Risk Management Process Implementation",
        description: "Implement AI risk management processes, establish risk assessment procedures, and create risk mitigation strategies.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "AI System Lifecycle Risk Controls",
        description: "Implement risk controls throughout AI system lifecycle, establish monitoring systems, and create validation procedures.",
        duration: "4-6 weeks"
      },
      {
        step: 5,
        title: "AI Incident Response and Monitoring",
        description: "Establish AI incident response procedures, implement monitoring systems, and create ongoing risk assessment processes.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Training and Continuous Improvement",
        description: "Conduct AI risk management training, establish continuous improvement processes, and validate implementation effectiveness.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization developing, deploying, or using AI systems",
      "Management commitment to responsible AI practices",
      "Dedicated AI risk management team and resources",
      "Access to AI systems and development processes",
      "Cooperation from AI, IT, and business teams",
      "Budget allocation for implementation and ongoing management",
      "Timeline commitment of 6-9 months",
      "Documentation of current AI systems and practices"
    ],
    deliverables: [
      "Complete NIST AI RMF implementation documentation",
      "AI governance framework and procedures",
      "AI risk management process implementation guide",
      "AI system lifecycle risk controls",
      "AI incident response and monitoring procedures",
      "Staff training materials and programs",
      "AI risk assessment tools and templates",
      "Continuous improvement framework",
      "NIST AI RMF compliance validation report",
      "Ongoing AI risk management maintenance plan"
    ],
    pricing: {
      startingFrom: 200000,
      currency: "INR",
      includes: [
        "Complete NIST AI RMF implementation support",
        "All AI risk management documentation",
        "AI governance framework implementation",
        "Staff training and awareness programs",
        "AI risk assessment tools and templates",
        "12 months post-implementation support"
      ],
      excludes: [
        "AI risk management software",
        "Third-party AI assessment costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "AI development tools and platforms"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Artificial Intelligence",
      "Machine Learning",
      "Technology",
      "Financial Services",
      "Healthcare",
      "Automotive",
      "Manufacturing",
      "Government",
      "Education",
      "Consulting"
    ],
    compliance: [
      "NIST AI RMF",
      "EU AI Act",
      "ISO/IEC 23053:2022",
      "IEEE Standards",
      "GDPR",
      "ISO/IEC 27001:2022"
    ],
    faqs: [
      {
        question: "What is the difference between NIST AI RMF and traditional risk management?",
        answer: "NIST AI RMF is specifically designed for AI systems and addresses unique risks like bias, explainability, and adversarial attacks that traditional risk management doesn't cover."
      },
      {
        question: "Do we need NIST AI RMF if we're not developing AI systems?",
        answer: "If you're using AI systems from third parties or deploying AI solutions, you still need AI risk management to ensure responsible use and compliance."
      },
      {
        question: "How long does NIST AI RMF implementation take?",
        answer: "Complete NIST AI RMF implementation typically takes 6-9 months, depending on organization size, AI system complexity, and current risk management maturity."
      },
      {
        question: "Is NIST AI RMF mandatory?",
        answer: "While not mandatory, NIST AI RMF provides essential guidance for responsible AI practices and is increasingly required by regulations and business partners."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services AI Risk Management",
        description: "A major financial services company implemented NIST AI RMF to manage risks in their AI-powered fraud detection and credit scoring systems.",
        industry: "Financial Services",
        results: [
          "Implemented NIST AI RMF in 8 months",
          "Reduced AI-related risks by 75%",
          "Enhanced AI system reliability by 60%",
          "Met regulatory requirements for AI systems"
        ]
      },
      {
        title: "Healthcare AI Safety Implementation",
        description: "A healthcare technology company implemented NIST AI RMF to ensure safety and reliability of their AI-powered diagnostic systems.",
        industry: "Healthcare",
        results: [
          "Achieved NIST AI RMF compliance",
          "Enhanced AI system safety by 80%",
          "Reduced AI bias incidents by 70%",
          "Improved patient outcomes through safer AI"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 15
  },
  {
    title: "ISO 42001: AI Management Systems (AIMS) Consultation and Certification",
    slug: "iso-42001-ai-management-systems-aims-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Comprehensive ISO 42001 AI Management Systems implementation and certification services to establish robust AI governance and management frameworks for responsible AI development and deployment.",
    detailedDescription: "Our ISO 42001 AI Management Systems (AIMS) consultation and certification services help organizations implement comprehensive management systems specifically designed for artificial intelligence. ISO 42001 provides a structured framework for managing AI systems throughout their lifecycle, ensuring responsible AI development, deployment, and operation. Our expert AI management consultants work with organizations to establish AI governance structures, implement AI management processes, and prepare for ISO 42001 certification. We guide you through the entire implementation and certification process, ensuring your organization meets ISO 42001 requirements while building robust AI management capabilities that ensure responsible AI practices and stakeholder confidence.",
    icon: "🧠",
    features: [
      "ISO 42001 AI Management System implementation",
      "AI governance framework establishment",
      "AI system lifecycle management",
      "AI risk management and assessment",
      "AI performance monitoring and evaluation",
      "AI compliance and regulatory alignment",
      "AI stakeholder management",
      "AI continuous improvement processes",
      "AI management system documentation",
      "ISO 42001 certification preparation"
    ],
    benefits: [
      {
        title: "Structured AI Management",
        description: "Implement comprehensive management systems specifically designed for AI systems and their unique requirements."
      },
      {
        title: "AI Governance Excellence",
        description: "Establish robust AI governance frameworks that ensure responsible AI development and deployment practices."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensure compliance with emerging AI regulations and standards through certified AI management systems."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build trust with stakeholders by demonstrating commitment to responsible AI management through international certification."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence in AI management through systematic processes and continuous improvement."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through certified AI management capabilities and responsible AI practices."
      }
    ],
    process: [
      {
        step: 1,
        title: "AI Management Assessment and Gap Analysis",
        description: "Assess current AI management practices against ISO 42001 requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "AI Management System Design",
        description: "Design AI management system framework, establish governance structure, and define roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "AI Management Process Implementation",
        description: "Implement AI management processes, establish AI lifecycle management, and create performance monitoring systems.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "AI Risk Management and Compliance",
        description: "Implement AI risk management processes, establish compliance monitoring, and create stakeholder management procedures.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct AI management training, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support ISO 42001 certification audit, address findings, and establish continuous improvement processes.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization managing AI systems or AI development",
      "Management commitment to AI management excellence",
      "Dedicated AI management team and resources",
      "Access to AI systems and management processes",
      "Cooperation from AI, IT, and business teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 6-9 months",
      "Documentation of current AI management practices"
    ],
    deliverables: [
      "Complete ISO 42001 implementation documentation",
      "AI management system framework and procedures",
      "AI governance and lifecycle management guide",
      "AI risk management and compliance procedures",
      "AI performance monitoring and evaluation systems",
      "Staff training materials and programs",
      "Internal audit program and procedures",
      "Certification audit preparation package",
      "ISO 42001 certificate upon successful audit",
      "Continuous improvement framework and plan"
    ],
    pricing: {
      startingFrom: 220000,
      currency: "INR",
      includes: [
        "Complete ISO 42001 implementation support",
        "All AI management documentation development",
        "AI governance framework implementation",
        "Staff training and awareness programs",
        "Internal audit support",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "Certification body audit fees",
        "AI management software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "AI development tools and platforms"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-9 months",
    industry: [
      "Artificial Intelligence",
      "Machine Learning",
      "Technology",
      "Financial Services",
      "Healthcare",
      "Automotive",
      "Manufacturing",
      "Government",
      "Education",
      "Consulting"
    ],
    compliance: [
      "ISO/IEC 42001:2023",
      "NIST AI RMF",
      "EU AI Act",
      "ISO/IEC 27001:2022",
      "GDPR",
      "IEEE Standards"
    ],
    faqs: [
      {
        question: "What is the difference between ISO 42001 and ISO 27001?",
        answer: "ISO 42001 is specifically designed for AI management systems, while ISO 27001 focuses on information security management. ISO 42001 addresses AI-specific risks and management requirements."
      },
      {
        question: "Do we need ISO 42001 if we already have ISO 27001?",
        answer: "ISO 42001 complements ISO 27001 by providing AI-specific management requirements. Both can be integrated for comprehensive AI and information security management."
      },
      {
        question: "How long does ISO 42001 certification take?",
        answer: "Complete ISO 42001 implementation and certification typically takes 6-9 months, depending on organization size, AI system complexity, and current management maturity."
      },
      {
        question: "Is ISO 42001 certification mandatory?",
        answer: "While not mandatory, ISO 42001 certification demonstrates commitment to responsible AI management and may be required by customers or regulations."
      }
    ],
    caseStudies: [
      {
        title: "AI Technology Company Management Excellence",
        description: "A leading AI technology company achieved ISO 42001 certification, enhancing their AI management capabilities and customer confidence.",
        industry: "Artificial Intelligence",
        results: [
          "Achieved ISO 42001 certification in 8 months",
          "Enhanced AI management capabilities by 70%",
          "Increased customer confidence by 60%",
          "Improved AI system reliability by 50%"
        ]
      },
      {
        title: "Manufacturing AI Management Implementation",
        description: "A manufacturing company implemented ISO 42001 to manage their AI-powered production systems and ensure operational excellence.",
        industry: "Manufacturing",
        results: [
          "Achieved ISO 42001 certification",
          "Enhanced AI system management",
          "Improved production efficiency by 40%",
          "Reduced AI-related operational risks by 65%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 16
  },
  {
    title: "HITRUST + AI: Extended Healthcare Framework for AI Systems Consultation and Certification",
    slug: "hitrust-ai-extended-healthcare-framework-ai-systems-consultation-certification",
    category: "Consultation and Certification services",
    shortDescription: "Specialized HITRUST + AI implementation and certification services to extend the HITRUST framework to include AI systems, ensuring comprehensive healthcare AI security and compliance.",
    detailedDescription: "Our HITRUST + AI consultation and certification services help healthcare organizations extend their HITRUST framework to include comprehensive management of artificial intelligence systems. This specialized service combines HITRUST's healthcare security framework with AI-specific requirements, ensuring that AI systems used in healthcare environments meet the highest security and privacy standards. Our expert healthcare AI consultants work with healthcare providers, health plans, healthcare technology companies, and business associates to implement extended HITRUST controls for AI systems, establish AI governance within healthcare contexts, and prepare for HITRUST + AI certification. We guide you through the entire implementation and certification process, ensuring your healthcare AI systems meet both HITRUST and AI-specific requirements while protecting patient data and ensuring responsible AI practices.",
    icon: "🏥🤖",
    features: [
      "HITRUST + AI framework implementation",
      "Healthcare AI security control implementation",
      "AI system risk assessment for healthcare",
      "Healthcare AI governance establishment",
      "AI bias detection and mitigation in healthcare",
      "Healthcare AI incident response procedures",
      "AI system monitoring and validation for healthcare",
      "Healthcare AI compliance and regulatory alignment",
      "Third-party AI risk management for healthcare",
      "HITRUST + AI certification preparation"
    ],
    benefits: [
      {
        title: "Comprehensive Healthcare AI Security",
        description: "Implement comprehensive security frameworks that address both healthcare data protection and AI-specific security requirements."
      },
      {
        title: "Healthcare AI Compliance",
        description: "Ensure compliance with healthcare regulations (HIPAA, HITECH) and AI-specific requirements through integrated frameworks."
      },
      {
        title: "Patient Safety and Trust",
        description: "Enhance patient safety and trust by ensuring AI systems used in healthcare meet the highest security and privacy standards."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce risks associated with AI systems in healthcare environments through comprehensive risk management."
      },
      {
        title: "Operational Excellence",
        description: "Achieve operational excellence in healthcare AI management through structured processes and continuous improvement."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage in healthcare markets with certified AI security capabilities and compliance assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "HITRUST + AI Assessment and Gap Analysis",
        description: "Assess current healthcare AI practices against HITRUST + AI requirements, identify gaps, and develop implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Healthcare AI Governance Implementation",
        description: "Establish healthcare AI governance framework, extend HITRUST controls to AI systems, and define AI-specific roles and responsibilities.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "AI Security Controls Implementation",
        description: "Implement AI-specific security controls, establish AI risk assessment procedures, and create healthcare AI monitoring systems.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Healthcare AI Compliance and Risk Management",
        description: "Implement healthcare AI compliance measures, establish AI bias detection procedures, and create incident response plans.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Training and Documentation",
        description: "Conduct HITRUST + AI training programs, finalize documentation, and prepare for internal audit and certification.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Certification Audit and Continuous Improvement",
        description: "Support HITRUST + AI certification audit, address findings, and establish continuous improvement processes.",
        duration: "3-4 weeks"
      }
    ],
    requirements: [
      "Healthcare organization using AI systems",
      "Existing HITRUST certification or commitment to implement both",
      "Management commitment to healthcare AI security",
      "Dedicated healthcare AI security team and resources",
      "Access to healthcare AI systems and patient data",
      "Cooperation from clinical, IT, and AI teams",
      "Budget allocation for implementation and certification",
      "Timeline commitment of 8-12 months",
      "Documentation of current healthcare AI practices"
    ],
    deliverables: [
      "Complete HITRUST + AI implementation documentation",
      "Healthcare AI security framework and procedures",
      "AI-specific HITRUST control implementation guide",
      "Healthcare AI risk assessment and management procedures",
      "AI bias detection and mitigation procedures",
      "Healthcare AI incident response procedures",
      "Staff training materials and programs",
      "Certification audit preparation package",
      "HITRUST + AI certificate upon successful audit",
      "Continuous improvement framework and plan"
    ],
    pricing: {
      startingFrom: 280000,
      currency: "INR",
      includes: [
        "Complete HITRUST + AI implementation support",
        "All healthcare AI security documentation",
        "AI-specific HITRUST control implementation",
        "Staff training and awareness programs",
        "Certification audit preparation",
        "12 months post-certification support"
      ],
      excludes: [
        "HITRUST + AI assessment fees",
        "Healthcare AI security software",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "AI development tools and platforms"
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
      "Healthcare AI",
      "Medical Devices",
      "Healthcare Software",
      "Healthcare Analytics",
      "Healthcare Research",
      "Healthcare Consulting",
      "Healthcare Clearinghouses"
    ],
    compliance: [
      "HITRUST + AI",
      "HITRUST CSF",
      "HIPAA",
      "HITECH Act",
      "NIST AI RMF",
      "ISO/IEC 42001:2023",
      "State Healthcare Privacy Laws"
    ],
    faqs: [
      {
        question: "What is the difference between HITRUST and HITRUST + AI?",
        answer: "HITRUST + AI extends the standard HITRUST framework to include AI-specific security controls and risk management requirements for healthcare AI systems."
      },
      {
        question: "Do we need HITRUST + AI if we already have HITRUST certification?",
        answer: "If you're using AI systems in healthcare, HITRUST + AI provides additional assurance for AI-specific risks and may be required by healthcare partners."
      },
      {
        question: "How long does HITRUST + AI certification take?",
        answer: "Complete HITRUST + AI implementation and certification typically takes 8-12 months, depending on organization size and AI system complexity."
      },
      {
        question: "Is HITRUST + AI certification mandatory for healthcare AI?",
        answer: "While not mandatory, HITRUST + AI certification demonstrates commitment to healthcare AI security and may be required by healthcare partners."
      }
    ],
    caseStudies: [
      {
        title: "Healthcare AI Security Implementation",
        description: "A major healthcare system implemented HITRUST + AI to secure their AI-powered diagnostic and treatment recommendation systems.",
        industry: "Healthcare Providers",
        results: [
          "Achieved HITRUST + AI certification in 10 months",
          "Secured AI-powered diagnostic systems",
          "Enhanced patient data protection by 85%",
          "Reduced AI-related security incidents by 80%"
        ]
      },
      {
        title: "Healthcare Technology AI Compliance",
        description: "A healthcare technology company achieved HITRUST + AI certification to serve healthcare clients with AI-powered solutions.",
        industry: "Healthcare Technology",
        results: [
          "Achieved HITRUST + AI certification",
          "Served 150+ healthcare clients securely",
          "Protected patient data in AI systems",
          "Enhanced healthcare AI security by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 17
  },
  {
    title: "Adversarial Machine Learning: ML Security Consultation and Implementation",
    slug: "adversarial-machine-learning-ml-security-consultation-implementation",
    category: "Consultation and Certification services",
    shortDescription: "Specialized adversarial machine learning security consultation and implementation services to defend against attacks that manipulate ML models and ensure robust AI system security.",
    detailedDescription: "Our Adversarial Machine Learning security consultation and implementation services help organizations protect their machine learning systems against sophisticated attacks that manipulate models and compromise AI system integrity. This specialized service focuses on the security of machine learning systems, including defense against adversarial attacks, model poisoning, data manipulation, and other ML-specific threats. Our expert ML security consultants work with organizations to implement comprehensive ML security frameworks, establish adversarial defense mechanisms, and ensure robust AI system security. We guide you through the entire implementation process, ensuring your ML systems are protected against current and emerging adversarial threats while maintaining model performance and reliability.",
    icon: "🛡️🤖",
    features: [
      "Adversarial attack detection and prevention",
      "ML model robustness testing and validation",
      "Adversarial training implementation",
      "Model poisoning detection and mitigation",
      "Data integrity protection for ML systems",
      "ML system monitoring and anomaly detection",
      "Adversarial defense mechanism implementation",
      "ML security incident response procedures",
      "ML model security assessment and hardening",
      "Continuous ML security monitoring and improvement"
    ],
    benefits: [
      {
        title: "ML System Security",
        description: "Implement comprehensive security measures to protect ML systems against adversarial attacks and manipulation."
      },
      {
        title: "Model Robustness",
        description: "Enhance ML model robustness and reliability through adversarial training and security hardening."
      },
      {
        title: "Threat Detection",
        description: "Detect and prevent adversarial attacks, model poisoning, and other ML-specific security threats."
      },
      {
        title: "Risk Mitigation",
        description: "Systematically reduce risks associated with adversarial attacks and ML system vulnerabilities."
      },
      {
        title: "Operational Resilience",
        description: "Build operational resilience through robust ML security and incident response capabilities."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through secure and robust ML systems that resist adversarial attacks."
      }
    ],
    process: [
      {
        step: 1,
        title: "ML Security Assessment and Threat Analysis",
        description: "Assess current ML systems for adversarial vulnerabilities, analyze threat landscape, and develop security implementation roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Adversarial Defense Framework Implementation",
        description: "Implement adversarial defense framework, establish ML security governance, and define security roles and responsibilities.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "ML Model Security Hardening",
        description: "Implement model security hardening measures, establish adversarial training procedures, and create model validation systems.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Adversarial Detection and Monitoring",
        description: "Implement adversarial attack detection systems, establish monitoring procedures, and create incident response plans.",
        duration: "3-4 weeks"
      },
      {
        step: 5,
        title: "Security Testing and Validation",
        description: "Conduct comprehensive ML security testing, validate defense mechanisms, and establish continuous monitoring systems.",
        duration: "2-3 weeks"
      },
      {
        step: 6,
        title: "Training and Continuous Improvement",
        description: "Conduct ML security training, establish continuous improvement processes, and validate security effectiveness.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Organization using machine learning systems",
      "Management commitment to ML security",
      "Dedicated ML security team and resources",
      "Access to ML systems and model development processes",
      "Cooperation from ML, IT, and security teams",
      "Budget allocation for implementation and ongoing security",
      "Timeline commitment of 6-8 months",
      "Documentation of current ML systems and security practices"
    ],
    deliverables: [
      "Complete ML security implementation documentation",
      "Adversarial defense framework and procedures",
      "ML model security hardening guide",
      "Adversarial attack detection and prevention procedures",
      "ML security monitoring and incident response plans",
      "Staff training materials and programs",
      "ML security testing and validation procedures",
      "Continuous monitoring and improvement framework",
      "ML security assessment and validation report",
      "Ongoing ML security maintenance plan"
    ],
    pricing: {
      startingFrom: 180000,
      currency: "INR",
      includes: [
        "Complete ML security implementation support",
        "All adversarial defense documentation",
        "ML model security hardening implementation",
        "Staff training and awareness programs",
        "ML security testing and validation",
        "12 months post-implementation support"
      ],
      excludes: [
        "ML security software and tools",
        "Third-party ML security assessment costs",
        "Travel and accommodation expenses",
        "Additional training beyond standard program",
        "ML development tools and platforms"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    industry: [
      "Artificial Intelligence",
      "Machine Learning",
      "Technology",
      "Financial Services",
      "Healthcare",
      "Automotive",
      "Manufacturing",
      "Government",
      "Education",
      "Consulting"
    ],
    compliance: [
      "NIST AI RMF",
      "ISO/IEC 42001:2023",
      "ISO/IEC 27001:2022",
      "IEEE Standards",
      "GDPR",
      "Adversarial ML Best Practices"
    ],
    faqs: [
      {
        question: "What are adversarial attacks in machine learning?",
        answer: "Adversarial attacks are techniques used to manipulate ML models by introducing subtle changes to input data that cause the model to make incorrect predictions or classifications."
      },
      {
        question: "Do we need adversarial ML security if our models are not public?",
        answer: "Yes, adversarial attacks can occur even with private models through data poisoning, model extraction, or insider threats. All ML systems need security measures."
      },
      {
        question: "How long does adversarial ML security implementation take?",
        answer: "Complete adversarial ML security implementation typically takes 6-8 months, depending on organization size, ML system complexity, and current security maturity."
      },
      {
        question: "Can adversarial attacks be completely prevented?",
        answer: "While complete prevention is challenging, robust defense mechanisms, adversarial training, and continuous monitoring can significantly reduce attack success rates."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services ML Security Implementation",
        description: "A major financial services company implemented adversarial ML security to protect their AI-powered fraud detection and risk assessment systems.",
        industry: "Financial Services",
        results: [
          "Implemented adversarial ML security in 7 months",
          "Reduced adversarial attack success by 85%",
          "Enhanced ML model robustness by 70%",
          "Protected financial AI systems from manipulation"
        ]
      },
      {
        title: "Healthcare AI Security Hardening",
        description: "A healthcare technology company implemented adversarial ML security to protect their AI-powered diagnostic and treatment systems.",
        industry: "Healthcare",
        results: [
          "Achieved adversarial ML security implementation",
          "Protected healthcare AI systems",
          "Enhanced model reliability by 60%",
          "Reduced ML security incidents by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 18
  }
];

async function addAIMLGRCServices() {
  try {
    console.log('Adding AI/ML GRC Services...');
    
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
    const servicesWithUsers = aiMLGRCServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} AI/ML GRC services`);

    console.log('AI/ML GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding AI/ML GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addAIMLGRCServices();
