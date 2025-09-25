const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // You can change this to other services
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  enrollmentConfirmation: (enrollment) => {
    return {
      subject: `Enrollment Confirmation - ${enrollment.courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Enrollment Confirmation</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Welcome to Cyberatrix Solutions!</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Hello ${enrollment.fullName}!</h2>
            
            <p>Thank you for enrolling in our course. Here are your enrollment details:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Enrollment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Enrollment ID:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.enrollmentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Course Name:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.courseName}</td>
                </tr>
                ${enrollment.batchName ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Batch:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.batchName}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Enrollment Type:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.enrollmentType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Status:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <span style="background: ${enrollment.status === 'Approved' ? '#d4edda' : '#fff3cd'}; color: ${enrollment.status === 'Approved' ? '#155724' : '#856404'}; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${enrollment.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Payment Status:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <span style="background: ${enrollment.paymentStatus === 'Paid' || enrollment.paymentStatus === 'Free' ? '#d4edda' : '#fff3cd'}; color: ${enrollment.paymentStatus === 'Paid' || enrollment.paymentStatus === 'Free' ? '#155724' : '#856404'}; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${enrollment.paymentStatus}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Amount:</td>
                  <td style="padding: 8px 0; color: #333;">₹${enrollment.courseAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Enrollment Date:</td>
                  <td style="padding: 8px 0; color: #333;">${new Date(enrollment.enrollmentDate).toLocaleDateString('en-IN')}</td>
                </tr>
              </table>
            </div>
            
            ${enrollment.status === 'Approved' ? `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0;">🎉 Congratulations!</h4>
              <p style="margin: 0;">Your enrollment has been approved! You can now start learning.</p>
            </div>
            ` : `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0;">⏳ Pending Approval</h4>
              <p style="margin: 0;">Your enrollment is pending approval. We'll review your application and get back to you soon.</p>
            </div>
            `}
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Next Steps</h3>
              <ul style="color: #555; line-height: 1.6;">
                <li>Check your email regularly for updates</li>
                <li>If you have any questions, contact our support team</li>
                <li>Once approved, you'll receive access to course materials</li>
                <li>Complete the course to receive your certificate</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2024 Cyberatrix Solutions. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">For support, contact us at support@cyberatrixsolutions.com</p>
          </div>
        </div>
      `
    };
  },

  adminNotification: (enrollment) => {
    return {
      subject: `New Enrollment - ${enrollment.courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">New Enrollment Alert</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Admin Notification</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">New Student Enrollment</h2>
            
            <p>A new student has enrolled in one of your courses. Here are the details:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Student Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Experience:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.experience}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Course Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Enrollment ID:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.enrollmentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Course:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.courseName}</td>
                </tr>
                ${enrollment.batchName ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Batch:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.batchName}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Amount:</td>
                  <td style="padding: 8px 0; color: #333;">₹${enrollment.courseAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Status:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <span style="background: ${enrollment.status === 'Approved' ? '#d4edda' : '#fff3cd'}; color: ${enrollment.status === 'Approved' ? '#155724' : '#856404'}; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${enrollment.status}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            ${enrollment.motivation ? `
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Student Motivation</h3>
              <p style="color: #555; line-height: 1.6; margin: 0;">${enrollment.motivation}</p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.ADMIN_URL || 'http://localhost:3001'}/enrollments" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                View in Admin Panel
              </a>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2024 Cyberatrix Solutions. All rights reserved.</p>
          </div>
        </div>
      `
    };
  },

  adminReply: (enrollment, replyMessage, adminName) => {
    return {
      subject: `Re: Your Enrollment - ${enrollment.courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Reply from Admin</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Cyberatrix Solutions</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-top: 0;">Hello ${enrollment.fullName}!</h2>
            
            <p>We have a response regarding your enrollment in <strong>${enrollment.courseName}</strong>:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Admin Response</h3>
              <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; margin: 10px 0;">
                <p style="margin: 0; color: #555; line-height: 1.6;">${replyMessage}</p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">
                <strong>From:</strong> ${adminName}<br>
                <strong>Date:</strong> ${new Date().toLocaleDateString('en-IN')}
              </p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin-top: 0;">Your Enrollment Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Enrollment ID:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.enrollmentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Course:</td>
                  <td style="padding: 8px 0; color: #333;">${enrollment.courseName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Status:</td>
                  <td style="padding: 8px 0; color: #333;">
                    <span style="background: ${enrollment.status === 'Approved' ? '#d4edda' : '#fff3cd'}; color: ${enrollment.status === 'Approved' ? '#155724' : '#856404'}; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${enrollment.status}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2024 Cyberatrix Solutions. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">For support, contact us at support@cyberatrixsolutions.com</p>
          </div>
        </div>
      `
    };
  }
};

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send enrollment confirmation email
const sendEnrollmentConfirmation = async (enrollment) => {
  const template = emailTemplates.enrollmentConfirmation(enrollment);
  return await sendEmail(enrollment.email, template.subject, template.html);
};

// Send admin notification email
const sendAdminNotification = async (enrollment) => {
  const template = emailTemplates.adminNotification(enrollment);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@cyberatrixsolutions.com';
  return await sendEmail(adminEmail, template.subject, template.html);
};

// Send admin reply email
const sendAdminReply = async (enrollment, replyMessage, adminName) => {
  const template = emailTemplates.adminReply(enrollment, replyMessage, adminName);
  return await sendEmail(enrollment.email, template.subject, template.html);
};

module.exports = {
  sendEmail,
  sendEnrollmentConfirmation,
  sendAdminNotification,
  sendAdminReply
};
