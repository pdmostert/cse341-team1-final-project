const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");
const { validateStore } = require("../middleware/storeValidation");

router.get(
  "/",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Public endpoint to get all store information.'
  storeController.getStoreInfo
);

router.get(
  "/:id",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Public endpoint to get a specific store by ID.'
  storeController.getStoreById
);

router.post(
  "/",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint for admins to create a new store entry.'
  isAuthenticated,
  isAdmin,
  validateStore,
  storeController.createStore
);

router.put(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint for admins to update store information.'
  isAuthenticated,
  isAdmin,
  validateStore,
  storeController.updateStoreInfo
);

router.delete(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint for admins to delete a store entry.'
  isAuthenticated,
  isAdmin,
  storeController.deleteStore
);

module.exports = router;