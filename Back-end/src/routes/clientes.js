var express = require('express');
var router = express.Router();
var clientes = require('../models/clientes');

/* GET home page. */
router.get('/lista', function(req, res, next) {
    clientes.getClientes(function(err, resultado){
        if(err){
            res.jsonp(err);
        }else{
            //res.jsonp(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: resultado,
                });
        }
    })
        
  //res.render('index', { title: 'Express' });
});

router.post('/filtradoC', function(req, res, next) {
    if(req.body.texto){
    clientes.getCliente(req, function(err, resultado){
        if(err){
            res.jsonp(err);
        }else{
            //res.jsonp(lista);
            res.json({
                  success: true,
                  message: 'Se ha listado con éxito',
                  listado: resultado,
                  
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
        
  //res.render('index', { title: 'Express' });
});
    
router.post('/insertarC', function(req, res, next) {
    const data = req.body;
    dat=data.cedula;
    clientes.insert(req,res,data);

});

router.post('/updateC', function(req, res, next) {
    const data = req.body;
    dat=data.CLI_CEDULA;
    delete data['CLI_CEDULA'];
    clientes.update(req,res,data, dat);

});

router.post('/updateCI', function(req, res, next) {
    const data = req.body;
    dat=data.CLI_ID_CLIENTE;
    delete data['CLI_ID_CLIENTE'];
    clientes.updateI(req,res,data, dat);

});


router.post('/deleteC', function(req, res, next) {
    const data = req.body;
    clientes.delete(req,res,data);

});

module.exports = router;