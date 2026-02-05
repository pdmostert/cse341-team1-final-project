const process = require("process");
const dotenv = require("dotenv");
dotenv.config({ quiet: process.env.NODE_ENV === "test" });
const MongoClient = require("mongodb").MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
  if (!mongoUri) {
    return callback(
      new Error(
        "Missing Mongo connection string. Set MONGODB_URI (normal) or MONGO_URL (jest-mongodb).",
      ),
    );
  }

  MongoClient.connect(mongoUri)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
