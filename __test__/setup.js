const mongodb = require("../data/database");

beforeAll((done) => {
  mongodb.initDb((err) => done(err));
});

afterAll(async () => {
  try {
    await mongodb.getDb().close();
  } catch {
    // ignore - allows suite to finish cleanly even if init failed
  }
});
