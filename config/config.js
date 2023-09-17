const mysql = require('mysql2');


const db = mysql.createConnection({

    host: 'aws.connect.psdb.cloud',
    user: 'g4xvbm3tz3h6otjpp4tt',
    password: 'pscale_pw_vgrC4PzD8qKNqx5wLvHiF96OR39X6YkabJkQRPa0ZHN',
    database: 'bd-luruaco_app',
  
    ssl: {"rejectUnauthorized":true}

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
