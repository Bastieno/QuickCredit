import moment from 'moment';
import loans from '../models/loan';
import repayments from '../models/repayment';
import handleResponse from '../utils/responseHandler';


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
    let { loanId } = req.params;
    let { paidAmount } = req.body;
    loanId = parseInt(loanId, 10);
    paidAmount = parseFloat(paidAmount, 10);

    const foundLoan = loans.find(loan => loan.loanId === loanId);

    if (!foundLoan) {
      return res.status(404).send({
        status: 404,
        error: 'The loan with the given ID does not exist!',
      });
    }

    if (foundLoan.status !== 'approved') {
      return res.status(400).send({
        status: 400,
        error: 'This loan has not been approved!',
      });
    }

    if (foundLoan.repaid) {
      return res.status(400).send({
        status: 400,
        error: 'This loan is fully repaid!',
      });
    }

    const { paymentInstallment, amount } = foundLoan;
    const id = repayments.length + 1;
    const createdOn = moment().format('LLL');
    const monthlyInstallment = paymentInstallment;

    const getAllRepaymentRecord = repayments
      .filter(repayment => repayment.loanId === loanId);

    const paymentNumber = getAllRepaymentRecord.length + 1;

    // Update balance property of loan as a result of repayment
    if (foundLoan.balance >= paidAmount) {
      foundLoan.balance -= paidAmount;
    } else {
      return res.status(400).send({
        status: 400,
        error: `The Paid Amount exceeds client debt! Debt left is ${foundLoan.balance}`,
      });
    }
    const createdRepaymentRecord = {
      id,
      loanId,
      createdOn,
      amount,
      monthlyInstallment,
      paidAmount,
      balance: foundLoan.balance,
      paymentNumber,
    };

    repayments.push(createdRepaymentRecord);

    const result = createdRepaymentRecord;

    if (foundLoan.balance <= 0.05) {
      foundLoan.repaid = true;
      return handleResponse(result, next, res, 200, 'Congratulations! This loan is fully repaid');
    }

    return handleResponse(result, next, res, 201, 'Repayment record created successfully');
  }
}

export default RepaymentController;
