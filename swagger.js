const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CSE 341 Final Project API",
    description: `API Documentation for CSE 341 Final Project - Book Store
    
    ## Authentication
    This API uses OAuth 2.0 with GitHub for authentication.

    **To authenticate:**
    1. Visit [/login](/login) to start the OAuth flow.
    2. After GitHub authorization, your session is maintained via cookies.

    ## Roles & Permissions
    - **Admins**: Full CRUD access to Books, Authors, Users, and Storefront details.
    - **Users**: Can view Books, Authors, and Storefront info; can view their own User profile.
    - **Public**: Can view Books, Authors, and Storefront information without logging in.

    **Protected Admin Routes (Require Admin Role):**
    - POST/PUT/DELETE /books
    - POST/PUT/DELETE /authors
    - GET/PUT/DELETE /users
    - POST/PUT/DELETE /store
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
      name: "Users",
      description: "Operations available to authenticated users",
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
      name: "Bookstore",
      description: "Publicly accessible storefront information",
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