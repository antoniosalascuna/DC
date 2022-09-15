var db = require('../dbconnection');
var detalle = {
    getDetallesF: function(callback){
        consulta='select * from tbl_detalle_factura';
        result= db.query(consulta, callback);
    },
    
    getDetallesXFactura: function(req, callback){
        const {texto } = req.body;
        consulta="select * from tbl_detalle_factura where DETFAC_ID_FACTURA = ?;";
        result= db.query(consulta, texto ,callback);
    },
    getDetallesXId: function(req, callback){
        const {texto } = req.body;
        consulta="select * from tbl_detalle_factura where DETFAC_ID_DETALLE = ?;";
        result= db.query(consulta, texto ,callback);
    },
    
    insert: function(req, res, data){
        result= db.query('insert into tbl_detalle_factura set ?',data, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            
            res.json({
                  success: true,
                  message: 'Se ha insertado con éxito',
                  prueba: lista.insertId
                });
        }
        });
    },
    
    update: function(req, res, data, dat){
        result= db.query('update tbl_detalle_factura set ? where DETFAC_ID_DETALLE= ?',[data, dat], (err, resultado)=>{
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
        result= db.query('DELETE FROM tbl_detalle_factura WHERE DETFAC_ID_DETALLE= ?',data.idDetalle, (err, resultado)=>{
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


};
module.exports= detalle;