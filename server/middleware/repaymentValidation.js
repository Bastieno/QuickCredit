import { body, param, validationResult } from 'express-validator/check';

const validateCreateRepaymentRecord = [
  param('loanId')
    .isInt({ min: 1 })
    .withMessage('loan ID must be a positive integer from 1'),

  body('paidAmount')
    .exists()
    .withMessage('Paid amount is required')
    .trim()
    .isNumeric()
    .withMessage('Paid amount should be a number')
    .isFloat({ min: 1000, max: 1000000 })
    .withMessage('Paid amount should be between 1000 and 1000000'),
];

const validateGetRepaymentRecord = [
  param('loanId')
    .isInt({ min: 1 })
    .withMessage('loan ID must be a positive integer from 1'),
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

const repaymentValidations = {
  validateCreateRepaymentRecord,
  validateGetRepaymentRecord,
  validationHandler,
};
export default repaymentValidations;
