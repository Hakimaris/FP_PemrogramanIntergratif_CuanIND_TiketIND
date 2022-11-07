const mysql = require('mysql2');
// module.exports = mysql.createConnection({
//     host: 'remotemysql.com',
//     user: 'pvuizaixIL',
//     password: '1ATmdw7jht',
//     database: 'pvuizaixIL',
//     // port: 3306,
// });
module.exports = mysql.createPool({
    host: 'remotemysql.com',
    user: 'pvuizaixIL',
    password: '1ATmdw7jht',
    database: 'pvuizaixIL',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



