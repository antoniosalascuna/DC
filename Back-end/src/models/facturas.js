var db = require('../dbconnection');
var factura = {
    getFacturas: function(callback){
        consulta='select * from tbl_factura';
        result= db.query(consulta, callback);
    },
    
    getFacturasTelefono: function(req, callback){
        const telefono  = '%'+ req.body['telefono']+'%';
        consulta="select * from tbl_factura where FACT_TELEFONO like ? ";
        result= db.query(consulta, telefono ,callback);
    },
    
    getFacturasCorreo: function(req, callback){
        const correo  = '%'+req.body['correo']+'%';
        consulta="select * from tbl_factura where FACT_CORREO like ? ";
        result= db.query(consulta, correo ,callback);
    },
    
    getFacturasCliente: function(req, callback){
        const cedula  = '%'+req.body['cedula']+'%';
        consulta="select * from tbl_factura where FACT_ID_CLIENTE like ?;";
        result= db.query(consulta, cedula ,callback);
    },
    
    insert: function(req, res, data){
        data['FACT_FECHA']= new Date();
        result= db.query('insert into tbl_factura set ?',data, (err, lista)=>{
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

    insert2: function(req, res, data){
        data['FACT_FECHA']= new Date();
        result= db.query('insert into tbl_factura set ?',data, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            /*data.FACT_DETALLE.array.forEach(element => {
                dat={
                    DETFAC_ID_FACTURA: element.lista.insertId,
                    DETFAC_ID_PRODUCTO: element.PRO_CODIGO_PRODUCTO,
                    DETFAC_CANTIDAD: element.CANTIDAD,
                    DETFAC_DESCRIPCION: element.PRO_DESCRIPCION,
                    DETFAC_IMPUESTO: element.PRO_IMPUESTO,
                    DETFAC_DESCUENTO: 0,
                    DETFAC_DOC_MAG: element.PRO_DOC_MAG,

                }
                detalleF.insert(req, res,dat);
            });*/
            
            res.json({
                  success: true,
                  message: 'Se ha insertado con éxito',
                  id: lista.insertId
                });
        }
        });
    },
    
    
    
    update: function(req, res, data, dat){
        result= db.query('update tbl_factura set ? where FACT_ID_FACTURA= ?',[data, dat], (err, resultado)=>{
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
        result= db.query('DELETE FROM tbl_factura WHERE FACT_ID_FACTURA= ?',data.idFactura, (err, resultado)=>{
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
    
    /*insert: function(req, res, data){
        result= db.query('insert into usuarios set ?',data, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            
            res.json({
                  success: true,
                  message: 'Se ha insertado con éxito',
                  
                });
        }
        });
    },
    
    insert2: function(req, res, data){
        result= db.query('insert into usuarios set ?',data, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            
            res.json({
                  success: true,
                  message: 'Se ha insertado con éxito',
                  id: lista.inser
                });
        }
        });
    },
    update: function(req, res, data, dat){
        result= db.query('update usuarios set ? where cedula= ?',[data, dat], (err, lista)=>{
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
                  listado: lista
                });
        }
        });
    },
    delete: function(req, res, data){
        result= db.query('DELETE FROM usuarios WHERE cedula= ?',data.cedula, (err, lista)=>{
        if(err){
            res.json(err);
        }else{
            //res.json(lista);
            res.json({
                  success: true,
                  message: 'Se ha eliminado con éxito',
                  listado: lista
                });
        }
        });
    }*/
};
module.exports= factura;