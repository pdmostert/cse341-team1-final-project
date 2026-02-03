const { body } = require("express-validator");
const handleValidationErrors = require("./validation").handleValidationErrors;

const validateAuthor = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

  body("biography")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Biography must be less than 1000 characters"),

  body("birthDate")
    .trim()
    .isISO8601()
    .withMessage("Birthday must be a valid date (YYYY-MM-DD)"),

  body("nationality")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Nationality must be less than 100 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("website").trim().isURL().withMessage("Website must be a valid URL"),

  handleValidationErrors,
];

module.exports = {
  validateAuthor,
};
