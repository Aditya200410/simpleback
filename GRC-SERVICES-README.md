# GRC Services Seeding Scripts

This directory contains comprehensive scripts to seed your MongoDB database with detailed GRC (Governance, Risk, and Compliance) services for the "Consultation and Certification services" category.

## Scripts Overview

### 1. `seed-grc-services-detailed.js`
- Contains the first GRC service (ISO 27001 ISMS)
- Complete implementation with all model fields filled
- Includes comprehensive descriptions, features, benefits, process steps, requirements, deliverables, pricing, FAQs, and case studies

### 2. `add-additional-grc-services.js`
- Adds ISO 27701 (PIMS) and ISO 27017 (Cloud Security) services
- Extends the initial seeding with additional services
- Maintains the same comprehensive field structure

### 3. `add-remaining-grc-services.js`
- Adds ISO 27018 (PII Protection) and ISO 20000-1 (ITSM) services
- Continues building the comprehensive service catalog
- Includes all remaining services from your specification

### 4. `seed-all-grc-services.js`
- Master script that seeds all services in one go
- Includes ISO 27001 and ISO 27701 services
- Sets up related services references automatically

### 5. `seed-comprehensive-grc-services.js`
- Most comprehensive script with all services
- Includes ISO 27001 and ISO 27701 with full details
- Ready for production use

## Services Included

### Information Security, Privacy, and IT Services:
- **ISO 27001**: Information Security Management Systems (ISMS)
- **ISO 27701**: Privacy Information Management Systems (PIMS)
- **ISO 27017**: Cloud Security
- **ISO 27018**: Protection of PII in Public Clouds
- **ISO 20000-1**: IT Service Management (ITSM)

### Additional Services (Ready for Implementation):
- CSA STAR: Cloud Security Alliance Security Trust Assurance and Risk
- NIST Implementation
- TISAX: Automotive Industry Security Standard
- PCI DSS: Payment Card Industry Data Security Standard
- GDPR: General Data Protection Regulation
- HIPAA: Health Insurance Portability and Accountability Act
- HITRUST: Healthcare Framework
- DPDP Act: Digital Personal Data Protection Act (India)
- DORA Compliance: Digital Operational Resilience Act

### AI and ML Services:
- NIST AI RMF: AI Risk Management Framework
- ISO 42001: AI Management Systems (AIMS)
- HITRUST + AI: Extended Framework for AI
- Adversarial Machine Learning Security

### Quality, Environmental, and OHS Services:
- ISO 9001: Quality Management Systems
- ISO 14001: Environmental Management Systems
- ISO 45001: Occupational Health and Safety Management Systems
- ISO 50001: Energy Management Systems

## How to Use

### Option 1: Run Individual Scripts
```bash
# Start with the basic services
node seed-grc-services-detailed.js

# Add additional services
node add-additional-grc-services.js

# Add remaining services
node add-remaining-grc-services.js
```

### Option 2: Run Comprehensive Script
```bash
# Run the most comprehensive script
node seed-comprehensive-grc-services.js
```

### Option 3: Run Master Script
```bash
# Run the master script with all services
node seed-all-grc-services.js
```

## Prerequisites

1. **MongoDB Connection**: Ensure your MongoDB is running and accessible
2. **User Account**: Make sure you have at least one user in your User collection (the script will use an admin user or the first available user)
3. **Environment Variables**: Set up your MongoDB connection string in environment variables or update the connection string in the scripts

## Script Features

Each script includes:

### Complete Field Implementation:
- **Basic Information**: title, slug, category, descriptions, icon
- **Content Arrays**: features, requirements, deliverables, industry, compliance
- **Structured Data**: benefits, process steps, FAQs, case studies
- **Pricing**: starting price, currency, includes/excludes
- **Payment Details**: money-back guarantee, EMI facilities, terms
- **Management**: duration, priority, active status
- **Relationships**: related services, created/updated by users
- **Timestamps**: automatic creation and update timestamps

### Database Features:
- **Indexes**: Optimized for performance with proper indexing
- **Validation**: Required field validation and data integrity
- **References**: Proper user references for audit trails
- **Related Services**: Automatic cross-referencing between services

## Customization

You can easily customize the scripts by:

1. **Modifying Service Data**: Update the service objects in each script
2. **Adding New Services**: Extend the arrays with additional service objects
3. **Changing Pricing**: Update the pricing structure for different markets
4. **Customizing Content**: Modify descriptions, features, and benefits to match your specific offerings
5. **Industry Focus**: Adjust industry and compliance arrays for your target markets

## Notes

- All scripts include comprehensive error handling
- Scripts automatically handle user references for audit trails
- Related services are automatically set up for cross-referencing
- All services are marked as active by default
- Priority ordering is set for proper display ordering
- Scripts can be run multiple times (they clear existing data first)

## Next Steps

After running these scripts, you can:

1. **Extend Services**: Add more services from your comprehensive list
2. **Customize Content**: Modify descriptions and features to match your specific offerings
3. **Update Pricing**: Adjust pricing based on your market and service levels
4. **Add Categories**: Create additional GRC service categories
5. **Integrate Frontend**: Connect these services to your frontend application

The scripts provide a solid foundation for a comprehensive GRC services catalog with professional-grade content and structure.
