const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getInventory = async (req, res) => {
  try {
    // #swagger.tags = ['Bookstore']
    // #swagger.description = 'Retrieve the current inventory of books.'
    const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .find({}, { projection: { title: 1, inStock: 1, price: 1 } })
      .toArray();
    res.status(200).json(result);
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
      .db()
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
      .db()
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
      .db()
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
  createOrder,
  getOrderById,
  deleteOrder,
};
