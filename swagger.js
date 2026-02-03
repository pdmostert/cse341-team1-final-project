const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE 341 Final Project API",
    description: `API Documentation for CSE 341 Final Project - Book Store
    
    ## Authentication

This API uses OAuth 2.0 with GitHub for authentication.

**To authenticate:**
1. Visit [/login](/login) to start the OAuth flow
2. You'll be redirected to GitHub to authorize the application
3. After authorization, you'll be redirected back and logged in
4. Your session will be maintained via cookies

**To logout:**
- Visit [/logout](/logout)

**Protected Routes:**
- POST /books - Create a new book (requires authentication)
- PUT /books/:id - Update a book (requires authentication)
- DELETE /books/:id - Delete a book (requires authentication)
- POST /authors - Create a new author (requires authentication)
- PUT /authors/:id - Update an author (requires authentication)
- DELETE /authors/:id - Delete an author (requires authentication)
    `,
    version: "1.0.0",
  },
  host: "cse341-team1-final-project.onrender.com",
  schemes: ["https"],
  tags: [
    {
      name: "Admins",
      description: "Operations restricted to administrative accounts",
    },
    {
      name: "Customers",
      description: "Operations available to authenticated customers",
    },
    {
      name: "Books",
      description: "Publicly accessible book information",
    },
    {
      name: "Authors",
      description: "Publicly accessible author information",
    },
    {
      name: "Stores",
      description: "Publicly accessible store information",
    },
  ],
  definitions: {
    User: {
      type: "object",
      properties: {
        githubId: { type: "string" },
        username: { type: "string" },
        displayName: { type: "string" },
        profilePic: { type: "string" },
        role: { type: "string", example: "customer" },
        createdAt: { type: "string", format: "date-time" },
      },
    },
    Book: {
      type: "object",
      properties: {
        title: { type: "string" },
        authorId: { type: "string" },
        isbn: { type: "string" },
        publishedDate: { type: "string", format: "date" },
        publisher: { type: "string" },
        genre: { type: "string" },
        pageCount: { type: "number" },
        language: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        inStock: { type: "boolean" },
      },
    },
    Author: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        biography: { type: "string" },
        birthDate: { type: "string", format: "date" },
        nationality: { type: "string" },
        email: { type: "string" },
        website: { type: "string" },
      },
    },
    Store: {
      type: "object",
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        established: { type: "string", format: "date" },
        contactEmail: { type: "string" },
        phoneNumber: { type: "string" },
      },
    },
  },
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
