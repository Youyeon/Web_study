var mysql = require('mysql');
var connection= mysql.createConnection( {
    host : 'localhost',
    user : 'root',
    password : '0000',
    database : 'opentutorials'
});

connection.connect();