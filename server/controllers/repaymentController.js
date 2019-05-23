import moment from 'moment';
import query from '../utils/queries';
import handleResponse from '../utils/responseHandler';
import pool from '../utils/connection';
import isEmptyObject from '../utils/isEmptyObject';


class RepaymentController {
  /**
   *
   * @description Create a repayment record
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} JSON API Response
   * @memberof RepaymentController
   */
  static async createRepaymentRecord(req, res, next) {
    try {
      let { loanId } = req.params;
      // let { paidAmount } = req.body;
      loanId = parseInt(loanId, 10);
      // paidAmount = parseFloat(paidAmount, 10);

      const foundLoan = await pool.query(query.findLoanById(loanId));
      const result = foundLoan.rows[0];

      if (!foundLoan.rowCount) {
        return res.status(404).send({
          status: 404,
          error: 'The loan with the given ID does not exist!',
        });
      }

      if (result.status !== 'approved') {
        return res.status(400).send({
          status: 400,
          error: 'This loan has not been approved!',
        });
      }

      if (result.repaid) {
        return res.status(400).send({
          status: 400,
          error: 'This loan is fully repaid!',
        });
      }

      let paidAmount = req.body && !isEmptyObject(req.body)
        ? req.body.paidAmount : result.payment_installment;
      paidAmount = parseFloat(paidAmount, 10);

      const { amount } = result;
      const createdOn = moment().format('LLL');
      const monthlyInstallment = result.payment_installment;

      const getAllRepaymentRecord = await pool.query(query.getRepaymentRecord(loanId));

      const paymentNumber = getAllRepaymentRecord.rowCount + 1;

      // Update balance property of loan as a result of repayment
      if (result.balance >= paidAmount) {
        result.balance -= paidAmount;
        await pool.query(query.updateLoanBalance(result.balance.toFixed(2), loanId));
      } else {
        return res.status(400).send({
          status: 400,
          error: `The Paid Amount exceeds client debt! Debt left is ${result.balance}`,
        });
      }

      const updatedLoan = await pool.query(query.findLoanById(loanId));

      const newRepaymentRecord = {
        loanId,
        createdOn,
        amount,
        monthlyInstallment,
        paidAmount,
        balance: updatedLoan.rows[0].balance,
        paymentNumber,
      };

      const repaymentRecord = await pool.query(query.createRepaymentRecord(newRepaymentRecord));

      if (newRepaymentRecord.balance < 0.05) {
        await pool.query(query.updateLoanRepaidValue(true, loanId));
        return handleResponse(repaymentRecord.rows[0], next, res, 200, 'Congratulations! This loan is fully repaid');
      }

      return handleResponse(repaymentRecord.rows[0], next, res, 201, 'Repayment record created successfully');
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @description Gets all repayment record for a loan
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {array} JSON API Response
   * @memberof RepaymentController
   */
  static async getRepaymentRecord(req, res, next) {
    let { loanId } = req.params;
    loanId = parseInt(loanId, 10);
    const foundLoan = await pool.query(query.findLoanById(loanId));
    const result = foundLoan.rows[0];

    if (!foundLoan.rowCount) {
      return res.status(404).send({
        status: 404,
        error: 'No loan with the given ID does not exist!',
      });
    }

    if (result.status !== 'approved') {
      return res.status(400).send({
        status: 400,
        error: 'This loan has not been approved!',
      });
    }

    const getAllRepaymentRecord = await pool.query(query.getRepaymentRecord(loanId));

    if (getAllRepaymentRecord.rowCount === 0) {
      return handleResponse(getAllRepaymentRecord.rows, next, res, 200, 'There is no repayment record for this loan!');
    }

    const message = getAllRepaymentRecord.rowCount === 1 ? 'Repayment record retrieved successfully' : 'Repayment records retrieved successfully';

    return handleResponse(getAllRepaymentRecord.rows, next, res, 200, message);
  }
}

export default RepaymentController;
