import { cartsService, ordersServices, productsService, usersService } from "../services/index.js";

const getOrders = async (req, res) => {
  const orders = await ordersServices.getAllOrders();
  res.send({ status: "success", payload: orders })
}

const addOrder = async (req, res) => {
  const { user, cart, products } = req.body;
  const resultUser = await usersService.getUserBy({ _id: user });
  const resultCart = await cartsService.getCartBy({ _id: cart });

  const productIds = resultCart.products.map(function (item) {
    return item.product;
  });

  //El carrito filtra sus productos y va a devolver solo los que si coincidan con el id indicado.
  const filterProducts = productIds.filter(productId => products.includes(productId.toString()));
  //Estos son los ObjectId transformados a string plano
  const comparisonIds = filterProducts.map(objetId => objetId.toString());

  //Se comparan los ids planos filtrados con los solicitados en el body de postman
  const areEqual = comparisonIds.length === products.length && comparisonIds.every(elem => products.includes(elem));
  //Si no son iguales se envia el mensaje de error
  if (!areEqual) {
    console.log('Los arreglos no son iguales.');
    return res.status(400).send({ status: 'error', error: 'Los productos en el carrito no coinciden con los productos solicitados' });
  }

  //Si son iguales se procede a obtener los productos solicitados mediante sus respectivas ids.
  const actualProducts = await productsService.getAllProducts({ _id: { $in: filterProducts } });

  const totalPrice = actualProducts.reduce((accumulator, previous) => {
    return accumulator += previous.price
  }, 0);
  const orderNumber = Date.now() * Math.floor(Math.random() * 10000 + 1);
  const order = { //Poner DTO
    number: orderNumber,
    cart,
    user,
    status: "pending",
    products: actualProducts.map(product => ({
      title: product.title,
      price: product.price
    })),
    totalPrice
  }
  const orderResult = await ordersServices.createOrder(order);
  resultUser.orders.push(orderResult._id);
  await usersService.updateUser(user, { orders: resultUser.orders });
  res.send({ status: "success", payload: orderResult });
}

const completeOrder = async (req, res) => {
  //puedo incluir cosas como 
  //¿Como completas la orden?
  //Cuando se completa la orden, ¿qué ocurre con el usuario?
  //Cuando se completa la orden, ¿qué ocurre con el negocio?
}

const getOrderById = async (req, res) => {
  res.send("Get Order by Id");
}

const updateOrder = async (req, res) => {
  res.send("Order Updated");
}

const deleteOrder = async (req, res) => {
  res.send("Order Deleted");
}



export default {
  getOrders,
  addOrder,
  getOrderById,
  updateOrder,
  deleteOrder
}