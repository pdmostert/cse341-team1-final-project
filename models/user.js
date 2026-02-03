const mongodb = require("../data/database");

const findOrCreate = async (profile) => {
  const db = mongodb.getDb().db();
  const collection = db.collection("users");

  // Use GitHub ID to find existing user
  let user = await collection.findOne({ githubId: profile.id });

  if (!user) {
    // Create new user if not found
    const newUser = {
      githubId: profile.id,
      username: profile.username,
      displayName: profile.displayName || profile.username,
      profilePic: profile._json.avatar_url,
      role: "customer", // Default role for new users
      createdAt: new Date(),
    };
    const result = await collection.insertOne(newUser);
    user = { ...newUser, _id: result.insertedId };
  }

  return user;
};

const findById = async (id) => {
  const db = mongodb.getDb().db();
  return await db.collection("users").findOne({ githubId: id });
};

module.exports = {
  findOrCreate,
  findById,
};
