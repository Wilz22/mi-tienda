const mysql = require('mysql2');
const util = require('util');

// Crear conexión con la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mitiendaDB'
});

// Convertir `connection.query` en una función que devuelve una promesa
connection.query = util.promisify(connection.query);

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;
