var express = require('express');
var app = express();
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var cors = require('cors');
var rutalinks = require('./routes/links');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const {database} = require('./keys');
const session = require('express-session');

/***Las nuevas***/
var facturasRouter = require('./routes/facturas');
var clientesRouter = require('./routes/clientes');
var productosRouter = require('./routes/productos');
var detFacturasRouter = require('./routes/detalleF');

app.set ('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partialsDir: path.join (app.get('views'),'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));

app.set('view engine' , '.hbs');
app.use(session({
  secret: 'localhostersnode',
  resave: false,
  saveUninitialized:false,
  store: new MySQLStore(database)

}))
app.use(flash());
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());;
//Variables Globales 

app.use(( req, res, next)=>{
  app.locals.success = req.flash('success');
  next();
})
//Routes
// app.use(require('./routes'));
//app.use(require('./routes/authentication'));

app.use('/links', rutalinks); 

app.use('/facturas', facturasRouter);
app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);
app.use('/detFacturas', detFacturasRouter);

//Public
app.get('/', function(req, res) {
  res.send('Hola Mundo!');
});
app.use(express.static(path.join(__dirname, 'public')));
//iniciando el servidor



app.listen(9000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 9000!');
});
