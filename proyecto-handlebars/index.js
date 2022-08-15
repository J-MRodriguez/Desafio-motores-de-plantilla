const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let id = 0;
const productos = [];
let myInterruptor = (value) => {
  if (value) {
    return true;
  } else {
    return false;
  }
};

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/productos', (req, res) => {
  id++;
  const { title, price, thumbnail } = req.body;
  productos.push({ title, price, thumbnail });
  return res.redirect('/productos');
});

app.get('/productos', (req, res) => {
  let interruptor = myInterruptor(productos.length > 0) ? true : false;
  return res.render('productslist', { productos, interruptor });
});
