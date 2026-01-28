const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");
const { validateBook } = require("../middleware/booksValidation");
const { isAuthenticated } = require("../middleware/authenticate");

router.get(
  "/",
  // #swagger.tags = ['Books']
  // #swagger.description = 'Endpoint to get all books.'
  booksController.getAllBooks,
);
router.get(
  "/:id",
  // #swagger.tags = ['Books']
  // #swagger.description = 'Endpoint to get a book by ID.'
  booksController.getBookById,
);

router.post(
  "/",
  // #swagger.tags = ['Books']
  // #swagger.description = 'Endpoint to create a new book.'
  isAuthenticated,
  ...validateBook,
  booksController.createBook,
);

router.put(
  "/:id",
  // #swagger.tags = ['Books']
  // #swagger.description = 'Endpoint to update a book by ID.'
  isAuthenticated,
  ...validateBook,
  booksController.updateBook,
);

router.delete(
  "/:id",
  // #swagger.tags = ['Books']
  // #swagger.description = 'Endpoint to delete a book by ID.'
  isAuthenticated,
  booksController.deleteBook,
);

module.exports = router;
