const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authorsController");
const { validateAuthor } = require("../middleware/authorsValidation");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");

router.get(
  "/",
  // #swagger.tags = ['Authors']
  // #swagger.description = 'Endpoint to get all authors.'
  authorsController.getAllAuthors,
);

router.get(
  "/:id",
  // #swagger.tags = ['Authors']
  // #swagger.description = 'Endpoint to get an author by ID.'
  authorsController.getAuthorById,
);

router.post(
  "/",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to create a new author.'
  isAuthenticated,
  isAdmin,
  ...validateAuthor,
  authorsController.createAuthor,
);

router.put(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to update an author by ID.'
  isAuthenticated,
  isAdmin,
  ...validateAuthor,
  authorsController.updateAuthor,
);

router.delete(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to delete an author by ID.'
  isAuthenticated,
  isAdmin,
  authorsController.deleteAuthor,
);

module.exports = router;