const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getInventory = async (req, res) => {
  try {
    // #swagger.tags = ['Bookstore']
    // #swagger.description = 'Retrieve the current inventory of books.'
    const result = await mongodb
      .getDb()
      .collection("books")
      .find({}, { projection: { title: 1, inStock: 1, price: 1 } })
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllStores = async (req, res) => {
  try {
    // #swagger.tags = ['Stores']
    // #swagger.description = 'Retrieve all bookstore locations.'
    const result = await mongodb
      .getDb()
      .collection("stores")
      .find()
      .toArray();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    // #swagger.tags = ['Stores']
    // #swagger.description = 'Retrieve a specific store by its ID.'
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid store ID" });
    }
    const storeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection("stores")
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
    // #swagger.tags = ['Stores']
    // #swagger.description = 'Create a new bookstore location.'
    const store = {
      name: req.body.name,
      location: req.body.location,
      established: req.body.established,
      contactEmail: req.body.contactEmail,
      phoneNumber: req.body.phoneNumber,
    };
    const result = await mongodb
      .getDb()
      .collection("stores")
      .insertOne(store);
    if (result.acknowledged) {
      res.status(201).json({
        ...store,
        _id: result.insertedId,
      });
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while creating the store." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStore = async (req, res) => {
  try {
    // #swagger.tags = ['Stores']
    // #swagger.description = 'Update an existing bookstore location.'
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid store ID" });
    }
    const storeId = new ObjectId(req.params.id);
    const store = {
      name: req.body.name,
      location: req.body.location,
      established: req.body.established,
      contactEmail: req.body.contactEmail,
      phoneNumber: req.body.phoneNumber,
    };
    const result = await mongodb
      .getDb()
      .collection("stores")
      .replaceOne({ _id: storeId }, store);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while updating the store." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStore = async (req, res) => {
  try {
    // #swagger.tags = ['Stores']
    // #swagger.description = 'Delete a bookstore location by ID.'
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid store ID" });
    }
    const storeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection("stores")
      .deleteOne({ _id: storeId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Store deleted successfully" });
    } else {
      res.status(404).json({ message: "Store not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    // #swagger.tags = ['Bookstore']
    // #swagger.description = 'Place a new order for books.'
    const order = {
      userId: req.body.userId,
      items: req.body.items, // Array of { bookId, quantity }
      orderDate: new Date(),
      status: "pending",
      totalPrice: req.body.totalPrice,
    };
    const result = await mongodb
      .getDb()
      .collection("orders")
      .insertOne(order);
    if (result.acknowledged) {
      res
        .status(201)
        .json({
          message: "Order placed successfully",
          orderId: result.insertedId,
        });
    } else {
      res
        .status(500)
        .json({ message: "Some error occurred while placing the order." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    // #swagger.tags = ['Bookstore']
    // #swagger.description = 'Retrieve a specific order by its ID.'
    if (!ObjectId.isValid(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const orderId = new ObjectId(req.params.orderId);
    const result = await mongodb
      .getDb()
      .collection("orders")
      .findOne({ _id: orderId });
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    // #swagger.tags = ['Bookstore']
    // #swagger.description = 'Cancel or delete an order by its ID.'
    if (!ObjectId.isValid(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const orderId = new ObjectId(req.params.orderId);
    const result = await mongodb
      .getDb()
      .collection("orders")
      .deleteOne({ _id: orderId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getInventory,
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  createOrder,
  getOrderById,
  deleteOrder,
};
