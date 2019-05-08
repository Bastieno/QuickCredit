import { Router } from 'express';

import LoanController from '../../controllers/loanController';
import loanValidations from '../../middleware/loanValidation';
import authMiddleware from '../../middleware/auth';

const loans = Router();

const { verifyToken, userOnly, adminOnly } = authMiddleware;
const {
  validateCreateLoan,
  validateQueryParams,
  validateLoanId,
  validationHandler,
} = loanValidations;

const { createLoan, getLoans, getSingleLoan } = LoanController;

// Router to create new loan
loans.post('/', [verifyToken, userOnly, validateCreateLoan, validationHandler], createLoan);

// Router to get all loans
loans.get('/', [verifyToken, adminOnly, validateQueryParams, validationHandler], getLoans);

// Router to get a specific loan
loans.get('/:loanId', [verifyToken, adminOnly, validateLoanId, validationHandler], getSingleLoan);

export default loans;
