const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");

router.get(
  "/",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to get all users.'
  isAuthenticated,
  isAdmin,
  usersController.getAllUsers,
);

router.get(
  "/:id",
  // #swagger.tags = ['Customers']
  // #swagger.description = 'Endpoint to get a user by GitHub ID.'
  isAuthenticated,
  usersController.getUserByGithubId,
);

router.put(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to update a user role.'
  isAuthenticated,
  isAdmin,
  usersController.updateUserRole,
);

router.delete(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to delete a user.'
  isAuthenticated,
  isAdmin,
  usersController.deleteUser,
);

module.exports = router;