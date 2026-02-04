const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getStoreInfo = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("store").find().toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid store ID" });
    }
    const storeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .findOne({ _id: storeId });
    if (!result) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStore = async (req, res) => {
  try {
    const newStore = {
      name: req.body.name,
      location: req.body.location,
      established: req.body.established,
      contactEmail: req.body.contactEmail,
      phoneNumber: req.body.phoneNumber,
    };
    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .insertOne(newStore);
    if (result.acknowledged) {
      res.status(201).json({ message: "Store created", storeId: result.insertedId });
    } else {
      res.status(500).json({ message: "Failed to create store" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStoreInfo = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid store ID" });
    }
    const storeId = new ObjectId(req.params.id);
    const updatedStore = {
      name: req.body.name,
      location: req.body.location,
      established: req.body.established,
      contactEmail: req.body.contactEmail,
      phoneNumber: req.body.phoneNumber,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .updateOne({ _id: storeId }, { $set: updatedStore });

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Store updated" });
    } else {
      res.status(404).json({ message: "Store not found or no changes made." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStore = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid store ID" });
    }
    const storeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("store")
      .deleteOne({ _id: storeId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Store deleted" });
    } else {
      res.status(404).json({ message: "Store not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStoreInfo,
  getStoreById,
  createStore,
  updateStoreInfo,
  deleteStore,
};