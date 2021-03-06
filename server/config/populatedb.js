import log from 'fancy-log';
import pool from '../utils/connection';
import query from '../utils/queries';
import users from '../utils/dbSeed/dbUserSeed';
import loans from '../utils/dbSeed/dbLoanSeed';
import repayments from '../utils/dbSeed/dbRepaymentSeed';

const setupDbTables = async () => {
  try {
    // Insert users into db
    log('Tables seeding starts');
    await pool.query(query.regUser(users[0]));
    await pool.query(query.regUser(users[1]));
    await pool.query(query.regUser(users[2]));
    await pool.query(query.regUser(users[3]));
    await pool.query(query.regUser(users[4]));
    await pool.query(query.regUser(users[5]));
    await pool.query(query.regUser(users[6]));
    await pool.query(query.regUser(users[7]));
    await pool.query(query.regUser(users[8]));
    await pool.query(query.regUser(users[9]));
    await pool.query(query.regUser(users[10]));

    // Insert loans into db
    await pool.query(query.createLoan(loans[0]));
    await pool.query(query.createLoan(loans[1]));
    await pool.query(query.createLoan(loans[2]));
    await pool.query(query.createLoan(loans[3]));
    await pool.query(query.createLoan(loans[4]));

    // Insert repayments into db
    await pool.query(query.createRepaymentRecord(repayments[0]));
    await pool.query(query.createRepaymentRecord(repayments[1]));
    await pool.query(query.createRepaymentRecord(repayments[2]));
    await pool.query(query.createRepaymentRecord(repayments[3]));
    await pool.query(query.createRepaymentRecord(repayments[4]));
    await pool.query(query.createRepaymentRecord(repayments[5]));

    log('Tables seeding ends');
  } catch (error) {
    log(error.stack);
    return error.stack;
  }
};

setupDbTables();
