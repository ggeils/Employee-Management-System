const mysql = require('mysql');

module.exports = mysql.createConnection({
    host: "localhost",
    port: 3301,
  
    user: 'root',
    password: 'ayzel76',
    database: 'employee_db'
  });