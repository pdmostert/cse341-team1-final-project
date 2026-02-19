const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticated } = require("../middleware/authenticate");
const { validateOrder, validateStore } = require("../middleware/storeValidation");

router.get(
  "/",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to get all stores.'
  storeController.getAllStores,
);

router.get(
  "/inventory",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to get current inventory.'
  storeController.getInventory,
);

router.get(
  "/:id",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to get a store by ID.'
  storeController.getStoreById,
);

router.post(
  "/",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to create a new store.'
  isAuthenticated,
  validateStore,
  storeController.createStore,
);

router.put(
  "/:id",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to update a store by ID.'
  isAuthenticated,
  validateStore,
  storeController.updateStore,
);

router.delete(
  "/:id",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to delete a store by ID.'
  isAuthenticated,
  storeController.deleteStore,
);

router.post(
  "/order",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to place a new order.'
  isAuthenticated,
  validateOrder,
  storeController.createOrder,
);

router.get(
  "/order/:orderId",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to get an order by ID.'
  storeController.getOrderById,
);

router.delete(
  "/order/:orderId",
  // #swagger.tags = ['Stores']
  // #swagger.description = 'Endpoint to delete/cancel an order by ID.'
  isAuthenticated,
  storeController.deleteOrder,
);

module.exports = router;
