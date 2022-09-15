const express = require('express');
var link = require('../models/links');
const router = express.Router();


router.get('/add', (req, res)=>{
  res.render('links/add');
})

router.post('/add',async(req, res) =>{
console.log(req.body);
  let newlink = {
    tittle: req.body.title,
    url: req.body.url,
    descripcion: req.body.description
  };

 await link.newlink(newlink, function(err, lista){
    if(err){
      res.send( 'link Insertado incoCorrectamente');
      res.json(err);
    }else{
      req.flash('success', 'Link guardado satisfactoriamente');
     res.redirect('/links');
    }
  })
});

router.get('/', async(req, res)=>{
  
 await link.getlinks(function (err, lista){
   if(err){
     res.send('los datos no se pueden mostrar');
   }else{
     //res.json(lista);
     res.render('links/list', {lista} );
   }

 }) 
});

router.get('/delete/:id', async( req, res) => {
  
 await link.deleteLink(req, function (err,list){
  if(err){
    res.json(err);
  }else{
    //res.send( 'Link Eliminado Correctamente');
    res.redirect('/links');
  }
}) 
});

router.get('/edit/:id', async( req, res )=> {

  await link.searchlink(req,function(err,list){
    if(err){
      res.json(err);
      res.status(400);
    }else {
    res.render ('links/edit', {list: list[0] });
    }
  })
})

router.post('/edit/:id', async( req, res )=> {

  await link.editlink(req, function(err,list){
    if(err){
      res.json(err);
      res.status(400);
    }else {
      console.log(req.body)
      res.redirect('/links');
    }
  })
})

module.exports = router;