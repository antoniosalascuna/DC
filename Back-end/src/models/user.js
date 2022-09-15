var db = require('../dbconnection');
var user = {

    getUsers : function (callback){
        consulta='SELECT * FROM users';
        result = db.query(consulta, callback);
    },
    newUser : function (user,callback){
       
        consulta=`insert into users(username, password, fullname, estado)
                 values (?,?,?,?)`;
        result = db.query(consulta,[user.username, user.password, user.fullname, user.estado]);
    },

    editUser : function (req,callback){
        const {username, password, fullname, estado} = req.body;
        const{username} = req.params;
        consulta=`UPDATE users SET username = ?, password=?, fullname=?,  estado = ?  WHERE username = ?`;
        result = db.query(consulta,[username, password, fullname, estado]);
    } ,
    deleteUser : function (req,callback){
        const{username} = req.params;
        consulta=`DELETE FROM user WHERE username = ?`;
        result = db.query(consulta,[username], callback);
    } ,
    searchUser : function (req,callback){
        const{username} = req.params;
        consulta=`SELECT * FROM users WHERE username = ?`;
        result = db.query(consulta,[username], callback);
    },
    
};

module.exports = user;