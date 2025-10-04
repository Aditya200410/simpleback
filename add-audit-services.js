const mongoose = require('mongoose');
const GRCService = require('./models/GRCService');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const auditServices = [
  {
    title: "IT General Controls Testing and Audit Services",
    slug: "it-general-controls-testing-audit-services",
    category: "Audit and Assurance Services",
    shortDescription: "Comprehensive IT general controls testing and audit services to evaluate and improve foundational IT controls including access management, change control, and system operations.",
    detailedDescription: "Our IT General Controls Testing service provides thorough evaluation of your organization's foundational IT controls. We assess critical areas including access management, change control, and system operations to ensure robust security and compliance. Our expert auditors conduct detailed examinations of your IT infrastructure, identifying vulnerabilities and providing actionable recommendations for improvement. Through systematic testing and evaluation, we help organizations strengthen their IT control environment and maintain effective governance over their technology systems.",
    icon: "🖥️",
    features: [
      "Access management control testing",
      "Change management control assessment",
      "System operations evaluation",
      "Security controls testing",
      "Backup and recovery assessment",
      "IT governance review",
      "Documentation review",
      "Control gap analysis",
      "Remediation guidance",
      "Continuous monitoring recommendations"
    ],
    benefits: [
      {
        title: "Enhanced IT Security",
        description: "Strengthen IT security through comprehensive controls testing and improvement recommendations."
      },
      {
        title: "Compliance Assurance",
        description: "Ensure compliance with relevant IT control requirements and industry standards."
      },
      {
        title: "Risk Mitigation",
        description: "Identify and address IT control risks before they impact operations."
      },
      {
        title: "Operational Efficiency",
        description: "Improve IT operational efficiency through optimized controls and processes."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build stakeholder confidence through demonstrated IT control effectiveness."
      }
    ],
    process: [
      {
        step: 1,
        title: "Initial Assessment",
        description: "Review current IT control environment and identify testing scope.",
        duration: "1-2 weeks"
      },
      {
        step: 2,
        title: "Control Testing Planning",
        description: "Develop comprehensive testing plan and methodology.",
        duration: "1-2 weeks"
      },
      {
        step: 3,
        title: "Control Testing Execution",
        description: "Conduct detailed testing of IT general controls.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Findings Analysis",
        description: "Analyze test results and identify control gaps.",
        duration: "2-3 weeks"
      },
      {
        step: 5,
        title: "Recommendations Development",
        description: "Develop detailed recommendations for improvement.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Access to IT systems and documentation",
      "IT team availability for interviews",
      "Current control documentation",
      "System access logs",
      "Change management records",
      "IT policies and procedures",
      "Previous audit reports",
      "IT organization chart"
    ],
    deliverables: [
      "Detailed control testing report",
      "Gap analysis document",
      "Control recommendations",
      "Executive summary",
      "Technical findings report",
      "Remediation roadmap",
      "Control matrix",
      "Test evidence documentation"
    ],
    pricing: {
      startingFrom: 250000,
      currency: "INR",
      includes: [
        "Complete control testing program",
        "All testing documentation",
        "Gap analysis report",
        "Recommendations document",
        "Executive presentation",
        "30 days post-report support"
      ],
      excludes: [
        "Remediation implementation",
        "Software tools or licenses",
        "Hardware modifications",
        "Ongoing monitoring services"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "3-4 months",
    isActive: true,
    priority: 25
  },
  {
    title: "Business Process Control Testing Services",
    slug: "business-process-control-testing-services",
    category: "Audit and Assurance Services",
    shortDescription: "Comprehensive business process control testing services to evaluate and improve controls within company's business processes ensuring accuracy, integrity, and efficiency.",
    detailedDescription: "Our Business Process Control Testing service provides thorough evaluation of controls embedded within your organization's critical business processes. We assess key process controls to ensure accuracy, integrity, and efficiency of operations. Our expert auditors examine end-to-end business processes, testing controls at each significant point to verify their effectiveness and identify opportunities for improvement. Through systematic testing and evaluation, we help organizations strengthen their control environment and optimize their business operations.",
    icon: "📊",
    features: [
      "Process control mapping",
      "Control design assessment",
      "Control effectiveness testing",
      "Process efficiency evaluation",
      "Segregation of duties review",
      "Transaction testing",
      "Exception handling review",
      "Documentation assessment",
      "Control monitoring evaluation",
      "Reporting mechanism review"
    ],
    benefits: [
      {
        title: "Process Integrity",
        description: "Ensure business process integrity through effective controls."
      },
      {
        title: "Operational Efficiency",
        description: "Improve operational efficiency through optimized process controls."
      },
      {
        title: "Risk Management",
        description: "Enhance risk management through robust process controls."
      },
      {
        title: "Compliance Assurance",
        description: "Maintain compliance with relevant process control requirements."
      },
      {
        title: "Performance Improvement",
        description: "Drive performance improvement through effective controls."
      }
    ],
    process: [
      {
        step: 1,
        title: "Process Assessment",
        description: "Review current business processes and control environment.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Control Testing Planning",
        description: "Develop comprehensive testing approach and methodology.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Control Testing Execution",
        description: "Conduct detailed testing of process controls.",
        duration: "6-8 weeks"
      },
      {
        step: 4,
        title: "Analysis and Reporting",
        description: "Analyze findings and prepare detailed reports.",
        duration: "3-4 weeks"
      }
    ],
    requirements: [
      "Process documentation",
      "Control documentation",
      "Access to key personnel",
      "Transaction records",
      "System access",
      "Previous audit reports",
      "Policy documentation",
      "Procedure manuals"
    ],
    deliverables: [
      "Process control map",
      "Testing results report",
      "Control gap analysis",
      "Recommendations document",
      "Executive summary",
      "Control matrix",
      "Evidence documentation",
      "Remediation plan"
    ],
    pricing: {
      startingFrom: 300000,
      currency: "INR",
      includes: [
        "Complete control testing program",
        "Process documentation review",
        "Control testing execution",
        "Gap analysis report",
        "Recommendations document",
        "30 days support"
      ],
      excludes: [
        "Process redesign",
        "Control implementation",
        "Software tools",
        "Ongoing monitoring"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "4-5 months",
    isActive: true,
    priority: 26
  },
  {
    title: "Internal Audit Co-Sourcing Services",
    slug: "internal-audit-co-sourcing-services",
    category: "Audit and Assurance Services",
    shortDescription: "Professional internal audit co-sourcing services providing expert support to supplement or manage your organization's internal audit function.",
    detailedDescription: "Our Internal Audit Co-Sourcing service provides expert support to enhance or manage your organization's internal audit function. We partner with your team to deliver comprehensive internal audit services, bringing specialized skills and industry expertise to complement your internal capabilities. Our approach combines your organizational knowledge with our professional experience to create an effective and efficient internal audit function that adds value to your organization.",
    icon: "🤝",
    features: [
      "Audit planning and strategy",
      "Risk assessment support",
      "Audit program development",
      "Specialized audit expertise",
      "Quality assurance review",
      "Staff training and development",
      "Technology enablement",
      "Best practice sharing",
      "Continuous improvement",
      "Resource optimization"
    ],
    benefits: [
      {
        title: "Enhanced Capabilities",
        description: "Access specialized skills and expertise to enhance internal audit capabilities."
      },
      {
        title: "Cost Efficiency",
        description: "Optimize costs through flexible resource allocation and shared expertise."
      },
      {
        title: "Quality Improvement",
        description: "Improve audit quality through professional methodologies and best practices."
      },
      {
        title: "Resource Flexibility",
        description: "Gain resource flexibility to handle varying audit demands."
      },
      {
        title: "Knowledge Transfer",
        description: "Benefit from knowledge transfer and skill development."
      }
    ],
    process: [
      {
        step: 1,
        title: "Needs Assessment",
        description: "Evaluate current internal audit function and identify needs.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Partnership Planning",
        description: "Develop co-sourcing strategy and resource plan.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Implementation",
        description: "Implement co-sourcing arrangement and begin service delivery.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Ongoing Management",
        description: "Manage and optimize co-sourcing relationship.",
        duration: "Ongoing"
      }
    ],
    requirements: [
      "Internal audit charter",
      "Audit committee support",
      "Management commitment",
      "Resource allocation",
      "Technology access",
      "Documentation access",
      "Staff cooperation",
      "Communication channels"
    ],
    deliverables: [
      "Co-sourcing agreement",
      "Resource plan",
      "Audit programs",
      "Progress reports",
      "Audit reports",
      "Quality assessments",
      "Training materials",
      "Performance metrics"
    ],
    pricing: {
      startingFrom: 500000,
      currency: "INR",
      includes: [
        "Dedicated audit resources",
        "Methodology support",
        "Quality assurance",
        "Progress reporting",
        "Knowledge transfer",
        "Continuous support"
      ],
      excludes: [
        "Software licenses",
        "Travel expenses",
        "Technology infrastructure",
        "Non-audit activities"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "12 months minimum",
    isActive: true,
    priority: 27
  },
  {
    title: "SOX Internal Audit Support Services",
    slug: "sox-internal-audit-support-services",
    category: "Audit and Assurance Services",
    shortDescription: "Specialized internal audit support services focused on Sarbanes-Oxley Act compliance, ensuring effective internal controls over financial reporting.",
    detailedDescription: "Our SOX Internal Audit Support service provides specialized assistance for organizations needing to comply with Sarbanes-Oxley Act requirements. We help design, implement, and test internal controls over financial reporting to ensure SOX compliance. Our expert team brings deep knowledge of SOX requirements and best practices to help organizations maintain effective control environments and achieve compliance objectives.",
    icon: "📋",
    features: [
      "SOX compliance assessment",
      "Control design review",
      "Control testing support",
      "Documentation assistance",
      "Risk assessment",
      "Remediation guidance",
      "Test plan development",
      "Evidence collection",
      "Reporting support",
      "Training and guidance"
    ],
    benefits: [
      {
        title: "Compliance Assurance",
        description: "Ensure compliance with SOX requirements through effective controls."
      },
      {
        title: "Risk Management",
        description: "Improve risk management through robust control testing."
      },
      {
        title: "Quality Enhancement",
        description: "Enhance quality of financial reporting controls."
      },
      {
        title: "Efficiency Improvement",
        description: "Improve efficiency of SOX compliance processes."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build stakeholder confidence through demonstrated compliance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Compliance Assessment",
        description: "Evaluate current SOX compliance status and needs.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Planning and Strategy",
        description: "Develop comprehensive support strategy and approach.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Implementation Support",
        description: "Provide ongoing support for SOX compliance activities.",
        duration: "Ongoing"
      },
      {
        step: 4,
        title: "Testing and Review",
        description: "Support testing and review of controls.",
        duration: "Quarterly"
      }
    ],
    requirements: [
      "Financial documentation",
      "Control documentation",
      "Process documentation",
      "Access to key personnel",
      "System access",
      "Previous audit reports",
      "Management support",
      "Resource allocation"
    ],
    deliverables: [
      "Compliance assessment report",
      "Control documentation",
      "Test plans",
      "Test results",
      "Remediation plans",
      "Progress reports",
      "Training materials",
      "Final reports"
    ],
    pricing: {
      startingFrom: 600000,
      currency: "INR",
      includes: [
        "Compliance support",
        "Testing assistance",
        "Documentation help",
        "Training support",
        "Regular reporting",
        "Ongoing guidance"
      ],
      excludes: [
        "External audit fees",
        "Software licenses",
        "Technology infrastructure",
        "Legal consultation"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "12 months minimum",
    isActive: true,
    priority: 28
  },
  {
    title: "SOC 1 Audit Report Services",
    slug: "soc-1-audit-report-services",
    category: "Audit and Assurance Services",
    shortDescription: "Comprehensive SOC 1 audit services providing assurance on internal controls relevant to financial reporting for service organizations.",
    detailedDescription: "Our SOC 1 Audit Report service provides thorough examination and reporting on internal controls relevant to financial reporting for service organizations. We help organizations prepare for and undergo SOC 1 audits, ensuring controls are properly designed and operating effectively. Our expert team guides you through the entire process, from readiness assessment to final report issuance.",
    icon: "📃",
    features: [
      "Control design assessment",
      "Control testing",
      "Documentation review",
      "Gap analysis",
      "Remediation guidance",
      "Report preparation",
      "Quality assurance",
      "Stakeholder communication",
      "Best practice guidance",
      "Continuous support"
    ],
    benefits: [
      {
        title: "Client Assurance",
        description: "Provide assurance to clients about control effectiveness."
      },
      {
        title: "Risk Management",
        description: "Improve risk management through control assessment."
      },
      {
        title: "Competitive Advantage",
        description: "Gain competitive advantage through demonstrated controls."
      },
      {
        title: "Process Improvement",
        description: "Identify and implement process improvements."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build stakeholder confidence through independent assurance."
      }
    ],
    process: [
      {
        step: 1,
        title: "Readiness Assessment",
        description: "Evaluate current control environment and readiness.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Audit Planning",
        description: "Develop comprehensive audit approach and plan.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Testing Execution",
        description: "Conduct detailed control testing and evaluation.",
        duration: "6-8 weeks"
      },
      {
        step: 4,
        title: "Reporting",
        description: "Prepare and issue final SOC 1 report.",
        duration: "3-4 weeks"
      }
    ],
    requirements: [
      "Control documentation",
      "Process documentation",
      "Access to systems",
      "Staff availability",
      "Previous reports",
      "Management support",
      "Client communication",
      "Resource allocation"
    ],
    deliverables: [
      "Readiness assessment",
      "Gap analysis",
      "Testing results",
      "Draft report",
      "Final SOC 1 report",
      "Management letter",
      "Presentation materials",
      "Recommendations"
    ],
    pricing: {
      startingFrom: 400000,
      currency: "INR",
      includes: [
        "Complete audit program",
        "Testing execution",
        "Report preparation",
        "Quality review",
        "Management presentation",
        "30 days support"
      ],
      excludes: [
        "Remediation costs",
        "Software tools",
        "Technology changes",
        "Ongoing monitoring"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "3-4 months",
    isActive: true,
    priority: 29
  },
  {
    title: "SOC 2 Type 1 Audit Services",
    slug: "soc-2-type-1-audit-services",
    category: "Audit and Assurance Services",
    shortDescription: "Comprehensive SOC 2 Type 1 audit services evaluating the design of controls at a specific point in time for service organizations.",
    detailedDescription: "Our SOC 2 Type 1 Audit service provides thorough examination of control design at a specific point in time for service organizations. We evaluate controls related to security, availability, processing integrity, confidentiality, and privacy. Our expert team guides organizations through the entire process, from readiness assessment to final report issuance, ensuring controls are properly designed to meet Trust Services Criteria.",
    icon: "🔒",
    features: [
      "Control design assessment",
      "Trust criteria evaluation",
      "Documentation review",
      "Gap analysis",
      "Readiness assessment",
      "Report preparation",
      "Quality assurance",
      "Best practice guidance",
      "Risk assessment",
      "Remediation support"
    ],
    benefits: [
      {
        title: "Control Assurance",
        description: "Demonstrate effective control design to stakeholders."
      },
      {
        title: "Market Confidence",
        description: "Build market confidence through independent assessment."
      },
      {
        title: "Risk Management",
        description: "Enhance risk management through control evaluation."
      },
      {
        title: "Competitive Edge",
        description: "Gain competitive advantage through demonstrated controls."
      },
      {
        title: "Process Improvement",
        description: "Identify opportunities for control improvement."
      }
    ],
    process: [
      {
        step: 1,
        title: "Readiness Assessment",
        description: "Evaluate current control environment and readiness.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Audit Planning",
        description: "Develop comprehensive audit approach and plan.",
        duration: "2-3 weeks"
      },
      {
        step: 3,
        title: "Design Evaluation",
        description: "Evaluate control design against Trust Services Criteria.",
        duration: "4-6 weeks"
      },
      {
        step: 4,
        title: "Reporting",
        description: "Prepare and issue final SOC 2 Type 1 report.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Control documentation",
      "System description",
      "Access to systems",
      "Staff availability",
      "Previous reports",
      "Management support",
      "Resource allocation",
      "Communication channels"
    ],
    deliverables: [
      "Readiness assessment",
      "Gap analysis",
      "Design evaluation",
      "Draft report",
      "Final SOC 2 Type 1 report",
      "Management letter",
      "Presentation materials",
      "Recommendations"
    ],
    pricing: {
      startingFrom: 350000,
      currency: "INR",
      includes: [
        "Complete audit program",
        "Design evaluation",
        "Report preparation",
        "Quality review",
        "Management presentation",
        "30 days support"
      ],
      excludes: [
        "Remediation costs",
        "Software tools",
        "Technology changes",
        "Ongoing monitoring"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "2-3 months",
    isActive: true,
    priority: 30
  },
  {
    title: "SOC 2 Type 2 Audit Services",
    slug: "soc-2-type-2-audit-services",
    category: "Audit and Assurance Services",
    shortDescription: "Comprehensive SOC 2 Type 2 audit services evaluating the operating effectiveness of controls over time for service organizations.",
    detailedDescription: "Our SOC 2 Type 2 Audit service provides thorough examination of control operating effectiveness over a specified period for service organizations. We evaluate controls related to security, availability, processing integrity, confidentiality, and privacy, testing their operation over time. Our expert team guides organizations through the entire process, ensuring controls are operating effectively to meet Trust Services Criteria.",
    icon: "🔐",
    features: [
      "Control effectiveness testing",
      "Trust criteria evaluation",
      "Operational assessment",
      "Sample testing",
      "Evidence collection",
      "Documentation review",
      "Gap analysis",
      "Quality assurance",
      "Risk assessment",
      "Continuous monitoring"
    ],
    benefits: [
      {
        title: "Operational Assurance",
        description: "Demonstrate effective control operation over time."
      },
      {
        title: "Stakeholder Trust",
        description: "Build stakeholder trust through proven effectiveness."
      },
      {
        title: "Risk Management",
        description: "Enhance risk management through ongoing evaluation."
      },
      {
        title: "Market Confidence",
        description: "Increase market confidence through demonstrated reliability."
      },
      {
        title: "Process Validation",
        description: "Validate control effectiveness through extended testing."
      }
    ],
    process: [
      {
        step: 1,
        title: "Planning Phase",
        description: "Define scope and develop testing approach.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Initial Testing",
        description: "Begin control testing and evidence collection.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Ongoing Monitoring",
        description: "Continue testing throughout observation period.",
        duration: "6 months"
      },
      {
        step: 4,
        title: "Final Testing and Reporting",
        description: "Complete testing and prepare final report.",
        duration: "4-6 weeks"
      }
    ],
    requirements: [
      "Control documentation",
      "System description",
      "Access to systems",
      "Staff availability",
      "Previous reports",
      "Management support",
      "Resource allocation",
      "Extended testing period"
    ],
    deliverables: [
      "Testing plan",
      "Periodic updates",
      "Evidence collection",
      "Draft report",
      "Final SOC 2 Type 2 report",
      "Management letter",
      "Presentation materials",
      "Recommendations"
    ],
    pricing: {
      startingFrom: 600000,
      currency: "INR",
      includes: [
        "Complete audit program",
        "Extended testing period",
        "Report preparation",
        "Quality review",
        "Management presentation",
        "30 days support"
      ],
      excludes: [
        "Remediation costs",
        "Software tools",
        "Technology changes",
        "Additional testing periods"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "6-8 months",
    isActive: true,
    priority: 31
  },
  {
    title: "Third-Party Auditing Services",
    slug: "third-party-auditing-services",
    category: "Audit and Assurance Services",
    shortDescription: "Professional third-party auditing services providing independent assessment and assurance for organizations across various domains.",
    detailedDescription: "Our Third-Party Auditing service provides independent assessment and assurance for organizations needing external validation of their operations, processes, or controls. We conduct thorough audits across various domains, delivering objective insights and recommendations. Our expert auditors bring industry knowledge and best practices to help organizations improve their operations and demonstrate compliance to stakeholders.",
    icon: "⚖️",
    features: [
      "Independent assessment",
      "Comprehensive review",
      "Industry expertise",
      "Risk evaluation",
      "Process analysis",
      "Control testing",
      "Documentation review",
      "Stakeholder interviews",
      "Evidence collection",
      "Reporting and insights"
    ],
    benefits: [
      {
        title: "Independent Assurance",
        description: "Provide stakeholders with independent validation and assurance."
      },
      {
        title: "Risk Management",
        description: "Improve risk management through external assessment."
      },
      {
        title: "Process Improvement",
        description: "Identify opportunities for operational improvement."
      },
      {
        title: "Stakeholder Confidence",
        description: "Build stakeholder confidence through third-party validation."
      },
      {
        title: "Compliance Demonstration",
        description: "Demonstrate compliance through independent review."
      }
    ],
    process: [
      {
        step: 1,
        title: "Audit Planning",
        description: "Define scope and develop audit approach.",
        duration: "2-3 weeks"
      },
      {
        step: 2,
        title: "Fieldwork Execution",
        description: "Conduct detailed audit procedures and testing.",
        duration: "4-6 weeks"
      },
      {
        step: 3,
        title: "Analysis and Evaluation",
        description: "Analyze findings and evaluate results.",
        duration: "2-3 weeks"
      },
      {
        step: 4,
        title: "Reporting and Recommendations",
        description: "Prepare final report and recommendations.",
        duration: "2-3 weeks"
      }
    ],
    requirements: [
      "Access to documentation",
      "Staff availability",
      "System access",
      "Process information",
      "Previous reports",
      "Management support",
      "Resource allocation",
      "Communication channels"
    ],
    deliverables: [
      "Audit plan",
      "Testing results",
      "Findings report",
      "Recommendations",
      "Executive summary",
      "Detailed analysis",
      "Evidence documentation",
      "Follow-up plan"
    ],
    pricing: {
      startingFrom: 300000,
      currency: "INR",
      includes: [
        "Complete audit program",
        "Fieldwork execution",
        "Report preparation",
        "Quality review",
        "Management presentation",
        "30 days support"
      ],
      excludes: [
        "Remediation costs",
        "Software tools",
        "Technology changes",
        "Extended support"
      ]
    },
    paymentDetails: {
      moneyBackGuarantee: "30 days Money back guarantee",
      emiFacilities: "EMI facilities available 3-6 months for startups",
      termsAndConditions: "*terms and conditions apply"
    },
    duration: "2-3 months",
    isActive: true,
    priority: 32
  }
];

async function addAuditServices() {
  try {
    console.log('Adding Audit GRC Services...');
    
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
    const servicesWithUsers = auditServices.map(service => ({
      ...service,
      createdBy: defaultUser._id,
      updatedBy: defaultUser._id
    }));

    // Insert new GRC services
    const insertedServices = await GRCService.insertMany(servicesWithUsers);
    console.log(`Successfully added ${insertedServices.length} Audit GRC services`);

    console.log('Audit GRC Services added successfully!');
    
  } catch (error) {
    console.error('Error adding Audit GRC services:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the function
addAuditServices();