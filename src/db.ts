import pg from "pg";
require("dotenv").config();

export const pool = new pg.Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    return console.error("Error in database conexion: ", err.message);
  }
  console.log("Connected to database at:", result.rows[0].now);
});
