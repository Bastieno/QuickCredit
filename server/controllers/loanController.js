import moment from 'moment';
import query from '../utils/queries';
import handleResponse from '../utils/responseHandler';
import pool from '../utils/connection';

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
    try {
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

      const { rows, rowCount } = await pool.query(query.findLoanByEmail(email));

      if (rowCount && rows[0].user_email === email && !rows[0].repaid) {
        return res.status(409).send({
          status: 409,
          error: 'You can only apply for a loan at a time!',
        });
      }

      amount = parseFloat(amount, 10);
      tenor = parseInt(tenor, 10);

      const createdOn = moment().format('LLL');
      const status = 'pending';
      const repaid = false;
      const interest = (0.05 * amount) * tenor;
      const balance = amount + interest;
      const paymentInstallment = balance / tenor;

      const createdLoan = {
        userEmail: email,
        createdOn,
        status,
        repaid,
        tenor,
        amount: amount.toFixed(2),
        paymentInstallment: paymentInstallment.toFixed(2),
        balance: balance.toFixed(2),
        interest: interest.toFixed(2),
      };

      const result = { firstName, lastName, ...createdLoan };

      await pool.query(query.createLoan(createdLoan));
      return handleResponse(result, next, res, 201, 'Loan created successfully');
    } catch (error) {
      return error;
    }
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
    try {
      const { status } = req.query;
      let { repaid } = req.query;

      if (status && repaid) {
        repaid = JSON.parse(repaid);
        const loanType = repaid ? 'Repaid loans' : 'Current Loans';
        const result = await pool.query(query.getLoans(status, repaid));
        return handleResponse(result.rows, next, res, 200, `${loanType} retrieved successfully`);
      }

      const result = await pool.query(query.getAllLoans());
      return handleResponse(result.rows, next, res, 200, ' Loans retrieved successfully');
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @description Retrieves a single loan from the loans database
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} The loan Object
   * @memberof LoanController
   */
  static async getSingleLoan(req, res, next) {
    const { loanId } = req.params;
    const foundLoan = await pool.query(query.findLoanById(parseInt(loanId, 10)));
    if (!foundLoan.rowCount) {
      return res.status(404).send({
        status: 404,
        error: 'Loan not found',
      });
    }
    const result = foundLoan.rows[0];
    return handleResponse(result, next, res, 200, 'Loan retrieved successfully');
  }

  /**
   *
   * @description Modify loan's status
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} Updated loan.status property
   * @memberof UserController
   */
  static async loanStatusUpdate(req, res, next) {
    try {
      const { loanId } = req.params;
      const { status } = req.body;
      const foundLoan = await pool.query(query.findLoanById(parseInt(loanId, 10)));
      const result = foundLoan.rows[0];

      if (!foundLoan.rowCount) {
        return res.status(404).send({
          status: 404,
          error: 'Loan not found',
        });
      }

      // Admin cannot approve loans for unverifed users
      const foundUser = await pool.query(query.findUserByEmail(result.user_email));
      if (foundUser.rows[0].status === 'unverified') {
        return res.status(403).send({
          status: 403,
          error: 'You cannot approve loans for unverified users',
        });
      }

      // For loans that are already approved
      if (result.status === 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This loan is approved already!',
        });
      }

      const { rows } = await pool.query(query.updateLoanStatus(status, loanId));

      return handleResponse(rows[0], next, res, 200, 'Loan status updated successfully');
    } catch (error) {
      return error;
    }
  }
}

export default LoanController;
