# CSE341 Team 1 Final Project

## Book Store API

A RESTful API for managing a book store with authors and books. This project features OAuth authentication via GitHub, full CRUD operations, data validation, and comprehensive API documentation with Swagger.

## 🚀 Live Deployment

**Production URL:** [https://cse341-team1-final-project.onrender.com](https://cse341-team1-final-project.onrender.com)

**API Documentation:** [https://cse341-team1-final-project.onrender.com/swagger](https://cse341-team1-final-project.onrender.com/swagger)

## 📋 Features

- **Authentication**: OAuth 2.0 with GitHub
- **Books Management**: Create, read, update, and delete books
- **Authors Management**: Create, read, update, and delete authors
- **Data Validation**: Input validation using express-validator
- **API Documentation**: Interactive Swagger UI documentation
- **Error Handling**: Centralized error handling middleware
- **CORS Support**: Enabled for cross-origin requests
- **MongoDB Integration**: NoSQL database for data persistence

## 🛠️ Technologies Used

- **Node.js** & **Express.js**: Backend framework
- **MongoDB**: Database
- **Passport.js**: OAuth authentication with GitHub Strategy
- **Express Validator**: Request validation
- **Swagger**: API documentation
- **ESLint & Prettier**: Code quality and formatting
- **Nodemon**: Development hot-reload

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB instance
- GitHub OAuth App credentials

### Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cse341-team1-final-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3000/github/callback
   PORT=3000
   ```

4. Generate Swagger documentation:

   ```bash
   npm run swagger
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 🎯 API Endpoints

### Authentication

- `GET /login` - Initiate GitHub OAuth authentication
- `GET /logout` - Log out and destroy session

### Books (Protected routes require authentication)

- `GET /books` - Get all books (Public)
- `GET /books/:id` - Get a specific book by ID (Public)
- `POST /books` - Create a new book (Protected)
- `PUT /books/:id` - Update a book (Protected)
- `DELETE /books/:id` - Delete a book (Protected)

### Authors (Protected routes require authentication)

- `GET /authors` - Get all authors (Public)
- `GET /authors/:id` - Get a specific author by ID (Public)
- `POST /authors` - Create a new author (Protected)
- `PUT /authors/:id` - Update an author (Protected)
- `DELETE /authors/:id` - Delete an author (Protected)

### Documentation

- `GET /swagger` - View interactive API documentation

## 📝 Data Models

### Book Schema

```javascript
{
  title: String,
  authorId: String,
  isbn: String,
  publishedDate: String,
  publisher: String,
  genre: String,
  pageCount: Number,
  language: String,
  description: String,
  price: Number,
  inStock: Boolean
}
```

### Author Schema

```javascript
{
  firstName: String,
  lastName: String,
  biography: String,
  birthDate: String,
  nationality: String,
  email: String,
  website: String
}
```

### Store Scheme

```javascript
{
  name: String,
  location: String,
  established: String,
  contactEmail: String,
  contactPhone: String
}
```

### User Schema

```javascript
{
  githubId: String,
  username: String,
  displayName: String,
  profileUrl: String,
  emails: [String]
}
```

## 🔐 Authentication Flow

1. User visits `/login` to initiate GitHub OAuth
2. User is redirected to GitHub for authorization
3. After authorization, user is redirected back to the application
4. Session is created and maintained via cookies
5. Protected routes check for valid session before allowing access

## 🧪 Development Scripts

```bash
npm start        # Generate Swagger docs and start server
npm run dev      # Start with nodemon (hot-reload)
npm run swagger  # Generate Swagger documentation
npm run lint     # Run ESLint
npm run lint:fix # Fix ESLint issues
npm run format   # Format code with Prettier
```

## 📁 Project Structure

```
├── controllers/         # Route controllers
│   ├── authorsController.js
│   └── booksController.js
├── data/               # Database configuration
│   └── database.js
├── middleware/         # Custom middleware
│   ├── authenticate.js
│   ├── authorsValidation.js
│   ├── booksValidation.js
│   ├── errorHandler.js
│   └── validation.js
├── routes/            # API routes
│   ├── authors.js
│   ├── books.js
│   ├── index.js
│   └── swagger.js
├── server.js          # Express server setup
├── swagger.js         # Swagger documentation generator
└── package.json       # Project dependencies
```

## 👥 Authors

- Peter Mostert
- Samuel Gomez
- Kenneth Maberi

## 🤝 Contributing

This is a class project for CSE341.

## 📌 Notes

- All POST, PUT, and DELETE operations require authentication
- GET operations are publicly accessible
- The API uses MongoDB for data persistence
- Swagger documentation is automatically generated from route comments
