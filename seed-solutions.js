const mongoose = require('mongoose');
const Solution = require('./models/Solution');
const User = require('./models/User');
require('dotenv').config();

// Set default environment variables if not provided
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const solutionsData = [
  {
    solutionName: "Custom Web Application Development",
    category: "Software development",
    description: "Full-stack web application development using modern technologies like React, Node.js, and cloud platforms. We build scalable, secure, and user-friendly web applications tailored to your business needs.",
    price: 5000,
    duration: "4-8 weeks",
    shortDescription: "Custom web applications built with modern technologies",
    complexity: "Advanced",
    features: [
      "Responsive design",
      "User authentication",
      "Database integration",
      "API development",
      "Cloud deployment",
      "Security implementation"
    ],
    targetAudience: "Businesses looking to digitize their operations with custom web applications",
    deliverables: [
      "Fully functional web application",
      "Source code and documentation",
      "Deployment guide",
      "User manual",
      "3 months technical support"
    ],
    faq: [
      {
        question: "What technologies do you use?",
        answer: "We use modern technologies including React, Node.js, MongoDB, PostgreSQL, AWS, and other industry-standard tools."
      },
      {
        question: "How long does development take?",
        answer: "Development typically takes 4-8 weeks depending on complexity and requirements."
      }
    ],
    status: "Active",
    providerName: "Cyber Solutions Team",
    providerBio: "Expert developers with 10+ years of experience in web application development",
    providerExperience: "10+ years in full-stack development",
    providerQualifications: "Certified in React, Node.js, AWS, and security best practices"
  },
  {
    solutionName: "E-commerce Website Development",
    category: "Website Development",
    description: "Complete e-commerce website development with payment integration, inventory management, and admin dashboard. Built for scalability and security.",
    price: 3500,
    duration: "3-6 weeks",
    shortDescription: "Complete e-commerce solutions with payment integration",
    complexity: "Intermediate",
    features: [
      "Product catalog",
      "Shopping cart",
      "Payment gateway integration",
      "Order management",
      "Admin dashboard",
      "Mobile responsive"
    ],
    targetAudience: "Online retailers and businesses wanting to sell products online",
    deliverables: [
      "Complete e-commerce website",
      "Admin panel",
      "Payment integration",
      "SEO optimization",
      "Mobile app (optional)"
    ],
    faq: [
      {
        question: "Which payment gateways do you support?",
        answer: "We support Stripe, PayPal, Square, and other major payment processors."
      },
      {
        question: "Is the website mobile-friendly?",
        answer: "Yes, all our websites are fully responsive and mobile-optimized."
      }
    ],
    status: "Active",
    providerName: "Web Development Experts",
    providerBio: "Specialized in e-commerce solutions with proven track record",
    providerExperience: "8+ years in e-commerce development",
    providerQualifications: "Certified in e-commerce platforms and payment systems"
  },
  {
    solutionName: "Cloud Infrastructure Hardening",
    category: "Infra Hardening Solutions ( Cloud, Network , System)",
    description: "Comprehensive security hardening for cloud infrastructure including AWS, Azure, and Google Cloud. Network security, system hardening, and compliance implementation.",
    price: 8000,
    duration: "2-4 weeks",
    shortDescription: "Complete cloud infrastructure security hardening",
    complexity: "Enterprise",
    features: [
      "Cloud security assessment",
      "Network segmentation",
      "Access control implementation",
      "Encryption setup",
      "Monitoring and logging",
      "Compliance documentation"
    ],
    targetAudience: "Enterprises with cloud infrastructure requiring security hardening",
    deliverables: [
      "Security assessment report",
      "Hardened infrastructure",
      "Security policies",
      "Compliance documentation",
      "Monitoring setup"
    ],
    faq: [
      {
        question: "Which cloud platforms do you support?",
        answer: "We support AWS, Azure, Google Cloud, and hybrid cloud environments."
      },
      {
        question: "Do you provide compliance documentation?",
        answer: "Yes, we provide documentation for SOC 2, ISO 27001, and other compliance standards."
      }
    ],
    status: "Active",
    providerName: "Cloud Security Specialists",
    providerBio: "Certified cloud security experts with enterprise experience",
    providerExperience: "12+ years in cloud security and compliance",
    providerQualifications: "AWS Security, Azure Security, CISSP, CISM certified"
  },
  {
    solutionName: "Mobile Device Management (MDM) Implementation",
    category: "MDM/AV solutions",
    description: "Complete MDM solution implementation for mobile device security, application management, and policy enforcement across iOS and Android devices.",
    price: 4500,
    duration: "2-3 weeks",
    shortDescription: "Complete MDM solution for mobile device security",
    complexity: "Intermediate",
    features: [
      "Device enrollment",
      "App management",
      "Security policies",
      "Remote wipe capability",
      "Compliance monitoring",
      "User management"
    ],
    targetAudience: "Organizations managing mobile devices for employees",
    deliverables: [
      "MDM platform setup",
      "Device policies",
      "User training",
      "Administration guide",
      "Ongoing support"
    ],
    faq: [
      {
        question: "Which devices are supported?",
        answer: "We support iOS, Android, and Windows mobile devices."
      },
      {
        question: "Can you integrate with existing systems?",
        answer: "Yes, we can integrate with Active Directory and other enterprise systems."
      }
    ],
    status: "Active",
    providerName: "Mobile Security Team",
    providerBio: "Specialists in mobile device management and security",
    providerExperience: "7+ years in mobile security",
    providerQualifications: "Certified in mobile security and MDM platforms"
  },
  {
    solutionName: "Cybersecurity Awareness Training Program",
    category: "Awareness Training",
    description: "Comprehensive cybersecurity awareness training program for employees including phishing simulation, security best practices, and compliance training.",
    price: 2500,
    duration: "1-2 weeks",
    shortDescription: "Comprehensive cybersecurity awareness training",
    complexity: "Basic",
    features: [
      "Interactive training modules",
      "Phishing simulation",
      "Security assessments",
      "Compliance training",
      "Progress tracking",
      "Certification program"
    ],
    targetAudience: "Organizations wanting to improve employee cybersecurity awareness",
    deliverables: [
      "Training materials",
      "Phishing simulation platform",
      "Assessment reports",
      "Certificates",
      "Ongoing training schedule"
    ],
    faq: [
      {
        question: "How many employees can be trained?",
        answer: "Our program can scale to train hundreds of employees across multiple departments."
      },
      {
        question: "Is the training interactive?",
        answer: "Yes, we use interactive modules, simulations, and hands-on exercises."
      }
    ],
    status: "Active",
    providerName: "Security Training Institute",
    providerBio: "Cybersecurity training experts with proven methodologies",
    providerExperience: "15+ years in security training",
    providerQualifications: "Certified trainers with security and education backgrounds"
  },
  {
    solutionName: "Red Team Penetration Testing",
    category: "Red, Blue, Purple Team Assessment",
    description: "Comprehensive red team penetration testing to identify vulnerabilities and security gaps in your infrastructure, applications, and processes.",
    price: 12000,
    duration: "3-4 weeks",
    shortDescription: "Comprehensive red team penetration testing",
    complexity: "Enterprise",
    features: [
      "External penetration testing",
      "Internal network assessment",
      "Social engineering testing",
      "Physical security assessment",
      "Application security testing",
      "Detailed reporting"
    ],
    targetAudience: "Organizations requiring comprehensive security assessment",
    deliverables: [
      "Detailed penetration test report",
      "Vulnerability assessment",
      "Remediation recommendations",
      "Executive summary",
      "Follow-up testing"
    ],
    faq: [
      {
        question: "What is included in the assessment?",
        answer: "We test external networks, internal systems, applications, and conduct social engineering tests."
      },
      {
        question: "How long does the testing take?",
        answer: "Red team assessments typically take 3-4 weeks depending on scope and complexity."
      }
    ],
    status: "Active",
    providerName: "Elite Security Consultants",
    providerBio: "Certified ethical hackers with extensive penetration testing experience",
    providerExperience: "10+ years in penetration testing",
    providerQualifications: "CEH, OSCP, CISSP, and other security certifications"
  },
  {
    solutionName: "Blue Team Security Operations",
    category: "Red, Blue, Purple Team Assessment",
    description: "Blue team security operations including incident response, threat hunting, security monitoring, and defensive security implementation.",
    price: 10000,
    duration: "4-6 weeks",
    shortDescription: "Comprehensive blue team security operations",
    complexity: "Advanced",
    features: [
      "Security monitoring setup",
      "Incident response procedures",
      "Threat hunting",
      "SIEM implementation",
      "Security playbooks",
      "Team training"
    ],
    targetAudience: "Organizations wanting to strengthen their defensive security posture",
    deliverables: [
      "Security operations center setup",
      "Incident response procedures",
      "Monitoring dashboards",
      "Security playbooks",
      "Team training program"
    ],
    faq: [
      {
        question: "What tools do you implement?",
        answer: "We implement SIEM, EDR, threat intelligence platforms, and other security tools."
      },
      {
        question: "Do you provide 24/7 monitoring?",
        answer: "We can set up monitoring systems and provide guidance for 24/7 operations."
      }
    ],
    status: "Active",
    providerName: "Defensive Security Experts",
    providerBio: "Specialists in defensive security and incident response",
    providerExperience: "12+ years in security operations",
    providerQualifications: "GCIH, GCIA, CISSP, and incident response certifications"
  },
  {
    solutionName: "Purple Team Assessment",
    category: "Red, Blue, Purple Team Assessment",
    description: "Collaborative purple team assessment combining red and blue team methodologies to improve overall security posture through continuous testing and improvement.",
    price: 15000,
    duration: "6-8 weeks",
    shortDescription: "Collaborative purple team security assessment",
    complexity: "Enterprise",
    features: [
      "Red and blue team collaboration",
      "Continuous testing",
      "Security improvement cycles",
      "Team coordination",
      "Process optimization",
      "Metrics and reporting"
    ],
    targetAudience: "Organizations wanting to optimize their security operations",
    deliverables: [
      "Purple team assessment report",
      "Improved security processes",
      "Team coordination procedures",
      "Continuous improvement plan",
      "Metrics dashboard"
    ],
    faq: [
      {
        question: "How is purple team different from red/blue?",
        answer: "Purple team combines both offensive and defensive approaches for continuous security improvement."
      },
      {
        question: "What's the duration of the engagement?",
        answer: "Purple team assessments typically run for 6-8 weeks with ongoing collaboration."
      }
    ],
    status: "Active",
    providerName: "Purple Team Specialists",
    providerBio: "Experts in collaborative security testing and improvement",
    providerExperience: "8+ years in purple team methodologies",
    providerQualifications: "Certified in both offensive and defensive security practices"
  }
];

const seedSolutions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find or create a default admin user
    let adminUser = await User.findOne({ email: 'admin@cyberatrix.com' });
    if (!adminUser) {
      adminUser = new User({
        email: 'admin@cyberatrix.com',
        password: 'admin123', // This should be hashed in production
        role: 'admin'
      });
      await adminUser.save();
      console.log('Created default admin user');
    }

    // Clear existing solutions
    await Solution.deleteMany({});
    console.log('Cleared existing solutions');

    // Add admin user ID to all solutions
    const solutionsWithUser = solutionsData.map(solution => ({
      ...solution,
      createdBy: adminUser._id
    }));

    // Insert new solutions
    const solutions = await Solution.insertMany(solutionsWithUser);
    console.log(`Successfully seeded ${solutions.length} solutions`);

    // Display summary
    console.log('\n=== Solutions Summary ===');
    solutions.forEach(solution => {
      console.log(`- ${solution.solutionName} (${solution.category}) - $${solution.price}`);
    });

  } catch (error) {
    console.error('Error seeding solutions:', error);
  } finally {
    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
};

// Run the seeder
seedSolutions();
