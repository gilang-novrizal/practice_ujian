const { body } = require("express-validator");

const registValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 6 })
    .withMessage("Username min 6 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format wrong!"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 characters")
    .matches(/[!@#$%^&*;]/)
    .withMessage("Password must include special characters")
    .matches(/[0-9]/)
    .withMessage("Password must include number"),
];

module.exports = { registValidator };
