const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");
const { validateBook } = require("../middleware/booksValidation");
const { isAuthenticated, isAdmin } = require("../middleware/authenticate");

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
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to create a new book.'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Store information',
        schema: {
          name: 'String',
          location: 'String',
          established: 'String',
          contactEmail: 'String',
          contactPhone: 'String'
        }
  } */
  isAuthenticated,
  isAdmin,
  ...validateBook,
  booksController.createBook,
);

router.put(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to update a book by ID.'
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Store information',
        schema: {
          name: 'String',
          location: 'String',
          established: 'String',
          contactEmail: 'String',
          contactPhone: 'String'
        }
  } */
  isAuthenticated,
  isAdmin,
  ...validateBook,
  booksController.updateBook,
);

router.delete(
  "/:id",
  // #swagger.tags = ['Admins']
  // #swagger.description = 'Endpoint to delete a book by ID.'
  isAuthenticated,
  isAdmin,
  booksController.deleteBook,
);

module.exports = router;