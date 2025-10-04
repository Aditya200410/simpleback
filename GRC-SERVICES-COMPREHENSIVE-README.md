# GRC Services Database Seeding Scripts

This directory contains comprehensive scripts to populate the GRC (Governance, Risk, and Compliance) services database with detailed service information. Each script focuses on specific categories of GRC services and includes complete implementation details.

## Script Overview

### 1. AI/ML Services (`add-ai-ml-grc-services.js`)
**Services Added:**
- NIST AI RMF: AI Risk Management Framework Consultation and Implementation
- ISO 42001: AI Management Systems (AIMS) Consultation and Certification
- HITRUST + AI: Extended Healthcare Framework for AI Systems Consultation and Certification
- Adversarial Machine Learning: ML Security Consultation and Implementation

### 2. Business Continuity & Food Safety (`add-business-continuity-food-safety-services.js`)
**Services Added:**
- ISO 22301: Business Continuity Management Systems Consultation and Certification
- ISO 22000: Food Safety Management Systems Consultation and Certification
- HACCP: Hazard Analysis and Critical Control Points Consultation and Implementation

### 3. Additional Food Safety Services (`add-additional-food-safety-services.js`)
**Services Added:**
- FSSC: Food Safety System Certification Consultation and Certification
- HALAL: Islamic Food Certification Consultation and Certification
- KOSHER: Jewish Dietary Law Certification Consultation and Certification

### 4. Quality, Environmental & OHS (`add-quality-environmental-ohs-services.js`)
**Services Added:**
- ISO 9001: Quality Management Systems Consultation and Certification
- ISO 14001: Environmental Management Systems Consultation and Certification
- ISO 45001: Occupational Health and Safety Management Systems Consultation and Certification
- ISO 50001: Energy Management Systems Consultation and Certification

### 5. ESG & Sustainability (`add-esg-sustainability-services.js`)
**Services Added:**
- ESG Assessments: Environmental, Social, and Governance Performance Evaluation
- ESG Assurance: Independent Verification of ESG Data and Reporting
- ESG Certification: Environmental, Social, and Governance Standards Certification
- GHG Assurance: Greenhouse Gas Emissions Data Verification and Assurance

### 6. Audits & Attestation (`add-audits-attestation-services.js`)
**Services Added:**
- IT General Controls Testing: Comprehensive IT Controls Audit Services
- Business Process Control Testing: Comprehensive Business Controls Audit Services

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
node add-ai-ml-grc-services.js
node add-business-continuity-food-safety-services.js
node add-additional-food-safety-services.js
node add-quality-environmental-ohs-services.js
node add-esg-sustainability-services.js
node add-audits-attestation-services.js
```

### Running All Scripts
```bash
# Run all scripts sequentially
node add-ai-ml-grc-services.js && \
node add-business-continuity-food-safety-services.js && \
node add-additional-food-safety-services.js && \
node add-quality-environmental-ohs-services.js && \
node add-esg-sustainability-services.js && \
node add-audits-attestation-services.js
```

## Service Categories Covered

### 1. Artificial Intelligence & Machine Learning
- AI risk management frameworks
- AI management systems
- Healthcare AI security
- Adversarial ML security

### 2. Business Continuity & Food Safety
- Business continuity management
- Food safety management systems
- HACCP implementation
- Religious food certifications

### 3. Quality, Environmental & Occupational Health
- Quality management systems
- Environmental management
- Occupational health and safety
- Energy management

### 4. ESG & Sustainability
- ESG assessments and evaluations
- ESG assurance and verification
- ESG certification
- GHG emissions assurance

### 5. Audits & Attestation
- IT general controls testing
- Business process controls testing
- Internal audit services
- Third-party auditing

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

## Notes

- All services are set as active (`isActive: true`)
- Priority values are assigned sequentially (15-34)
- Services include comprehensive pricing in INR
- All services include 30-day money-back guarantee
- EMI facilities available for startup companies
- 12 months post-implementation support included

## Total Services Added

**Total: 18 comprehensive GRC services** covering:
- 4 AI/ML services
- 3 Business Continuity & Food Safety services
- 3 Additional Food Safety services
- 4 Quality, Environmental & OHS services
- 4 ESG & Sustainability services
- 2 Audits & Attestation services

Each service includes detailed implementation guidance, pricing information, and comprehensive feature descriptions to support the GRC service offering.
