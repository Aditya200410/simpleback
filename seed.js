const mongoose = require('mongoose');
const Course = require('./models/Course');
const Student = require('./models/Student');
const User = require('./models/User');
require('dotenv').config();

// Set default environment variables if not provided
process.env.JWT_SECRET = process.env.JWT_SECRET || 'simple_admin_jwt_secret_key_2024_secure_token';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://lightyagami98k:UN1cr0DnJwISvvgs@cluster0.uwkswmj.mongodb.net/cyber?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('Clearing existing data...');
    await Course.deleteMany({});
    await Student.deleteMany({});

    // Create a sample admin user if it doesn't exist
    let adminUser = await User.findOne({ email: 'admin@simplelearn.com' });
    if (!adminUser) {
      adminUser = new User({
        email: 'admin@simplelearn.com',
        password: 'admin123'
      });
      await adminUser.save();
      console.log('Admin user created: admin@simplelearn.com / admin123');
    }

    // Sample courses data
    const coursesData = [
      {
        courseName: 'Full Stack Web Development',
        category: 'Web Development',
        description: 'Learn to build complete web applications using React, Node.js, and MongoDB. Cover frontend, backend, and database integration.',
        pricing: {
          online: {
            amount: 299.99,
            description: [
              'Self-paced online learning modules',
              'Lifetime access to course materials',
              'Interactive coding exercises',
              'Community forum support',
              'Certificate of completion',
              'Mobile app for learning on-the-go'
            ]
          },
          offline: {
            amount: 499.99,
            description: [
              'In-person classroom training',
              'Expert instructor guidance',
              'Hands-on project workshops',
              'Group learning sessions',
              'Networking opportunities',
              'Industry guest lectures',
              'Certificate of completion'
            ]
          },
          corporate: {
            amount: 999.99,
            description: [
              'Customized training for your team',
              'On-site or off-site delivery',
              'Tailored curriculum based on needs',
              'Dedicated project manager',
              'Post-training support',
              'Team progress tracking',
              'Bulk pricing available',
              'Certificates for all participants'
            ]
          }
        },
        amount: 299.99, // Legacy field for backward compatibility
        level: 'Intermediate',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-05-01'),
        totalHours: 120,
        status: 'Active',
        enrolledStudents: 25,
        createdBy: adminUser._id
      },
      {
        courseName: 'Data Science with Python',
        category: 'Data Science',
        description: 'Master data analysis, machine learning, and visualization using Python, Pandas, and Scikit-learn.',
        pricing: {
          online: {
            amount: 399.99,
            description: [
              'Self-paced online learning modules',
              'Jupyter notebook exercises',
              'Real-world datasets for practice',
              'Machine learning project portfolio',
              'Community forum support',
              'Certificate of completion'
            ]
          },
          offline: {
            amount: 699.99,
            description: [
              'In-person classroom training',
              'Expert data scientist instructor',
              'Hands-on data analysis workshops',
              'Group project collaboration',
              'Industry case studies',
              'Networking with data professionals',
              'Certificate of completion'
            ]
          },
          corporate: {
            amount: 1299.99,
            description: [
              'Customized data science training',
              'Company-specific datasets',
              'On-site or off-site delivery',
              'Dedicated data science mentor',
              'Team analytics projects',
              'Progress tracking dashboard',
              'Bulk pricing available',
              'Certificates for all participants'
            ]
          }
        },
        amount: 399.99,
        level: 'Intermediate',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-04-15'),
        totalHours: 100,
        status: 'Active',
        enrolledStudents: 18,
        createdBy: adminUser._id
      },
      {
        courseName: 'Mobile App Development with React Native',
        category: 'Mobile Development',
        description: 'Build cross-platform mobile applications for iOS and Android using React Native.',
        pricing: {
          online: {
            amount: 349.99,
            description: [
              'Self-paced online learning modules',
              'React Native development environment setup',
              'Cross-platform app building exercises',
              'App store deployment guidance',
              'Community forum support',
              'Certificate of completion'
            ]
          },
          offline: {
            amount: 599.99,
            description: [
              'In-person classroom training',
              'Expert mobile developer instructor',
              'Hands-on app development workshops',
              'Device testing and debugging',
              'App store submission process',
              'Networking with mobile developers',
              'Certificate of completion'
            ]
          },
          corporate: {
            amount: 1199.99,
            description: [
              'Customized mobile development training',
              'Company-specific app requirements',
              'On-site or off-site delivery',
              'Dedicated mobile development mentor',
              'Team app development projects',
              'Progress tracking dashboard',
              'Bulk pricing available',
              'Certificates for all participants'
            ]
          }
        },
        amount: 349.99,
        level: 'Beginner',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-06-01'),
        totalHours: 90,
        status: 'Active',
        enrolledStudents: 12,
        createdBy: adminUser._id
      },
      {
        courseName: 'Cybersecurity Fundamentals',
        category: 'Cybersecurity',
        description: 'Learn essential cybersecurity concepts, ethical hacking, and security best practices.',
        pricing: {
          online: {
            amount: 449.99,
            description: [
              'Self-paced online learning modules',
              'Virtual lab environment access',
              'Ethical hacking simulations',
              'Security assessment tools',
              'Community forum support',
              'Certificate of completion'
            ]
          },
          offline: {
            amount: 799.99,
            description: [
              'In-person classroom training',
              'Expert cybersecurity instructor',
              'Hands-on security testing labs',
              'Penetration testing workshops',
              'Industry security case studies',
              'Networking with security professionals',
              'Certificate of completion'
            ]
          },
          corporate: {
            amount: 1499.99,
            description: [
              'Customized cybersecurity training',
              'Company security assessment',
              'On-site or off-site delivery',
              'Dedicated security consultant',
              'Team security projects',
              'Security audit guidance',
              'Bulk pricing available',
              'Certificates for all participants'
            ]
          }
        },
        amount: 449.99,
        level: 'Advanced',
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-05-15'),
        totalHours: 80,
        status: 'Active',
        enrolledStudents: 8,
        createdBy: adminUser._id
      },
      {
        courseName: 'Cloud Computing with AWS',
        category: 'Cloud Computing',
        description: 'Master Amazon Web Services, cloud architecture, and deployment strategies.',
        pricing: {
          online: {
            amount: 499.99,
            description: [
              'Self-paced online learning modules',
              'AWS free tier account setup',
              'Hands-on cloud projects',
              'Architecture design exercises',
              'Community forum support',
              'Certificate of completion'
            ]
          },
          offline: {
            amount: 899.99,
            description: [
              'In-person classroom training',
              'Expert AWS certified instructor',
              'Hands-on cloud deployment labs',
              'Real-world architecture projects',
              'AWS certification preparation',
              'Networking with cloud professionals',
              'Certificate of completion'
            ]
          },
          corporate: {
            amount: 1699.99,
            description: [
              'Customized cloud training',
              'Company cloud migration strategy',
              'On-site or off-site delivery',
              'Dedicated cloud architect',
              'Team cloud projects',
              'Cost optimization guidance',
              'Bulk pricing available',
              'Certificates for all participants'
            ]
          }
        },
        amount: 499.99,
        level: 'Advanced',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        totalHours: 110,
        status: 'Completed',
        enrolledStudents: 15,
        createdBy: adminUser._id
      }
    ];

    console.log('Creating courses...');
    const createdCourses = await Course.insertMany(coursesData);
    console.log(`${createdCourses.length} courses created`);

    // Sample students data
    const studentsData = [
      {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1-555-0101',
        enrolledCourses: [
          {
            course: createdCourses[0]._id,
            enrollmentDate: new Date('2024-02-01'),
            status: 'Enrolled',
            progress: 75
          },
          {
            course: createdCourses[1]._id,
            enrollmentDate: new Date('2024-01-15'),
            status: 'Completed',
            progress: 100
          }
        ],
        certificates: [
          {
            course: createdCourses[1]._id,
            issuedDate: new Date('2024-04-15')
          }
        ],
        totalAmountPaid: 699.98,
        status: 'Active'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-0102',
        enrolledCourses: [
          {
            course: createdCourses[0]._id,
            enrollmentDate: new Date('2024-02-05'),
            status: 'Enrolled',
            progress: 60
          }
        ],
        totalAmountPaid: 299.99,
        status: 'Active'
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        phone: '+1-555-0103',
        enrolledCourses: [
          {
            course: createdCourses[2]._id,
            enrollmentDate: new Date('2024-03-01'),
            status: 'Enrolled',
            progress: 40
          },
          {
            course: createdCourses[3]._id,
            enrollmentDate: new Date('2024-02-15'),
            status: 'Enrolled',
            progress: 30
          }
        ],
        totalAmountPaid: 799.98,
        status: 'Active'
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1-555-0104',
        enrolledCourses: [
          {
            course: createdCourses[4]._id,
            enrollmentDate: new Date('2024-01-01'),
            status: 'Completed',
            progress: 100
          }
        ],
        certificates: [
          {
            course: createdCourses[4]._id,
            issuedDate: new Date('2024-03-31')
          }
        ],
        totalAmountPaid: 499.99,
        status: 'Graduated'
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1-555-0105',
        enrolledCourses: [
          {
            course: createdCourses[1]._id,
            enrollmentDate: new Date('2024-01-20'),
            status: 'Enrolled',
            progress: 85
          }
        ],
        totalAmountPaid: 399.99,
        status: 'Active'
      },
      {
        name: 'Lisa Martinez',
        email: 'lisa.martinez@email.com',
        phone: '+1-555-0106',
        enrolledCourses: [
          {
            course: createdCourses[0]._id,
            enrollmentDate: new Date('2024-02-10'),
            status: 'Enrolled',
            progress: 50
          },
          {
            course: createdCourses[2]._id,
            enrollmentDate: new Date('2024-03-05'),
            status: 'Enrolled',
            progress: 25
          }
        ],
        totalAmountPaid: 649.98,
        status: 'Active'
      }
    ];

    console.log('Creating students...');
    const createdStudents = [];
    for (const studentData of studentsData) {
      const student = new Student(studentData);
      await student.save();
      createdStudents.push(student);
    }
    console.log(`${createdStudents.length} students created`);

    console.log('\n=== SEED DATA SUMMARY ===');
    console.log(`✅ Courses created: ${createdCourses.length}`);
    console.log(`✅ Students created: ${createdStudents.length}`);
    console.log(`✅ Admin user: admin@simplelearn.com / admin123`);
    
    const totalRevenue = studentsData.reduce((sum, student) => sum + student.totalAmountPaid, 0);
    const totalCertificates = studentsData.reduce((sum, student) => sum + (student.certificates ? student.certificates.length : 0), 0);
    
    console.log(`💰 Total Revenue: $${totalRevenue}`);
    console.log(`🏆 Total Certificates: ${totalCertificates}`);
    console.log('\n✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
