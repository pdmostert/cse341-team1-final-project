const { body } = require("express-validator");
const handleValidationErrors = require("./validation").handleValidationErrors;

const validateBook = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("Title must be between 1 and 200 characters"),

  body("authorId")
    .trim()
    .notEmpty()
    .withMessage("Author ID is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("Author ID must be a valid MongoDB ObjectId"),

  body("isbn")
    .trim()
    .notEmpty()
    .withMessage("ISBN is required")
    .isLength({ min: 10, max: 13 })
    .withMessage("ISBN must be between 10 and 13 characters"),

  body("publishedDate")
    .trim()
    .isISO8601()
    .withMessage("Published Date must be a valid date (YYYY-MM-DD)"),

  body("publisher")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Publisher must be less than 100 characters"),

  body("genre")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Genre must be less than 100 characters"),

  body("pageCount")
    .isInt({ min: 1 })
    .withMessage("Page Count must be a positive integer"),

  body("language")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Language must be less than 50 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("inStock").isBoolean().withMessage("In Stock must be a boolean value"),
  handleValidationErrors,
];

module.exports = {
  validateBook,
};
