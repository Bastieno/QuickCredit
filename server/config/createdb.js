import log from 'fancy-log';
import pool from '../utils/connection';

const usersTable = `CREATE TABLE IF NOT EXISTS 
users (
  user_id serial NOT NULL PRIMARY KEY,
  email text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  password varchar(200) NOT NULL,
  address text NOT NULL,
  status text DEFAULT 'unverified' NOT NULL,
  is_admin boolean DEFAULT false NOT NULL);`;

const loansTable = `CREATE TABLE IF NOT EXISTS 
loans (
  loan_id serial NOT NULL PRIMARY KEY,
  user_email text NOT NULL REFERENCES users (email) ,
  created_on TIMESTAMP DEFAULT CURRENT_DATE NOT NULL,
  status text DEFAULT 'pending' NOT NULL,
  repaid boolean DEFAULT false NOT NULL,
  tenor int NOT NULL,
  amount float NOT NULL,
  payment_installment float NOT NULL,
  balance float NOT NULL,
  interest float NOT NULL);`;

const repaymentsTable = `CREATE TABLE IF NOT EXISTS 
repayments (
  repayment_id serial NOT NULL PRIMARY KEY,
  loan_id int NOT NULL REFERENCES loans (loan_id),
  created_on TIMESTAMP DEFAULT CURRENT_DATE NOT NULL,
  amount float NOT NULL,
  monthly_installment float NOT NULL,
  paid_amount float NOT NULL,
  balance float NOT NULL,
  payment_number int NOT NULL);`;

(async () => {
  try {
    log('Database creation starts');
    await pool.query(`${usersTable}`);
    await pool.query(`${loansTable}`);
    await pool.query(`${repaymentsTable}`);
    log('Database creation ends');
  } catch (error) {
    return error.stack;
  }
})();
