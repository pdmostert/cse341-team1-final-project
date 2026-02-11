const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllUsers = async (req, res, next) => {
  try {
    const users = await mongodb.getDb().collection("users").find();
    const usersList = await users.toArray();
    res.status(200).json(usersList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByGithubId = async (req, res, next) => {
  try {
    const githubId = req.params.id;
    const user = await mongodb
      .getDb()
      .collection("users")
      .findOne({ githubId: githubId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const updatedData = {
      role: req.body.role // Assigns 'customer' or 'admin' to a user
    };
    const result = await mongodb
      .getDb()
      .collection("users")
      .updateOne({ _id: userId }, { $set: updatedData });
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "User role updated" });
    } else {
      res.status(404).json({ message: "User not found or role unchanged" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection("users")
      .deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserByGithubId,
  updateUserRole,
  deleteUser,
};