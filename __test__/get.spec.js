const request = require("supertest");

// Mock the database module BEFORE requiring app
jest.mock("../data/database", () => ({
  getDb: jest.fn(() => ({
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn(() => ({
          toArray: jest.fn(() => Promise.resolve([
            { _id: "507f1f77bcf86cd799439011", name: "Mock Data" }
          ]))
        })),
        findOne: jest.fn(() => Promise.resolve({ 
          _id: "507f1f77bcf86cd799439011", 
          name: "Mock Data" 
        }))
      }))
    }))
  }))
}));

const app = require("../app");

describe("GET /authors", () => {
  test("responds to /authors", async () => {
    const res = await request(app).get("/authors");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /authors/:id", async () => {
    const res = await request(app).get("/authors/507f1f77bcf86cd799439011");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /books", () => {
  test("responds to /books", async () => {
    const res = await request(app).get("/books");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /books/:id", async () => {
    const res = await request(app).get("/books/507f1f77bcf86cd799439011");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /stores", () => {
  test("responds to /stores", async () => {
    const res = await request(app).get("/stores");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /stores/:id", async () => {
    const res = await request(app).get("/stores/507f1f77bcf86cd799439011");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /users", () => {
  test("responds to /users", async () => {
    const res = await request(app).get("/users");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("responds to /users/:id", async () => {
    const res = await request(app).get("/users/507f1f77bcf86cd799439011");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});
