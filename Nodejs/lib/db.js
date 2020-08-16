var mysql = require('mysql');
var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '0000',
    database : 'opentutorials'
    //multipleStatements:true; //다중 쿼리 허용
  });
  db.connect();
  module.exports = db;
  //버전 관리에서 제외