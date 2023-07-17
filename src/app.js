import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import cors from 'cors';
import config from './config.js';

import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import SessionsRouter from './routes/sessions.router.js';
import ordersRouter from './routes/orders.router.js'

import registerChatHandler from './listeners/chatHandler.js';
import initializePassportStrategies from './config/passport.config.js';
import __dirname from './utils.js';


const app = express();
//Defino que front puede entrar a mi servidor mediante CORS
app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));
const PORT = config.app.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  //Referenciando nuestro io
  req.io = io;
  next();
})

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

initializePassportStrategies();

const sessionsRouter = new SessionsRouter();

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/sessions',sessionsRouter.getRouter());
app.use('/', viewsRouter);

//Escuchador de eventos (on)
io.on('connection', socket => {
  registerChatHandler(io, socket);
});


/* Sintaxis Mongo Avanzado */
const context = async () => {
  /* Creando un producto */
  /* const product = {
    title: "productito",
    description: "dulce",
    price: 600,
    code: "21",
    stock: 10,
    category: "frutas",
    thumbnails: []
  }
  await productsModel.create(product); */

  /* Creando un carrito */
  /* const cart =
  {
    "name": "Carrito de prueba con products",
    "price": 5000
  }

  await cartsModel.create(cart); */

  /* Agregando el producto al carrito */
  /* const cartId = "646ebbefe90f24c0096376c8";
    const productId = "646a825abd9bf198a28d3494";
    
    await cartsModel.updateOne(
      { _id: cartId },
      { $push: { products: { product: new mongoose.Types.ObjectId(productId) } } }
      ); */

  //El pructo "product" queda agregado a los "products" de mi carrito, pero se agrega solo con su "Id". Es necesario poblarlo con sus propiedades para que se vean sus prespectivos "title", "description", "price", etc, dentro de él.
  /* const cart = await cartsModel.find();
  console.log(JSON.stringify(cart,null,'\t')); */

};

context();