import { Router } from 'express';

import LoanController from '../../controllers/loanController';
import loanValidations from '../../middleware/loanValidation';
import authMiddleware from '../../middleware/auth';

const loans = Router();

const { verifyToken, userOnly } = authMiddleware;
const {
  validateCreateLoan,
  validationHandler,
} = loanValidations;

const {
  createLoan,
} = LoanController;

// Router to create new loan
loans.post('/', [verifyToken, userOnly, validateCreateLoan, validationHandler], createLoan);

export default loans;
