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
        consulta = 'INSERT INTO `tbl_productos`(`PRO_ID_PRODUCTO`, `PRO_NOMBRE`, `PRO_STOCK`, `PRO_PRECIO`, `PRO_DESCRIPCION`, `PRO_ESTADO`, `PRO_IMPUESTO`,`PRO_DOC_MAG`, `PRO_CODIGO_PRODUCTO`) VALUES (?,?,?,?,?,?,?,?,?);';
        console.log('data', data)
        result = db.query(consulta,[null,data.PRO_NOMBRE, data.PRO_STOCK, data.PRO_PRECIO, data.PRO_DESCRIPCION, data.PRO_ESTADO, data.PRO_IMPUESTO, data.PRO_DOC_MAG, data.PRO_CODIGO_PRODUCTO], (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            console.log(lista)
           // res.json(lista);
            
            res.json({
                  success: true,
                  message: 'Se ha insertado con éxito',
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