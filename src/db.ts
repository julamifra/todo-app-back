import pg from 'pg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { NODE_ENV } = process.env;

export const pool = new pg.Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database:
    NODE_ENV === 'test'
      ? process.env.PG_DATABASE_TESTS
      : process.env.PG_DATABASE,
});

console.log('ENVIROMENT: ', NODE_ENV);

pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    return console.error('Error in database conexion: ', err);
  }
  console.log('Connected to database at:', result.rows[0].now);
});
