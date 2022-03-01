var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'mysql-asimov.alwaysdata.net',
    user: 'asimov', 
    password: 'Asimov2022*',  
    database: 'asimov_db' 
});
conn.connect(function (err) {
    if (err) throw err;
    console.log('BDD connecté avec succès !');
});
module.exports = conn;