import log from 'fancy-log';
import pool from '../utils/connection';

(async () => {
  try {
    log('Tables drop starts');
    await pool.query('DROP TABLE IF EXISTS repayments;');
    await pool.query('DROP TABLE IF EXISTS loans;');
    await pool.query('DROP TABLE IF EXISTS users;');
    log('Tables drop ends');
  } catch (error) {
    log(error.stack);
    return error.stack;
  }
})();
