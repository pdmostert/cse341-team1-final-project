const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticated } = require("../middleware/authenticate");
const { validateOrder } = require("../middleware/storeValidation");

router.get(
  "/inventory",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Endpoint to get current inventory.'
  storeController.getInventory,
);

router.post(
  "/order",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Endpoint to place a new order.'
  isAuthenticated,
  validateOrder,
  storeController.createOrder,
);

router.get(
  "/order/:orderId",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Endpoint to get an order by ID.'
  storeController.getOrderById,
);

router.delete(
  "/order/:orderId",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Endpoint to delete/cancel an order by ID.'
  isAuthenticated,
  storeController.deleteOrder,
);

module.exports = router;
