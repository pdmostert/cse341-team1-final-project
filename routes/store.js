const express = require("express");
const router = express.Router();

const storeController = require("../controllers/storeController");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");
const { validateStore } = require("../middleware/storeValidation");

router.get(
  "/",
  // #swagger.tags = ['Bookstore']
  // #swagger.description = 'Public endpoint to get bookstore information.'
  storeController.getStoreInfo,
);

router.put(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint for admins to update store information.'
  isAuthenticated,
  isAdmin,
  validateStore,
  storeController.updateStoreInfo,
);

module.exports = router;