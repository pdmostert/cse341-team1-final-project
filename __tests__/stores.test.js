const request = require('supertest');
const app = require('../app');

/* global jest, describe, it, expect */

jest.mock('../data/database', () => {
  const mockDb = {
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(null),
    insertOne: jest.fn().mockResolvedValue({ acknowledged: true, insertedId: '507f1f77bcf86cd799439011' }),
  };
  return {
    getDb: jest.fn(() => mockDb),
  };
});

process.env.NODE_ENV = 'test';

describe('Stores API', () => {
  it('GET /stores should return 200', async () => {
    const res = await request(app).get('/stores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /stores should create a store', async () => {
    const newStore = {
      name: "Test Store",
      location: "Test City",
      established: "2024-01-01",
      contactEmail: "test@test.com",
      phoneNumber: "123-456-7890"
    };

    const res = await request(app)
      .post('/stores')
      .send(newStore);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Store");
  });

  it('POST /stores should fail with missing fields', async () => {
    const res = await request(app)
      .post('/stores')
      .send({ name: "Incomplete Store" });
    expect(res.statusCode).toBe(400);
  });

  it('GET /stores/:id should return 404 for invalid id', async () => {
    const res = await request(app)
      .get('/stores/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});
