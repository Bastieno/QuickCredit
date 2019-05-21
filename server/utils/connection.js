import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/*
const connectionURI = environment === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: connectionURI });
*/

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL_TEST });

export default pool;
