const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const managedGRCServices = [
  {
    title: "Risk Management as a Service: Continuous Risk Identification, Assessment, and Mitigation",
    slug: "risk-management-as-a-service-continuous-risk-identification-assessment-mitigation",
    category: "Risk Management as a Service",
    shortDescription: "Comprehensive Risk Management as a Service (RMaaS) providing continuous expertise and tools to identify, assess, and mitigate risks across your organization.",
    detailedDescription: "Our Risk Management as a Service (RMaaS) provides comprehensive, ongoing risk management expertise and tools to continuously identify, assess, and mitigate risks across your organization. This subscription-based service combines expert risk management consultants with advanced risk management tools and methodologies to provide continuous risk oversight, assessment, and mitigation support. Our expert risk management team works as an extension of your organization to provide ongoing risk management services, including risk identification, assessment, monitoring, and mitigation guidance. We guide you through continuous risk management processes, ensuring comprehensive risk oversight while providing actionable insights for enhancing your risk management capabilities and organizational resilience.",
    icon: "⚖️",
    features: [
      "Continuous risk identification and assessment",
      "Risk monitoring and tracking",
      "Risk mitigation guidance and support",
      "Risk management tools and methodologies",
      "Risk reporting and dashboards",
      "Risk governance and oversight",
      "Risk training and awareness",
      "Risk incident response support",
      "Risk compliance monitoring",
      "Risk management optimization"
    ],
    benefits: [
      {
        title: "Continuous Risk Oversight",
        description: "Provide continuous risk oversight and management through dedicated risk management expertise and ongoing support."
      },
      {
        title: "Risk Management Excellence",
        description: "Achieve risk management excellence through expert guidance, advanced tools, and systematic risk management processes."
      },
      {
        title: "Cost-Effective Risk Management",
        description: "Access expert risk management capabilities cost-effectively through subscription-based service model."
      },
      {
        title: "Risk Mitigation Support",
        description: "Receive ongoing support for risk mitigation through continuous assessment, monitoring, and guidance."
      },
      {
        title: "Risk Compliance Assurance",
        description: "Ensure risk compliance through continuous monitoring, assessment, and regulatory requirement tracking."
      },
      {
        title: "Organizational Resilience",
        description: "Enhance organizational resilience through comprehensive risk management and proactive risk mitigation."
      }
    ],
    process: [
      {
        step: 1,
        title: "Risk Management Assessment and Setup",
        description: "Assess current risk management capabilities, establish RMaaS framework, and develop risk management strategy.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Risk Identification and Assessment",
        description: "Conduct comprehensive risk identification, assess risk levels, and establish risk monitoring systems.",
        duration: "3-4 weeks"
      },
      {
        step: 3,
        title: "Risk Management Implementation",
        description: "Implement risk management processes, establish risk controls, and create risk monitoring dashboards.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Continuous Risk Monitoring",
        description: "Establish continuous risk monitoring, implement risk tracking systems, and create risk reporting processes.",
        duration: "Ongoing"
      },
      {
        step: 5,
        title: "Risk Mitigation Support",
        description: "Provide ongoing risk mitigation support, risk incident response, and risk management guidance.",
        duration: "Ongoing"
      },
      {
        step: 6,
        title: "Risk Management Optimization",
        description: "Continuously optimize risk management processes, enhance risk controls, and improve risk management effectiveness.",
        duration: "Ongoing"
      }
    ],
    requirements: [
      "Organization requiring continuous risk management",
      "Management commitment to risk management excellence",
      "Dedicated risk management resources and budget",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for ongoing risk management service",
      "Timeline commitment of ongoing service",
      "Documentation of current risk management practices"
    ],
    deliverables: [
      "Comprehensive risk management framework",
      "Risk identification and assessment processes",
      "Risk monitoring and tracking systems",
      "Risk reporting and dashboards",
      "Risk mitigation guidance and support",
      "Risk management training materials",
      "Risk incident response procedures",
      "Risk compliance monitoring systems",
      "Ongoing risk management support",
      "Risk management optimization recommendations"
    ],
    pricing: {
      startingFrom: 50000,
      currency: "INR",
      includes: [
        "Complete risk management as a service",
        "All risk management tools and methodologies",
        "Continuous risk monitoring and assessment",
        "Risk mitigation guidance and support",
        "Risk reporting and dashboards",
        "12 months ongoing risk management support"
      ],
      excludes: [
        "Risk management software licenses",
        "Third-party risk assessment costs",
        "Travel and accommodation expenses",
        "Additional risk management beyond standard scope",
        "Risk mitigation implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "Ongoing",
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
      "Risk Management Standards",
      "Enterprise Risk Management",
      "Risk Compliance Requirements",
      "Industry Risk Standards",
      "Regulatory Risk Requirements"
    ],
    faqs: [
      {
        question: "What is Risk Management as a Service?",
        answer: "Risk Management as a Service (RMaaS) is a subscription-based service that provides continuous risk management expertise, tools, and support to help organizations manage risks effectively."
      },
      {
        question: "How does RMaaS differ from traditional risk management?",
        answer: "RMaaS provides continuous, expert-driven risk management support with dedicated resources, advanced tools, and ongoing guidance, rather than periodic risk assessments."
      },
      {
        question: "What types of risks does RMaaS cover?",
        answer: "RMaaS covers all types of risks including operational, financial, strategic, compliance, and technology risks across all organizational functions."
      },
      {
        question: "Is RMaaS suitable for all organization sizes?",
        answer: "Yes, RMaaS is scalable and suitable for organizations of all sizes, from startups to large enterprises, with customized risk management approaches."
      }
    ],
    caseStudies: [
      {
        title: "Financial Services RMaaS Implementation",
        description: "A major financial services company implemented RMaaS, enhancing risk management capabilities and regulatory compliance.",
        industry: "Financial Services",
        results: [
          "Implemented RMaaS successfully",
          "Enhanced risk management by 85%",
          "Improved risk compliance by 80%",
          "Reduced risk incidents by 70%"
        ]
      },
      {
        title: "Manufacturing Company Risk Management Excellence",
        description: "A manufacturing company implemented RMaaS to enhance operational risk management and business continuity.",
        industry: "Manufacturing",
        results: [
          "Achieved RMaaS implementation",
          "Enhanced operational risk management by 75%",
          "Improved business continuity by 80%",
          "Strengthened risk governance by 70%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 42
  },
  {
    title: "Virtual DPO: Part-time Outsourced Data Protection Officer Services",
    slug: "virtual-dpo-part-time-outsourced-data-protection-officer-services",
    category: "Risk Management as a Service",
    shortDescription: "Comprehensive Virtual DPO services providing part-time, outsourced Data Protection Officer expertise to ensure compliance with data privacy regulations.",
    detailedDescription: "Our Virtual DPO (Data Protection Officer) services provide comprehensive, part-time outsourced DPO expertise to ensure compliance with data privacy regulations including GDPR, CCPA, and other data protection laws. This service combines expert data protection consultants with ongoing DPO support to provide continuous data privacy oversight, compliance monitoring, and regulatory guidance. Our expert DPO consultants work as an extension of your organization to provide ongoing data protection services, including privacy impact assessments, data processing monitoring, and regulatory compliance support. We guide you through continuous data protection processes, ensuring comprehensive privacy compliance while providing actionable insights for enhancing your data protection capabilities.",
    icon: "🔒",
    features: [
      "Continuous data protection oversight",
      "Privacy impact assessments",
      "Data processing monitoring",
      "Regulatory compliance support",
      "Data subject rights management",
      "Privacy policy development",
      "Data breach response support",
      "Privacy training and awareness",
      "Data protection governance",
      "Privacy compliance monitoring"
    ],
    benefits: [
      {
        title: "Data Protection Compliance",
        description: "Ensure comprehensive compliance with data privacy regulations through dedicated DPO expertise and ongoing support."
      },
      {
        title: "Privacy Risk Mitigation",
        description: "Mitigate privacy risks through continuous monitoring, assessment, and proactive data protection measures."
      },
      {
        title: "Cost-Effective DPO Services",
        description: "Access expert DPO capabilities cost-effectively through part-time, outsourced service model."
      },
      {
        title: "Regulatory Compliance Support",
        description: "Receive ongoing support for regulatory compliance through continuous monitoring and guidance."
      },
      {
        title: "Data Subject Rights Management",
        description: "Effectively manage data subject rights and requests through expert DPO guidance and support."
      },
      {
        title: "Privacy Governance Excellence",
        description: "Achieve privacy governance excellence through systematic data protection management and compliance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Data Protection Assessment and Setup",
        description: "Assess current data protection capabilities, establish Virtual DPO framework, and develop data protection strategy.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Privacy Impact Assessment",
        description: "Conduct privacy impact assessments, identify data processing risks, and establish privacy controls.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Data Protection Implementation",
        description: "Implement data protection processes, establish privacy controls, and create data processing monitoring systems.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Continuous Privacy Monitoring",
        description: "Establish continuous privacy monitoring, implement compliance tracking, and create privacy reporting processes.",
        duration: "Ongoing"
      },
      {
        step: 5,
        title: "Data Subject Rights Support",
        description: "Provide ongoing data subject rights support, privacy request handling, and regulatory compliance guidance.",
        duration: "Ongoing"
      },
      {
        step: 6,
        title: "Privacy Compliance Optimization",
        description: "Continuously optimize privacy compliance processes, enhance data protection controls, and improve privacy management effectiveness.",
        duration: "Ongoing"
      }
    ],
    requirements: [
      "Organization processing personal data",
      "Management commitment to data protection compliance",
      "Dedicated data protection resources and budget",
      "Cooperation from all departments handling personal data",
      "Budget allocation for ongoing DPO service",
      "Timeline commitment of ongoing service",
      "Documentation of current data processing activities"
    ],
    deliverables: [
      "Comprehensive data protection framework",
      "Privacy impact assessment processes",
      "Data processing monitoring systems",
      "Privacy compliance reporting",
      "Data subject rights management procedures",
      "Privacy training materials",
      "Data breach response procedures",
      "Privacy policy development",
      "Ongoing DPO support",
      "Privacy compliance optimization recommendations"
    ],
    pricing: {
      startingFrom: 40000,
      currency: "INR",
      includes: [
        "Complete Virtual DPO service",
        "All data protection tools and methodologies",
        "Continuous privacy monitoring and assessment",
        "Data subject rights support",
        "Privacy compliance guidance",
        "12 months ongoing DPO support"
      ],
      excludes: [
        "Privacy management software licenses",
        "Third-party privacy assessment costs",
        "Travel and accommodation expenses",
        "Additional privacy services beyond standard scope",
        "Privacy control implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "Ongoing",
    industry: [
      "All Industries",
      "Financial Services",
      "Healthcare",
      "E-commerce",
      "Technology",
      "Education",
      "Government",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "GDPR",
      "CCPA",
      "Data Protection Regulations",
      "Privacy Laws",
      "Data Privacy Standards"
    ],
    faqs: [
      {
        question: "What is a Virtual DPO?",
        answer: "A Virtual DPO is a part-time, outsourced Data Protection Officer who provides ongoing data protection expertise and compliance support without being a full-time employee."
      },
      {
        question: "When is a DPO required?",
        answer: "A DPO is required when organizations process large amounts of personal data, process special categories of data, or when required by law (such as GDPR)."
      },
      {
        question: "What are the benefits of a Virtual DPO?",
        answer: "Virtual DPO provides expert data protection expertise cost-effectively, ensures compliance with privacy regulations, and provides ongoing privacy support."
      },
      {
        question: "Is Virtual DPO suitable for all organization sizes?",
        answer: "Yes, Virtual DPO is suitable for organizations of all sizes that need data protection expertise but may not require a full-time DPO."
      }
    ],
    caseStudies: [
      {
        title: "E-commerce Company Virtual DPO Implementation",
        description: "A major e-commerce company implemented Virtual DPO services, enhancing data protection compliance and customer trust.",
        industry: "E-commerce",
        results: [
          "Implemented Virtual DPO successfully",
          "Enhanced data protection compliance by 90%",
          "Improved customer trust by 75%",
          "Reduced privacy risks by 80%"
        ]
      },
      {
        title: "Healthcare Organization Privacy Excellence",
        description: "A healthcare organization implemented Virtual DPO to ensure patient data protection and regulatory compliance.",
        industry: "Healthcare",
        results: [
          "Achieved Virtual DPO implementation",
          "Enhanced patient data protection by 85%",
          "Improved privacy compliance by 80%",
          "Strengthened data protection governance by 75%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 43
  },
  {
    title: "Virtual CISO: Part-time Outsourced Chief Information Security Officer Services",
    slug: "virtual-ciso-part-time-outsourced-chief-information-security-officer-services",
    category: "Risk Management as a Service",
    shortDescription: "Comprehensive Virtual CISO services providing part-time, outsourced Chief Information Security Officer expertise to manage information security programs.",
    detailedDescription: "Our Virtual CISO (Chief Information Security Officer) services provide comprehensive, part-time outsourced CISO expertise to manage your organization's information security program. This service combines expert information security consultants with ongoing CISO support to provide continuous security oversight, strategic security planning, and security governance. Our expert CISO consultants work as an extension of your organization to provide ongoing information security services, including security strategy development, security program management, and security risk oversight. We guide you through continuous information security processes, ensuring comprehensive security management while providing actionable insights for enhancing your information security capabilities and organizational security posture.",
    icon: "🛡️",
    features: [
      "Continuous information security oversight",
      "Security strategy development and implementation",
      "Security program management",
      "Security risk assessment and management",
      "Security governance and compliance",
      "Security incident response leadership",
      "Security training and awareness",
      "Security vendor management",
      "Security budget planning and management",
      "Security performance monitoring"
    ],
    benefits: [
      {
        title: "Information Security Leadership",
        description: "Provide comprehensive information security leadership through dedicated CISO expertise and ongoing support."
      },
      {
        title: "Security Strategy Excellence",
        description: "Achieve security strategy excellence through expert guidance, strategic planning, and systematic security program management."
      },
      {
        title: "Cost-Effective CISO Services",
        description: "Access expert CISO capabilities cost-effectively through part-time, outsourced service model."
      },
      {
        title: "Security Risk Management",
        description: "Effectively manage information security risks through continuous assessment, monitoring, and mitigation guidance."
      },
      {
        title: "Security Compliance Assurance",
        description: "Ensure security compliance through continuous monitoring, assessment, and regulatory requirement tracking."
      },
      {
        title: "Security Governance Excellence",
        description: "Achieve security governance excellence through systematic information security management and compliance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Information Security Assessment and Setup",
        description: "Assess current information security capabilities, establish Virtual CISO framework, and develop security strategy.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Security Strategy Development",
        description: "Develop comprehensive security strategy, establish security objectives, and create security roadmap.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Security Program Implementation",
        description: "Implement security program, establish security controls, and create security monitoring systems.",
        duration: "3-4 weeks"
      },
      {
        step: 4,
        title: "Continuous Security Monitoring",
        description: "Establish continuous security monitoring, implement security tracking, and create security reporting processes.",
        duration: "Ongoing"
      },
      {
        step: 5,
        title: "Security Risk Management",
        description: "Provide ongoing security risk management, incident response leadership, and security compliance guidance.",
        duration: "Ongoing"
      },
      {
        step: 6,
        title: "Security Program Optimization",
        description: "Continuously optimize security program, enhance security controls, and improve security management effectiveness.",
        duration: "Ongoing"
      }
    ],
    requirements: [
      "Organization requiring information security leadership",
      "Management commitment to information security excellence",
      "Dedicated information security resources and budget",
      "Cooperation from all departments and stakeholders",
      "Budget allocation for ongoing CISO service",
      "Timeline commitment of ongoing service",
      "Documentation of current information security practices"
    ],
    deliverables: [
      "Comprehensive information security framework",
      "Security strategy and roadmap",
      "Security program management processes",
      "Security risk management systems",
      "Security governance and compliance procedures",
      "Security training materials",
      "Security incident response procedures",
      "Security vendor management processes",
      "Ongoing CISO support",
      "Security program optimization recommendations"
    ],
    pricing: {
      startingFrom: 60000,
      currency: "INR",
      includes: [
        "Complete Virtual CISO service",
        "All information security tools and methodologies",
        "Continuous security monitoring and assessment",
        "Security risk management support",
        "Security compliance guidance",
        "12 months ongoing CISO support"
      ],
      excludes: [
        "Security management software licenses",
        "Third-party security assessment costs",
        "Travel and accommodation expenses",
        "Additional security services beyond standard scope",
        "Security control implementation costs"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities also available 3-6 months for startups companies",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "Ongoing",
    industry: [
      "All Industries",
      "Financial Services",
      "Healthcare",
      "Technology",
      "Manufacturing",
      "Government",
      "Education",
      "Consulting",
      "Non-Profit"
    ],
    compliance: [
      "Information Security Standards",
      "Cybersecurity Frameworks",
      "Security Compliance Requirements",
      "Industry Security Standards",
      "Regulatory Security Requirements"
    ],
    faqs: [
      {
        question: "What is a Virtual CISO?",
        answer: "A Virtual CISO is a part-time, outsourced Chief Information Security Officer who provides ongoing information security expertise and leadership without being a full-time employee."
      },
      {
        question: "When is a CISO required?",
        answer: "A CISO is required when organizations need dedicated information security leadership, strategic security planning, and comprehensive security program management."
      },
      {
        question: "What are the benefits of a Virtual CISO?",
        answer: "Virtual CISO provides expert information security leadership cost-effectively, ensures comprehensive security management, and provides ongoing security support."
      },
      {
        question: "Is Virtual CISO suitable for all organization sizes?",
        answer: "Yes, Virtual CISO is suitable for organizations of all sizes that need information security leadership but may not require a full-time CISO."
      }
    ],
    caseStudies: [
      {
        title: "Technology Company Virtual CISO Implementation",
        description: "A major technology company implemented Virtual CISO services, enhancing information security leadership and security posture.",
        industry: "Technology",
        results: [
          "Implemented Virtual CISO successfully",
          "Enhanced information security by 85%",
          "Improved security compliance by 80%",
          "Reduced security risks by 75%"
        ]
      },
      {
        title: "Financial Services Security Excellence",
        description: "A financial services company implemented Virtual CISO to ensure comprehensive information security management and regulatory compliance.",
        industry: "Financial Services",
        results: [
          "Achieved Virtual CISO implementation",
          "Enhanced security leadership by 90%",
          "Improved security governance by 85%",
          "Strengthened security program by 80%"
        ]
      }
    ],
    relatedServices: [],
    isActive: true,
    priority: 44
  }
];

async function addManagedGRCServices() {
  try {
    console.log('Adding Managed GRC Services...');
    
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
    const servicesWithUsers = managedGRCServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Managed GRC Services`);

    console.log('Managed GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Managed GRC Services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addManagedGRCServices();
