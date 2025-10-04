# Security Assessment & Managed GRC Services Database Seeding Scripts

This directory contains comprehensive scripts to populate the GRC (Governance, Risk, and Compliance) services database with detailed Security Assessment and Testing services, as well as Managed GRC Services. Each script focuses on specific categories of services and includes complete implementation details.

## Script Overview

### 1. Security Assessment & Testing Services (`add-security-assessment-testing-services.js`)
**Services Added:**
- VAPT: On-premises Infrastructure Vulnerability Assessment & Penetration Testing
- VAPT: Cloud Infrastructure Vulnerability Assessment & Penetration Testing
- VAPT: Mobile Application Vulnerability Assessment & Penetration Testing (Android & iOS)
- VAPT: Web Application Vulnerability Assessment & Penetration Testing
- VAPT: SaaS Application Vulnerability Assessment & Penetration Testing

### 2. Additional Security Assessment Services (`add-additional-security-assessment-services.js`)
**Services Added:**
- Source Code Review: Comprehensive Security Code Analysis and Review
- CISF Implementation and Review: Cybersecurity Information Sharing and Forecast Framework

### 3. Managed GRC Services (`add-managed-grc-services.js`)
**Services Added:**
- Risk Management as a Service: Continuous Risk Identification, Assessment, and Mitigation
- Virtual DPO: Part-time Outsourced Data Protection Officer Services
- Virtual CISO: Part-time Outsourced Chief Information Security Officer Services

## Service Details

Each service includes comprehensive information:

### Core Information
- **Title**: Descriptive service name
- **Slug**: URL-friendly identifier
- **Category**: "Consultation and Certification services"
- **Short Description**: Brief service overview
- **Detailed Description**: Comprehensive service explanation
- **Icon**: Visual representation emoji

### Service Features
- Detailed feature list (10+ features per service)
- Comprehensive benefits analysis
- Step-by-step implementation process
- Requirements and prerequisites
- Deliverables and outcomes

### Pricing & Payment
- Starting price in INR
- Detailed inclusions and exclusions
- Payment terms and EMI options
- Money-back guarantee

### Implementation Details
- Duration estimates
- Industry applicability
- Compliance standards
- FAQ section
- Case studies with results

## Usage Instructions

### Prerequisites
1. Ensure MongoDB is running and accessible
2. Have a user account in the database (for createdBy/updatedBy fields)
3. Install required dependencies

### Running Individual Scripts
```bash
# Navigate to the backend directory
cd simpleback

# Run individual scripts
node add-security-assessment-testing-services.js
node add-additional-security-assessment-services.js
node add-managed-grc-services.js
```

### Running All Scripts
```bash
# Run all scripts sequentially
node add-security-assessment-testing-services.js && \
node add-additional-security-assessment-services.js && \
node add-managed-grc-services.js
```

## Service Categories Covered

### 1. Security Assessment & Testing
- **VAPT Services**: Comprehensive vulnerability assessment and penetration testing
  - On-premises Infrastructure VAPT
  - Cloud Infrastructure VAPT
  - Mobile Application VAPT (Android & iOS)
  - Web Application VAPT
  - SaaS Application VAPT
- **Source Code Review**: Security code analysis and review
- **CISF Implementation**: Cybersecurity Information Sharing and Forecast framework

### 2. Managed GRC Services
- **Risk Management as a Service**: Continuous risk management expertise
- **Virtual DPO**: Part-time outsourced Data Protection Officer
- **Virtual CISO**: Part-time outsourced Chief Information Security Officer

## Database Schema Compliance

All scripts comply with the GRCService model schema:
- Required fields: title, slug, category, shortDescription, detailedDescription
- Optional fields: icon, features, benefits, process, requirements, deliverables
- Pricing information: startingFrom, currency, includes, excludes
- Payment details: moneyBackGuarantee, emiFacilities, termsAndConditions
- Additional fields: duration, industry, compliance, faqs, caseStudies
- System fields: isActive, priority, createdBy, updatedBy

## Error Handling

Each script includes:
- MongoDB connection error handling
- User validation (ensures createdBy/updatedBy fields are populated)
- Graceful error reporting
- Automatic connection cleanup

## Service-Specific Details

### VAPT Services
- **Duration**: 6-8 weeks per assessment
- **Pricing Range**: ₹130,000 - ₹170,000
- **Industries**: All industries with IT infrastructure
- **Compliance**: Security assessment standards, penetration testing standards

### Source Code Review
- **Duration**: 4-6 weeks
- **Pricing**: ₹100,000
- **Industries**: Technology, software development, financial services
- **Compliance**: Secure coding standards, software security standards

### CISF Implementation
- **Duration**: 6-9 months
- **Pricing**: ₹200,000
- **Industries**: All industries requiring cybersecurity collaboration
- **Compliance**: CISF framework, cybersecurity information sharing standards

### Managed GRC Services
- **Duration**: Ongoing (subscription-based)
- **Pricing Range**: ₹40,000 - ₹60,000 per month
- **Industries**: All industries
- **Compliance**: Various standards based on service type

## Notes

- All services are set as active (`isActive: true`)
- Priority values are assigned sequentially (35-44)
- Services include comprehensive pricing in INR
- All services include 30-day money-back guarantee
- EMI facilities available for startup companies
- 12 months post-implementation support included
- Managed services are subscription-based with ongoing support

## Total Services Added

**Total: 10 comprehensive GRC services** covering:
- 5 VAPT services (different infrastructure types)
- 2 Additional Security Assessment services
- 3 Managed GRC services

Each service includes detailed implementation guidance, pricing information, and comprehensive feature descriptions to support the GRC service offering.

## Service Highlights

### VAPT Services
- Comprehensive vulnerability assessment and penetration testing
- Coverage of all major infrastructure types (on-premises, cloud, mobile, web, SaaS)
- Industry-specific security testing methodologies
- Detailed remediation guidance and follow-up support

### Security Assessment Services
- Source code security analysis and review
- CISF framework implementation for cybersecurity collaboration
- Advanced security testing tools and methodologies

### Managed GRC Services
- Subscription-based ongoing support models
- Expert-level services at cost-effective rates
- Continuous monitoring and improvement
- Scalable solutions for organizations of all sizes

This comprehensive suite of services provides complete coverage for security assessment, testing, and managed GRC needs across all organizational types and industries.
