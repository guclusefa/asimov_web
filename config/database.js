// connexion bdd ----------------------------------------------------------------------------------------------
/* var mysql = require('mysql');
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
module.exports = conn; */

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',  
    database: 'e5_asimov' 
});
conn.connect(function (err) {
    if (err) throw err;
    console.log('BDD connecté avec succès !');
});
module.exports = conn;