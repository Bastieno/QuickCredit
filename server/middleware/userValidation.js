import { body, param, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const validateLogin = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address entered')
    .normalizeEmail({ all_lowercase: true }),

  body('password')
    .exists()
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage('Password should be at least 6 characters'),
];

const validateSignup = [
  validateLogin[0],
  validateLogin[1],
  sanitizeBody('firstName').customSanitizer(value => value.replace(/\s\s+/g, ' ').trim()),
  body('firstName')
    .exists()
    .withMessage('Please provide a first name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be at least 2 characters long')
    .isAlpha()
    .withMessage('First name should only contain alphabets'),

  sanitizeBody('lastName').customSanitizer(value => value.replace(/\s\s+/g, ' ').trim()),
  body('lastName')
    .exists()
    .withMessage('Please provide a last name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be at least 2 characters long')
    .isAlpha()
    .withMessage('Last name should only contain alphabets'),

  body('address')
    .exists()
    .withMessage('Address field is required')
    .trim()
    .isLength({ min: 10, max: 255 })
    .withMessage('Address should be between 10 to 255 characters')
    // eslint-disable-next-line no-useless-escape
    .matches(/^[A-Za-z0-9\.\-\s\,]*$/)
    .withMessage('Invalid Address format entered'),
];

const validateUserId = [
  param('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer from 1'),
];

const validateVerifyUser = [
  param('userEmail')
    .normalizeEmail({ all_lowercase: true })
    .exists()
    .withMessage('A valid email must be provided.')
    .trim()
    .isEmail()
    .withMessage('Invalid email address entered'),
];

const validateDeleteUser = [validateVerifyUser[0]];

const validateResetPassword = [
  validateLogin[0],
  body('newPassword')
    .exists()
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 6, max: 100 })
    .withMessage('Password should be at least 6 characters'),
];

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      error: errors.array().map(error => error.msg)[0],
    });
  } else {
    next();
  }
};

const userValidations = {
  validateLogin,
  validateSignup,
  validateUserId,
  validateVerifyUser,
  validateDeleteUser,
  validateResetPassword,
  validationHandler,
};

export default userValidations;
