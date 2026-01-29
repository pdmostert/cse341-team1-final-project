const { body, validationResult } = require('express-validator');

const userRules = () => {
  return [
    // Ensure the role is specifically 'admin' or 'customer' when updating a user (PUT)
    body('role')
      .trim()
      .isIn(['admin', 'customer'])
      .withMessage('Role must be either admin or customer'),
  ];
};

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};

module.exports = {
  userRules,
  validateUser,
};