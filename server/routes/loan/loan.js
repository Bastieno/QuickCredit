import { Router } from 'express';

import LoanController from '../../controllers/loanController';
import loanValidations from '../../middleware/loanValidation';
import authMiddleware from '../../middleware/auth';

const loans = Router();

const { verifyToken, userOnly, adminOnly } = authMiddleware;
const { validateCreateLoan, validationHandler } = loanValidations;

const { createLoan, getLoans } = LoanController;

// Router to create new loan
loans.post('/', [verifyToken, userOnly, validateCreateLoan, validationHandler], createLoan);

// Router to get all loans
loans.get('/', [verifyToken, adminOnly], getLoans);

export default loans;
