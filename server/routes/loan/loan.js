import { Router } from 'express';
import LoanController from '../../controllers/loanController';
import RepaymentController from '../../controllers/repaymentController';
import loanValidations from '../../middleware/loanValidation';
import repaymentValidations from '../../middleware/repaymentValidation';
import authMiddleware from '../../middleware/auth';

const loans = Router();

const { verifyToken, adminOnly } = authMiddleware;

const { createRepaymentRecord, getRepaymentRecord } = RepaymentController;

const { validateCreateRepaymentRecord, validateGetRepaymentRecord } = repaymentValidations;

const {
  validateCreateLoan,
  validateQueryParams,
  validateLoanId,
  validateLoanStatusUpdate,
  validationHandler,
} = loanValidations;

const {
  createLoan,
  getLoans,
  getSingleLoan,
  loanStatusUpdate,
} = LoanController;

// Router to create new loan
loans.post('/', [verifyToken, validateCreateLoan, validationHandler], createLoan);

// Router to get all loans
loans.get('/', [verifyToken, adminOnly, validateQueryParams, validationHandler], getLoans);

// Router to get a specific loan
loans.get('/:loanId', [verifyToken, adminOnly, validateLoanId, validationHandler], getSingleLoan);

// Router to approve or reject a loan (update the status property)
loans.patch('/:loanId', [verifyToken, adminOnly, validateLoanStatusUpdate, validationHandler], loanStatusUpdate);

// Router to create a repayment record
loans.post('/:loanId/repayment', [verifyToken, adminOnly, validateCreateRepaymentRecord, repaymentValidations.validationHandler], createRepaymentRecord);

// Router to view repayment records for a loan
loans.get('/:loanId/repayments', [verifyToken, validateGetRepaymentRecord, repaymentValidations.validationHandler], getRepaymentRecord);

export default loans;
