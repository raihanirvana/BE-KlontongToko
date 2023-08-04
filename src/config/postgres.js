const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "KlontongDB",
  password: "raihan",
  port: 5432,
});

module.exports = pool;
