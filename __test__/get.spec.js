const request = require("supertest");
const { ObjectId } = require("mongodb");

const app = require("../app");
const mongodb = require("../data/database");

beforeEach(async () => {
  const db = mongodb.getDb().db();
  await db.collection("authors").deleteMany({});
});

describe("GET /authors", () => {
  test("returns 200 and an array of authors", async () => {
    const db = mongodb.getDb().db();
    const seedAuthor = {
      firstName: "Jane",
      lastName: "Austen",
      biography: "Seed author for tests",
      birthDate: "1775-12-16",
      nationality: "British",
      email: "jane.austen@example.com",
      website: "https://example.com/jane-austen",
    };

    const insertResult = await db.collection("authors").insertOne(seedAuthor);
    const seededId = insertResult.insertedId.toString();

    const response = await request(app).get("/authors").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    const seeded = response.body.find((a) => a._id === seededId);
    expect(seeded).toBeDefined();
    expect(seeded.firstName).toBe(seedAuthor.firstName);
    expect(seeded.lastName).toBe(seedAuthor.lastName);
  });
});

describe("GET /authors/:id", () => {
  test("returns 400 for an invalid Mongo ObjectId", async () => {
    await request(app).get("/authors/not-a-valid-id").expect(400);
  });

  test("returns 404 for a valid but missing author id", async () => {
    const missingId = new ObjectId().toString();
    await request(app).get(`/authors/${missingId}`).expect(404);
  });

  test("returns 200 and the author for an existing id", async () => {
    const db = mongodb.getDb().db();
    const seedAuthor = {
      firstName: "Toni",
      lastName: "Morrison",
      biography: "Seed author for tests",
      birthDate: "1931-02-18",
      nationality: "American",
      email: "toni.morrison@example.com",
      website: "https://example.com/toni-morrison",
    };

    const insertResult = await db.collection("authors").insertOne(seedAuthor);
    const id = insertResult.insertedId.toString();

    const response = await request(app).get(`/authors/${id}`).expect(200);

    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(id);
    expect(response.body.firstName).toBe(seedAuthor.firstName);
    expect(response.body.lastName).toBe(seedAuthor.lastName);
  });
});

describe("GET /books", () => {
  test("returns 200 and an array of books", async () => {
    const db = mongodb.getDb().db();
    const seedBook = {
      title: "Seed Book",
      author: "Seed Author",
      summary: "Seed book for tests",
      isbn: "1234567890",
      publishDate: "2024-01-01",
      genre: "Fiction",
    };
    const insertResult = await db.collection("books").insertOne(seedBook);
    const seededId = insertResult.insertedId.toString();
    const response = await request(app).get("/books").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    const seeded = response.body.find((b) => b._id === seededId);
    expect(seeded).toBeDefined();
    expect(seeded.title).toBe(seedBook.title);
    expect(seeded.author).toBe(seedBook.author);
  });
});

describe("GET /books/:id", () => {
  test("returns 400 for an invalid Mongo ObjectId", async () => {
    await request(app).get("/books/not-a-valid-id").expect(400);
  }); 
  test("returns 404 for a valid but missing book id", async () => {
    const missingId = new ObjectId().toString();
    await request(app).get(`/books/${missingId}`).expect(404);
  });

  test("returns 200 and the book for an existing id", async () => {
    const db = mongodb.getDb().db();
    const seedBook = {
      title: "Existing Book",
      author: "Existing Author",
      summary: "Existing book for tests",
      isbn: "0987654321",
      publishDate: "2023-01-01",
      genre: "Non-Fiction",
    };
    const insertResult = await db.collection("books").insertOne(seedBook);
    const id = insertResult.insertedId.toString();
    const response = await request(app).get(`/books/${id}`).expect(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(id);
    expect(response.body.title).toBe(seedBook.title);
    expect(response.body.author).toBe(seedBook.author);
  });
});

describe("GET /Stores", () => {
  test("returns 200 and an array of stores", async () => {
    const db = mongodb.getDb().db();
    const seedStore = {
      name: "Seed Store",
      location: "Seed Location",
      contactEmail: "seed.store@example.com",
      contactPhone: "123-456-7890",
      openingHours: "9am - 9pm",
    };
    const insertResult = await db.collection("stores").insertOne(seedStore);
    const seededId = insertResult.insertedId.toString();
    const response = await request(app).get("/stores").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    const seeded = response.body.find((s) => s._id === seededId);
    expect(seeded).toBeDefined();
    expect(seeded.name).toBe(seedStore.name);
    expect(seeded.location).toBe(seedStore.location);
  });
});

describe("GET /stores/:id", () => {
  test("returns 200 and the store for an existing id", async () => {
    const db = mongodb.getDb().db();
    const seedStore = {
      name: "Existing Store",
      location: "Existing Location",
      contactEmail: "existing.store@example.com",
      contactPhone: "987-654-3210",
      openingHours: "10am - 8pm",
    };
    const insertResult = await db.collection("stores").insertOne(seedStore);
    const id = insertResult.insertedId.toString();
    const response = await request(app).get(`/stores/${id}`).expect(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(id);
    expect(response.body.name).toBe(seedStore.name);
    expect(response.body.location).toBe(seedStore.location);
  });
});

describe("Get /Users", () => {
  test("returns 200 and an array of users", async () => {
    const db = mongodb.getDb().db();
    const seedUser = {
      username: "seeduser",
      email: "seed.user@example.com",
      password: "password123",
      role: "user",
    };
    const insertResult = await db.collection("users").insertOne(seedUser);
    const seededId = insertResult.insertedId.toString();
    const response = await request(app).get("/users").expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    const seeded = response.body.find((u) => u._id === seededId);
    expect(seeded).toBeDefined();
    expect(seeded.username).toBe(seedUser.username);
    expect(seeded.email).toBe(seedUser.email);
  });

  test("returns 200 and the user for an existing id", async () => {
    const db = mongodb.getDb().db();  
    const seedUser = {
      username: "existinguser",
      email: "existing.user@example.com",
      password: "password456",
      role: "admin",
    };
    const insertResult = await db.collection("users").insertOne(seedUser);
    const id = insertResult.insertedId.toString();
    const response = await request(app).get(`/users/${id}`).expect(200);  
    expect(response.body).toBeDefined();
    expect(response.body._id).toBe(id);
    expect(response.body.username).toBe(seedUser.username);
    expect(response.body.email).toBe(seedUser.email);
  });
});
