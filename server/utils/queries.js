const query = {
  /* Users */
  findUserByEmail: email => ({
    text: `SELECT * FROM users 
           WHERE email = $1`,
    values: [email],
  }),

  regUser: userInfo => ({
    text: `INSERT INTO users 
           (email, first_name, last_name, password, address, status, is_admin) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) 
           RETURNING *`,
    values: [
      userInfo.email,
      userInfo.firstName,
      userInfo.lastName,
      userInfo.password,
      userInfo.address,
      userInfo.status,
      userInfo.isAdmin,
    ],
  }),

  getAllUsers: () => 'Select user_id, first_name, last_name, email FROM users ORDER BY user_id',

  updateUserStatus: (status, email) => ({
    text: `UPDATE users SET 
          status = COALESCE($1, status)
          WHERE email = $2 
          RETURNING *`,
    values: [status, email],
  }),

  updateUserRole: (isAdmin, email) => ({
    text: `UPDATE users SET 
          is_admin = COALESCE($1, is_admin)
          WHERE email = $2 
          RETURNING *`,
    values: [isAdmin, email],
  }),

  deleteUserByEmail: userEmail => ({
    text: `DELETE FROM users 
           WHERE email = $1
           RETURNING *`,
    values: [userEmail],
  }),

  resetPasswordByEmail: (newPassword, userEmail) => ({
    text: `UPDATE users SET
           password = COALESCE($1, password) 
           WHERE email = $2
           RETURNING *`,
    values: [newPassword, userEmail],
  }),

  /* Loans */
  findLoanByEmail: userEmail => ({
    text: `SELECT * FROM loans 
           WHERE user_email = $1`,
    values: [userEmail],
  }),

  findLoanById: loanId => ({
    text: `SELECT * FROM loans 
           WHERE loan_id = $1`,
    values: [loanId],
  }),

  getAllLoans: () => `SELECT * from loans 
                      ORDER BY loan_id`,

  getLoans: (status, repaid) => ({
    text: `SELECT * FROM loans 
          WHERE status = $1 AND repaid = $2
          ORDER By loan_id`,
    values: [status, repaid],
  }),

  createLoan: loanInfo => ({
    text: `INSERT INTO loans 
          (user_email, created_on, status, repaid, tenor, amount, payment_installment, balance, interest) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
          RETURNING *`,
    values: [
      loanInfo.userEmail,
      loanInfo.createdOn,
      loanInfo.status,
      loanInfo.repaid,
      loanInfo.tenor,
      loanInfo.amount,
      loanInfo.paymentInstallment,
      loanInfo.balance,
      loanInfo.interest,
    ],
  }),

  updateLoanStatus: (status, loanId) => ({
    text: `UPDATE loans SET 
           status = COALESCE($1, status)
           WHERE loan_id = $2 
           RETURNING *`,
    values: [status, loanId],
  }),

  updateLoanBalance: (balance, loanId) => ({
    text: `UPDATE loans SET 
           balance = COALESCE($1, balance)
           WHERE loan_id = $2 
           RETURNING *`,
    values: [balance, loanId],
  }),

  updateLoanRepaidValue: (repaid, loanId) => ({
    text: `UPDATE loans SET 
           repaid = COALESCE($1, repaid)
           WHERE loan_id = $2 
           RETURNING *`,
    values: [repaid, loanId],
  }),

  /* Repayments */
  createRepaymentRecord: repaymentInfo => ({
    text: `INSERT INTO repayments 
           (loan_id, created_on, amount, monthly_installment, paid_amount, balance, payment_number)
           VALUES ($1, $2, $3, $4, $5, $6, $7) 
           RETURNING *`,
    values: [
      repaymentInfo.loanId,
      repaymentInfo.createdOn,
      repaymentInfo.amount,
      repaymentInfo.monthlyInstallment,
      repaymentInfo.paidAmount,
      repaymentInfo.balance,
      repaymentInfo.paymentNumber,
    ],
  }),

  getRepaymentRecord: loanId => ({
    text: `SELECT * FROM repayments
           WHERE loan_id = $1
           ORDER BY payment_number`,
    values: [loanId],
  }),
};

export default query;
