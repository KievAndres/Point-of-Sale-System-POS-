const Pool = require('pg/lib').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'dotaeslomejor30',
  host: 'localhost',
  port: 5432,
  database: 'POS'
})

module.exports = pool;
