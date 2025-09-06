# Cyber Atix Backend API

A robust Node.js backend API for the Cyber Atix learning platform with proper MVC architecture.

## 🏗️ Architecture

```
simpleback/
├── config/           # Configuration files
│   ├── config.js     # Main configuration
│   ├── database.js   # MongoDB connection
│   └── passport.js   # Passport configuration
├── controllers/      # Business logic
│   ├── authController.js
│   └── userController.js
├── middleware/       # Custom middleware
│   ├── auth.js       # Authentication middleware
│   ├── validation.js # Input validation
│   └── errorHandler.js # Error handling
├── models/           # Database models
│   └── User.js       # User model
├── routes/           # API routes
│   ├── authRoutes.js # Authentication routes
│   ├── userRoutes.js # User management routes
│   └── index.js      # Main router
├── server.js         # Main server file
└── package.json
```

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Google OAuth 2.0 integration
  - Role-based access control (User, Admin, Instructor)
  - Password hashing with bcrypt

- **User Management**
  - User registration and login
  - Profile management
  - Password change functionality
  - User role management (Admin only)
  - User activation/deactivation

- **Security**
  - Helmet.js for security headers
  - Rate limiting
  - Input validation with express-validator
  - CORS configuration
  - Password strength requirements

- **Database**
  - MongoDB with Mongoose ODM
  - User schema with validation
  - Indexed fields for performance
  - Soft delete capabilities

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | User login | No |
| GET | `/verify` | Verify JWT token | Yes |
| GET | `/google` | Google OAuth login | No |
| GET | `/google/callback` | Google OAuth callback | No |
| GET | `/profile` | Get user profile | Yes |
| PUT | `/profile` | Update user profile | Yes |
| PUT | `/change-password` | Change password | Yes |
| POST | `/logout` | Logout user | Yes |

### User Management Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required | Role Required |
|--------|----------|-------------|---------------|---------------|
| GET | `/` | Get all users | Yes | Admin |
| GET | `/stats` | Get user statistics | Yes | Admin |
| GET | `/:id` | Get user by ID | Yes | Admin |
| PUT | `/:id/role` | Update user role | Yes | Admin |
| PUT | `/:id/deactivate` | Deactivate user | Yes | Admin |
| PUT | `/:id/activate` | Activate user | Yes | Admin |
| DELETE | `/:id` | Delete user | Yes | Admin |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## 🛠️ Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Google OAuth credentials

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment variables:
```bash
# Create .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cyberatix
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/cyberatix |
| `JWT_SECRET` | JWT secret key | Required |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Required |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Required |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `NODE_ENV` | Environment | development |

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback`
6. Update the credentials in your environment variables

## 📊 Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet.js**: Security headers
- **CORS**: Configured for frontend domain
- **Input Validation**: All inputs validated
- **Password Hashing**: bcrypt with salt rounds
- **JWT Security**: Secure token generation and verification

## 🧪 Testing

Test the API endpoints using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"Password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'
```

## 📝 Development

### Project Structure

- **Models**: Define database schemas and business logic
- **Controllers**: Handle HTTP requests and responses
- **Routes**: Define API endpoints and middleware
- **Middleware**: Custom middleware for authentication, validation, etc.
- **Config**: Configuration files for database, passport, etc.

### Adding New Features

1. Create model in `models/`
2. Create controller in `controllers/`
3. Create routes in `routes/`
4. Add middleware if needed
5. Update main router in `routes/index.js`

## 🚀 Deployment

1. Set production environment variables
2. Build the application
3. Start with PM2 or similar process manager
4. Use reverse proxy (Nginx) for production
5. Set up SSL certificates
6. Configure MongoDB Atlas for production

## 📄 License

This project is licensed under the MIT License.
