const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: `${process.env.DB_SERVER}`,
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`
});

mysqlConnection.connect((err) => {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;
