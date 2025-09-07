const axios = require('axios');
const crypto = require('crypto');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');
const nodemailer = require('nodemailer');

// PhonePe configuration from environment
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT';
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const PHONEPE_API_URL = process.env.PHONEPE_API_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox';

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Create email transporter
let emailTransporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  emailTransporter = nodemailer.createTransporter(EMAIL_CONFIG);
}

// Generate PhonePe checksum
const generateChecksum = (payload, endpoint) => {
  const string = payload + endpoint + PHONEPE_SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + '###' + PHONEPE_SALT_INDEX;
};

// Verify PhonePe checksum
const verifyChecksum = (response, checksum) => {
  const string = response + PHONEPE_SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  return sha256 + '###' + PHONEPE_SALT_INDEX === checksum;
};

// Generate unique transaction ID
const generateTransactionId = () => {
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Send confirmation email
const sendConfirmationEmail = async (enrollmentData, paymentData) => {
  if (!emailTransporter) {
    console.log('Email not configured, skipping email send');
    return;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: enrollmentData.email,
      subject: '🎉 Course Enrollment Confirmation - SimpleLearn',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 30px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-badge { background: #10b981; color: white; padding: 10px 20px; border-radius: 25px; display: inline-block; margin: 20px 0; }
            .details-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
            .button { background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Enrollment Successful!</h1>
              <p>Welcome to SimpleLearn</p>
            </div>
            <div class="content">
              <div class="success-badge">✅ Payment Confirmed</div>
              
              <p>Dear ${enrollmentData.fullName},</p>
              
              <p>Congratulations! Your enrollment has been successfully confirmed. We're excited to have you join our learning community.</p>
              
              <div class="details-box">
                <h3>📚 Course Details</h3>
                <p><strong>Course:</strong> ${enrollmentData.courseName}</p>
                <p><strong>Enrollment ID:</strong> ${enrollmentData.enrollmentId}</p>
                <p><strong>Amount Paid:</strong> ₹${paymentData.amount}</p>
                <p><strong>Transaction ID:</strong> ${paymentData.transactionId}</p>
                <p><strong>Payment Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
              </div>
              
              <div class="details-box">
                <h3>👤 Student Information</h3>
                <p><strong>Name:</strong> ${enrollmentData.fullName}</p>
                <p><strong>Email:</strong> ${enrollmentData.email}</p>
                <p><strong>Phone:</strong> ${enrollmentData.phone}</p>
                <p><strong>Experience Level:</strong> ${enrollmentData.experience}</p>
              </div>
              
              <h3>🚀 What's Next?</h3>
              <ul>
                <li>You will receive course access details within 24 hours</li>
                <li>Check your email for learning materials and schedule</li>
                <li>Join our student community for support and networking</li>
                <li>Complete the course to earn your certificate</li>
              </ul>
              
              <p>If you have any questions, feel free to contact our support team.</p>
              
              <div class="footer">
                <p>Thank you for choosing SimpleLearn!</p>
                <p>Happy Learning! 📖✨</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully to:', enrollmentData.email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

// Create payment order
const createPaymentOrder = async (req, res) => {
  try {
    const { enrollmentId, amount, customerInfo } = req.body;

    if (!enrollmentId || !amount || !customerInfo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: enrollmentId, amount, customerInfo'
      });
    }

    // Verify enrollment exists
    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Check if already paid
    if (enrollment.paymentStatus === 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'Payment already completed for this enrollment'
      });
    }

    const transactionId = generateTransactionId();
    const merchantUserId = `USER_${enrollment._id}`;

    // PhonePe payment request payload
    const paymentPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: merchantUserId,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?transactionId=${transactionId}&enrollmentId=${enrollmentId}`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.API_BASE_URL || 'http://localhost:5000/api'}/payment/callback`,
      mobileNumber: customerInfo.phone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const endpoint = '/pg/v1/pay';
    const checksum = generateChecksum(payload, endpoint);

    const options = {
      method: 'POST',
      url: `${PHONEPE_API_URL}${endpoint}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: payload
      }
    };

    const response = await axios.request(options);

    if (response.data.success) {
      // Update enrollment with payment info
      enrollment.paymentId = transactionId;
      enrollment.paymentStatus = 'Pending';
      await enrollment.save();

      res.json({
        success: true,
        message: 'Payment order created successfully',
        data: {
          transactionId,
          paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
          enrollmentId: enrollment._id
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to create payment order',
        error: response.data.message
      });
    }
  } catch (error) {
    console.error('Create payment order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
};

// Handle payment callback
const handlePaymentCallback = async (req, res) => {
  try {
    const { response: callbackResponse } = req.body;
    const checksum = req.headers['x-verify'];

    // Verify checksum
    if (!verifyChecksum(callbackResponse, checksum)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid checksum'
      });
    }

    const decodedResponse = JSON.parse(Buffer.from(callbackResponse, 'base64').toString());
    const { merchantTransactionId, code, message } = decodedResponse;

    // Find enrollment by payment ID
    const enrollment = await Enrollment.findOne({ paymentId: merchantTransactionId });
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    if (code === 'PAYMENT_SUCCESS') {
      // Update enrollment status
      enrollment.paymentStatus = 'Paid';
      enrollment.status = 'Approved';
      enrollment.approvedDate = new Date();
      await enrollment.save();

      // Create or update student record
      let student = await Student.findOne({ email: enrollment.email });
      if (!student) {
        student = new Student({
          name: enrollment.fullName,
          email: enrollment.email,
          phone: enrollment.phone,
          enrolledCourses: [{
            course: enrollment.courseId,
            enrollmentDate: enrollment.enrollmentDate,
            status: 'Enrolled'
          }],
          totalAmountPaid: enrollment.courseAmount
        });
      } else {
        // Check if course already exists
        const existingCourse = student.enrolledCourses.find(
          course => course.course.toString() === enrollment.courseId.toString()
        );
        
        if (!existingCourse) {
          student.enrolledCourses.push({
            course: enrollment.courseId,
            enrollmentDate: enrollment.enrollmentDate,
            status: 'Enrolled'
          });
          student.totalAmountPaid += enrollment.courseAmount;
        }
      }
      await student.save();

      // Send confirmation email
      await sendConfirmationEmail(enrollment, {
        transactionId: merchantTransactionId,
        amount: enrollment.courseAmount
      });

      res.json({
        success: true,
        message: 'Payment successful',
        data: {
          transactionId: merchantTransactionId,
          enrollmentId: enrollment._id,
          status: 'success'
        }
      });
    } else {
      // Payment failed
      enrollment.paymentStatus = 'Failed';
      await enrollment.save();

      res.json({
        success: false,
        message: 'Payment failed',
        data: {
          transactionId: merchantTransactionId,
          enrollmentId: enrollment._id,
          status: 'failed',
          error: message
        }
      });
    }
  } catch (error) {
    console.error('Payment callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process payment callback',
      error: error.message
    });
  }
};

// Check payment status
const checkPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Transaction ID is required'
      });
    }

    const endpoint = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`;
    const checksum = generateChecksum('', endpoint);

    const options = {
      method: 'GET',
      url: `${PHONEPE_API_URL}${endpoint}`,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': PHONEPE_MERCHANT_ID
      }
    };

    const response = await axios.request(options);

    if (response.data.success) {
      const paymentData = response.data.data;
      
      // Find enrollment
      const enrollment = await Enrollment.findOne({ paymentId: transactionId });
      
      res.json({
        success: true,
        data: {
          transactionId,
          status: paymentData.state,
          amount: paymentData.amount / 100, // Convert from paise
          enrollmentId: enrollment ? enrollment._id : null,
          paymentMethod: paymentData.paymentInstrument?.type
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to fetch payment status',
        error: response.data.message
      });
    }
  } catch (error) {
    console.error('Check payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check payment status',
      error: error.message
    });
  }
};

module.exports = {
  createPaymentOrder,
  handlePaymentCallback,
  checkPaymentStatus
};
