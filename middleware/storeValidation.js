const { body } = require("express-validator");
const { handleValidationErrors } = require("./validation");

const validateOrder = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("User ID is required")
    .isLength({ min: 24, max: 24 })
    .withMessage("User ID must be a valid MongoDB ObjectId"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array"),

  body("items.*.bookId")
    .trim()
    .notEmpty()
    .withMessage("Book ID is required for each item")
    .isLength({ min: 24, max: 24 })
    .withMessage("Book ID must be a valid MongoDB ObjectId"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),

  body("totalPrice")
    .isFloat({ min: 0 })
    .withMessage("Total Price must be a non-negative number"),

  handleValidationErrors,
];

const validateStore = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Store Name is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("established")
    .trim()
    .notEmpty()
    .withMessage("Established date is required")
    .isDate()
    .withMessage("Established date must be a valid date"),

  body("contactEmail")
    .trim()
    .notEmpty()
    .withMessage("Contact Email is required")
    .isEmail()
    .withMessage("Contact Email must be a valid email address"),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone Number is required"),

  handleValidationErrors,
];

module.exports = {
  validateOrder,
  validateStore,
};
