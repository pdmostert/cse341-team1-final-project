const { validateAuthor } = require("../middleware/authorsValidation");

describe("Authors Validation Middleware", () => {
    // just like c# setup
  let mockReq;
  let mockRes;
  let mockNext;

    // before each test, reset the mocks
  beforeEach(() => {
    mockReq = {
      body: {},
    };

      // mock response object with jest functions
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      };
      
    // mock next function
    mockNext = jest.fn();
  });

  // basic Tests to check if the middleware is defined and is an array
  test("validateAuthor should be defined and be an array", () => {
    expect(validateAuthor).toBeDefined();
    expect(Array.isArray(validateAuthor)).toBe(true);
    expect(validateAuthor.length).toBeGreaterThan(0);
  });

  // Test to check if validation passes with valid author data
  test("should pass validation with valid author data", async () => {
    mockReq.body = {
      firstName: "John",
      lastName: "Doe",
      biography: "A test biography",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "john@example.com",
      website: "https://example.com",
    };

    // Execute each middleware in the validateAuthor array
    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      // Stop if response was sent (validation failed)
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    // If validation passes, next() should be called and status should not be called
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  //test to check that validation fails when firstName is missing
  test("should fail validation when firstName is missing", async () => {
    mockReq.body = {
      lastName: "Doe",
      biography: "A test biography",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "john@example.com",
      website: "https://example.com",
    };

    // Execute each middleware in the validateAuthor array
    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      // Stop if response was sent (validation failed)
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    // If validation fails, status should be called with 400 and next should not be called
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should fail validation when lastName is missing", async () => {
    mockReq.body = {
      firstName: "John",
      biography: "A test biography",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "john@example.com",
      website: "https://example.com",
    };

    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should fail validation when email is invalid", async () => {
    mockReq.body = {
      firstName: "John",
      lastName: "Doe",
      biography: "A test biography",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "invalid-email",
      website: "https://example.com",
    };

    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should fail validation when website is invalid", async () => {
    mockReq.body = {
      firstName: "John",
      lastName: "Doe",
      biography: "A test biography",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "john@example.com",
      website: "not-a-url",
    };

    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should fail validation when birthDate is invalid", async () => {
    mockReq.body = {
      firstName: "John",
      lastName: "Doe",
      biography: "A test biography",
      birthDate: "invalid-date",
      nationality: "American",
      email: "john@example.com",
      website: "https://example.com",
    };

    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should fail validation when firstName is too short", async () => {
    mockReq.body = {
      firstName: "J",
      lastName: "Doe",
      biography: "A test biography",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "john@example.com",
      website: "https://example.com",
    };

    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("should pass validation when biography is optional and missing", async () => {
    mockReq.body = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
      nationality: "American",
      email: "john@example.com",
      website: "https://example.com",
    };

    for (const middleware of validateAuthor) {
      await middleware(mockReq, mockRes, mockNext);
      if (mockRes.status.mock.calls.length > 0) {
        break;
      }
    }

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });
});
