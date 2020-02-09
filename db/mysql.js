const mysql = require('mysql');

const db = mysql.createConnection({
	host     : 'localhost',
	port	 : 3306,
    user     : 'root',
    password : '',
    database : 'db_crawling'
});

db.connect();

module.exports = db;