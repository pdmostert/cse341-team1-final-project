const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");
const { validateStore } = require("../middleware/storeValidation");

router.get(
  "/",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Endpoint to get all store information.'
  storeController.getStoreInfo,
);

router.get(
  "/:id",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Endpoint to get a store by ID.'
  storeController.getStoreById,
);

router.post(
  "/",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to create a new store.'
  isAuthenticated,
  isAdmin,
  validateStore,
  storeController.createStore,
);

router.put(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to update store info.'
  isAuthenticated,
  isAdmin,
  validateStore,
  storeController.updateStoreInfo,
);

router.delete(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to delete a store.'
  isAuthenticated,
  isAdmin,
  storeController.deleteStore,
);

module.exports = router;