import moment from 'moment';
import loans from '../models/loan';
import handleResponse from '../utils/responseHandler';


/**
 *
 * @description Represent a collection of loan route handlers
 * @class LoanController
 */
class LoanController {
  /**
   *
   * @description Create a new loan application
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} JSON API Response
   * @memberof UserController
   */
  static async createLoan(req, res, next) {
    const { email, firstName, lastName } = req.body;
    let { amount, tenor } = req.body;

    if (req.user.email !== email) {
      return res.status(400).send({
        status: 400,
        error: 'Email provided does not match your email!',
      });
    }

    if (req.user.firstName !== firstName) {
      return res.status(400).send({
        status: 400,
        error: 'First name provided does not match your first name!',
      });
    }

    if (req.user.lastName !== lastName) {
      return res.status(400).send({
        status: 400,
        error: 'Last name provided does not match your last name!',
      });
    }

    if (loans.find(loan => loan.userEmail === email && !loan.repaid)) {
      return res.status(409).send({
        status: 409,
        error: 'You can only apply for a loan at a time!',
      });
    }

    amount = parseFloat(amount, 10);
    tenor = parseInt(tenor, 10);

    const createdOn = moment().format('LLL');
    const loanId = loans.length + 1;
    const status = 'pending';
    const repaid = false;
    const interest = (0.05 * amount) * tenor;
    const balance = amount + interest;
    const paymentInstallment = balance / tenor;

    const createdLoan = {
      loanId,
      userEmail: email,
      createdOn,
      status,
      repaid,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
    };

    const result = {
      loanId,
      firstName,
      lastName,
      userEmail: email,
      createdOn,
      status,
      repaid,
      tenor,
      amount,
      paymentInstallment,
      balance,
      interest,
    };

    loans.push(createdLoan);

    return handleResponse(result, next, res, 201, 'Loan created successfully');
  }

  /**
   *
   * @description Get all loans application
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {array} JSON API Response
   * @memberof LoanController
   */
  static async getLoans(req, res, next) {
    const { status } = req.query;
    let { repaid } = req.query;

    if (status && repaid) {
      repaid = JSON.parse(repaid);
      const loanType = repaid ? 'Repaid loans' : 'Current Loans';
      const result = loans.filter(loan => loan.status === status && loan.repaid === repaid);
      return handleResponse(result, next, res, 200, `${loanType} retrieved successfully`);
    }

    const result = await loans;
    return handleResponse(result, next, res, 200, ' Loans retrieved successfully');
  }

  /**
   *
   * @description Retrieves a single loan from the loans array
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} The loan Object
   * @memberof LoanController
   */
  static async getSingleLoan(req, res, next) {
    const { loanId } = req.params;
    const foundLoan = await loans.find(loan => loan.loanId === parseInt(loanId, 10));
    if (!foundLoan) {
      return res.status(404).send({
        status: 404,
        error: 'Loan not found',
      });
    }
    const result = foundLoan;
    return handleResponse(result, next, res, 200, 'Loan retrieved successfully');
  }
}

export default LoanController;
