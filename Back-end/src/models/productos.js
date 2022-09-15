var db = require('../dbconnection');
var producto = {
    getProductos: function(callback){
        consulta='select * from tbl_productos';
        result= db.query(consulta, callback);
    },
    
    
    getProductosFiltro: function(req, callback){
        const { texto } = req.body;
        let tex=  '%'+texto+'%';
        consulta="select * from tbl_productos where PRO_NOMBRE like ?;";
        result= db.query(consulta, tex ,callback);
    },
    
    
    
    insert: function(req, res, data){
        result= db.query('insert into tbl_productos set ?',data, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            
            res.json({
                  success: true,
                  message: 'Se ha insertado con éxito',
                  //prueba: lista.insertId
                });
        }
        });
    },
    
    update: function(req, res, data, dat){
        result= db.query('update tbl_productos set ? where PRO_ID_PRODUCTO= ?',[data, dat], (err, resultado)=>{
        if(err){
            //res.json(err);
            res.json({
                  success: false,
                  message: 'duplicado',
                  errores: err
                });
        }else{
            //res.json(lista);
            res.json({
                  success: true,
                  message: 'Se ha modificado con éxito',
                  listado: resultado
                });
        }
        });
    },
        
    delete: function(req, res, data){
        result= db.query('DELETE FROM tbl_productos WHERE PRO_ID_PRODUCTO = ?',data.idProducto, (err, resultado)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            res.json({
                  success: true,
                  message: 'Se ha eliminado con éxito',
                  listado: resultado
                });
        }
        });
    }
    /*getUser: function(req, res, data){
        result= db.query('select * from usuarios where cedula = ?',data.cedula, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: lista
                });
        }
        });
    },
    getUser2: function(req, res, data){
        result= db.query('select * from usuarios where cedula = ?',data.cedula, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            res.json(lista);
            
        }
        });
    },*/

};
module.exports= producto;