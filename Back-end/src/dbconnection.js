var mysql = require('mysql')

const { database } = require('./keys');

var connection = mysql.createPool(database);


connection.getConnection((err, connection) => {
    if (err) {

        if (err.code === 'PROTOCOL_CONECTION_LOST') {
            console.log('SE PERDIO CONEXION CON LA BD');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('LA BD TIENE MUCHAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('LA CONEXION A LA BD FUE RECHAZADA');
        }
    }

    if(connection) connection.release();
    console.log ('LA CONEXION A LA BD FUE EXITOSA');
});
module.exports = connection;