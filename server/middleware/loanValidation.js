import { body, validationResult } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const validateCreateLoan = [
  body('email')
    .exists()
    .withMessage('Email is required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address entered')
    .normalizeEmail({ all_lowercase: true }),

  sanitizeBody('firstName').customSanitizer(value => value.replace(/\s\s+/g, ' ').trim()),
  body('firstName')
    .exists()
    .withMessage('Please provide a first name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be at least 2 characters long')
    .isAlpha()
    .withMessage('First name should contain only alphabets'),

  sanitizeBody('lastName').customSanitizer(value => value.replace(/\s\s+/g, ' ').trim()),
  body('lastName')
    .exists()
    .withMessage('Please provide a last name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be at least 2 characters long')
    .isAlpha()
    .withMessage('First name should contain only alphabets'),

  body('amount')
    .exists()
    .withMessage('Amount is required')
    .trim()
    .isNumeric()
    .withMessage('Amount should be a number')
    .isFloat({ min: 10000, max: 1000000 })
    .withMessage('Amount should be between 10000 than 1000000'),

  body('tenor')
    .exists()
    .withMessage('Tenor is required')
    .trim()
    .isNumeric()
    .withMessage('Tenor should be a number')
    .isInt({ min: 1, max: 12 })
    .withMessage('Tenor should be between 1 and 12 months'),
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


const loanValidations = {
  validateCreateLoan,
  validationHandler,
};
export default loanValidations;