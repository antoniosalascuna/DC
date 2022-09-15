
/**FORMATO DE LA FECHA QUE VIENE DE LA BASE DE DATOS MYSQL */
const {format} = require ('timeago.js');


const helpers = {};

helpers.timeago  = (timestamp) => {
    return format(timestamp);
};
module.exports = helpers;