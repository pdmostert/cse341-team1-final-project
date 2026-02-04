const { body } = require("express-validator");
const { handleValidationErrors } = require("./validation");

const validateStore = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Store name is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("established")
    .isDate()
    .withMessage("Established must be a valid date (YYYY-MM-DD)"),

  body("contactEmail")
    .isEmail()
    .withMessage("Please provide a valid contact email"),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  handleValidationErrors,
];

module.exports = {
  validateStore,
};