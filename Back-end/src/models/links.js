var db = require('../dbconnection');
var links = {

    getlinks : function (callback){
        consulta='SELECT * FROM database_links.links';
        result = db.query(consulta, callback);
    },
    newlink : function (links,callback){
       
        consulta=`INSERT INTO database_links.links(tittle, url, descripcion, user_id)
                 VALUES (?,?,?,?)`;
        result = db.query(consulta,[links.tittle, links.url, links.descripcion, links.user_id], callback);
    },

    editlink : function (req,callback){
        const {tittle, url, descripcion } = req.body;
        const{id} = req.params;
        consulta=`UPDATE links SET tittle=?, url=?, descripcion=? WHERE id = ?`;
        result = db.query(consulta,[tittle, url, descripcion,id], callback);
    } ,
    deleteLink : function (req,callback){
        const{id} = req.params;
        consulta=`DELETE FROM links WHERE id = ?`;
        result = db.query(consulta,[id], callback);
    } ,
    searchlink : function (req,callback){
        const{id} = req.params;
        consulta=`SELECT * FROM links WHERE id = ?`;
        result = db.query(consulta,[id], callback);
    },
    
};

module.exports = links;