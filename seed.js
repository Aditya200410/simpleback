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
        amount: 299.99,
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
        amount: 399.99,
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
        amount: 349.99,
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
        amount: 449.99,
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
        amount: 499.99,
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
