var express = require('express');
var router = express.Router();
var facturas = require('../models/facturas');
var detalleF = require('../models/detalleF');

/* GET home page. */
router.get('/lista', function(req, res, next) {
    facturas.getFacturas(function(err, lista){
        if(err){
            res.jsonp(err);
        }else{
            //res.jsonp(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: lista,
                  /*nombre:lista.CLI_NOMBRE,
                  apellidos:lista.CLI_APELLIDOS,
                  telefono:lista.CLI_TELEFONO,
                  correo:lista.CLI_CORREO,
                  direccion:lista.CLI_DIRECCION,*/
                });
        }
    })
        
  //res.render('index', { title: 'Express' });
});

router.post('/listaFTelefono', function(req, res, next) {
    if(req.body.telefono){
    
    facturas.getFacturasTelefono(req, function(err, lista){
        if(err){
            res.jsonp(err);
        }else{
            //res.jsonp(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: lista,

                });
        }
    })
    
    }else{
        res.json({
                  success: false,
                  message: 'No se ha podido listar',
                  listado: [],

                });
    }
});

router.post('/listaFCorreo', function(req, res, next) {
    
    if(req.body.correo){
    facturas.getFacturasCorreo(req, function(err, lista){
        if(err){
            res.jsonp(err);
        }else{
            //res.jsonp(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: lista,

                });
        }
    })
    }else{
        res.json({
                  success: false,
                  message: 'No se ha podido listar',
                  listado: [],

                });
    }
});

router.post('/listaFCliente', function(req, res, next) {
    
    if(req.body.cedula){
    facturas.getFacturasCliente(req, function(err, lista){
        if(err){
            res.jsonp(err);
        }else{
            //res.jsonp(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: lista,

                });
        }
    })
    }else{
        res.json({
                  success: false,
                  message: 'No se ha podido listar',
                  listado: [],

                });
    }
});
    
router.post('/insertarF', function(req, res, next) {
    const data = req.body;
    facturas.insert(req,res,data);

});

router.post('/insertarF2', function(req, res, next) {
    const data = req.body;
    facturas.insert2(req,res,data);
    //detalleF
});


/*router.post('/prueba', function(req, res, next) {
    const datos = req.body;
    datos['prueba']= new Date();
    console.log(datos);
    res.json(req.body);

});*/
router.post('/updateF', function(req, res, next) {
    const data = req.body;
    dat=data.FACT_ID_FACTURA;
    delete data['FACT_ID_FACTURA'];
    facturas.update(req,res,data, dat);

});

router.post('/deleteF', function(req, res, next) {
    const data = req.body;
    facturas.delete(req,res,data);

});

module.exports = router;