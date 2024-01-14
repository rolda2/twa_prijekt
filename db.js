// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'lab.uzlabina.cz',
  user: 'bryscto',
  password: 'hMe8mVofBfcLK648',
  database: 'bryscto',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;