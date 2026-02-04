const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getStoreInfo = async (req, res) => {
  try {
    // #swagger.tags = ['Bookstore']
    // #swagger.description = 'Retrieve information about the bookstore storefront.'
    const result = await mongodb.getDb().db().collection("store").find().toArray();
    res.status(200).json(result[0] || { message: "Store information not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStoreInfo = async (req, res) => {
  try {
    // #swagger.tags = ['Admins']
    // #swagger.description = 'Update storefront details (Admin only).'
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
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Store not found or no changes made." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStoreInfo,
  updateStoreInfo,
};