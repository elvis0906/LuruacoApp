const mysql = require('mysql2');


const db = mysql.createConnection({

    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,    
    database: process.env.DATABASE

    //  host: 'localhost',
    // user: 'root',
    // password: '123456',
    // database: 'Arepa_Luruaco'
   
});

db.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})


module.exports = db;