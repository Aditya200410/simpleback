# Simple Backend - Authentication API

A simple Node.js authentication backend using Express, MongoDB, and JWT tokens.

## Features

- User registration with email and password
- User login with JWT token generation
- Password hashing with bcrypt
- Protected routes with JWT middleware
- MongoDB integration with Mongoose
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (copy from `env.example`):
```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

3. Update the `.env` file with your configuration (optional - defaults are provided):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/simpleadmin
JWT_SECRET=simple_admin_jwt_secret_key_2024_secure_token
NODE_ENV=development
```

**Note**: The server will work with default values even without a `.env` file.

4. Make sure MongoDB is running on your system

5. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes

All routes are prefixed with `/api/auth`

#### Register User
- **POST** `/api/auth/register`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
  ```

#### Get Current User (Protected)
- **GET** `/api/auth/me`
- **Headers**: 
  ```
  Authorization: Bearer jwt_token_here
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  }
  ```

### Health Check
- **GET** `/api/health`
- **Response**: 
  ```json
  {
    "success": true,
    "message": "Server is running!",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

## Project Structure

```
simpleback/
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   └── User.js             # User model schema
├── routes/
│   └── auth.js             # Authentication routes
├── server.js               # Main server file
├── package.json            # Dependencies and scripts
├── env.example             # Environment variables example
└── README.md               # This file
```

## Usage with Frontend

To use this backend with your frontend application:

1. Set the base URL to `http://localhost:5000/api`
2. For login/register, send POST requests to `/auth/login` or `/auth/register`
3. Store the returned JWT token in localStorage or sessionStorage
4. Include the token in the Authorization header for protected routes:
   ```
   Authorization: Bearer your_jwt_token_here
   ```

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created (registration)
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid credentials/token)
- 404: Not Found
- 500: Server Error
