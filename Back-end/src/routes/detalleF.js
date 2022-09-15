var express = require('express');
var router = express.Router();
var detallesF = require('../models/detalleF');

/* GET home page. */
router.get('/lista', function(req, res, next) {
    detallesF.getDetallesF(function(err, resultado){
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

router.post('/filtradoDXF', function(req, res, next) {
    detallesF.getDetallesXFactura(req, function(err, resultado){
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
});

router.post('/filtradoDXId', function(req, res, next) {
    detallesF.getDetallesXId(req, function(err, resultado){
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
});
    
router.post('/insertarDF', function(req, res, next) {
    const data = req.body;
    detallesF.insert(req,res,data);

});
/*********************************************************************************
UPDATE POR MEDIO DE LA CEDULA
*********************************************************************************/
router.post('/updateDF', function(req, res, next) {
    const data = req.body;
    dat=data.DETFAC_ID_DETALLE;
    delete data['DETFAC_ID_DETALLE'];
    detallesF.update(req,res,data, dat);

});

router.post('/deleteDF', function(req, res, next) {
    const data = req.body;
    detallesF.delete(req,res,data);

});

module.exports = router;