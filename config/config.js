const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Arepa_Luruaco'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('BASE DE DATOS CONECTADA!');
});

module.exports = db;