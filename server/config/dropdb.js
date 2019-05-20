import pool from '../utils/connection';

(async () => {
  try {
    console.log('Tables drop starts');
    await pool.query('DROP TABLE IF EXISTS repayments;');
    await pool.query('DROP TABLE IF EXISTS loans;');
    await pool.query('DROP TABLE IF EXISTS users;');
    console.log('Tables drop ends');
  } catch (error) {
    console.log(error.stack);
    return error.stack;
  }
})();
