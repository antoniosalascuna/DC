var express = require('express');
var router = express.Router();
var productos = require('../models/productos');

/* GET home page. */
router.get('/lista', function(req, res, next) {
    productos.getProductos(function(err, resultado){
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

router.post('/filtrado', function(req, res, next) {
    if(req.body.texto){
        
    
    productos.getProductosFiltro(req, function(err, resultado){
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
});
    
router.post('/insertarP', function(req, res, next) {
    const data = req.body;
    productos.insert(req,res,data);

});

router.post('/updateP', function(req, res, next) {
    const data = req.body;
    dat=data.PRO_ID_PRODUCTO;
    delete data['PRO_ID_PRODUCTO'];
    productos.update(req,res,data, dat);

});

router.post('/deleteP', function(req, res, next) {
    const data = req.body;
    productos.delete(req,res,data);

});



module.exports = router;