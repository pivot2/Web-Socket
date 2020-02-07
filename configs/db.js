let { Pool } = require("pg");

// Connect using connection string if available.
// Otherwise, connect using credentials.
let config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL
    }
  : {
      user: 'me',//process.env.DB_USER,
      host: 'localhost',//process.env.DB_HOST,
      database: 'test',//process.env.DB_NAME,
      password: 'thang1511',//process.env.DB_PASS,
      port: 5432 //|| process.env.DB_PORT
    };

let pool = new Pool(config);

module.exports = pool;
