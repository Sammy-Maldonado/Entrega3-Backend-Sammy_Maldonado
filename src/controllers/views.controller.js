import { productsService, cartsService } from '../services/index.js';

const getProducts = async (req, res) => {
  const products = await productsService.getAllProducts().lean();
  res.render('products', {products, user: req.user});
}

const getCarts = async (req, res) => {
  const carts = await cartsService.getAllCarts().lean();
  res.render('carts', { carts });
}

const chat = async (req, res) => {
  res.render('chat');
}

const addPaginate = async (req, res) => {
  const { page = 1, category, sort = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productsService.addPaginate(
    { /* category: "frutas" */ },
    {
      page, limit: 5,
      lean: true,
      sort: { price: sort }
    });
  const products = docs

  res.render('products', { user:req.user, products, page: rest.page, hasPrevPage, hasNextPage, prevPage, nextPage })
}

const register = (req,res)=>{
  res.render('register');
}

const login = (req, res) => {
  res.render('login');
}

const profile = (req,res)=>{
  res.render('profile',{ user:req.user })
}

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await productsService.getProductById(productId).lean();

    if (!product) {
      res.status(404).send({ error: "Producto no encontrado. Por favor, ingrese un Id válido." });
      return;
    }

    res.render('product-details', { product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
}

const getCartById = async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await cartsService.getCartById(cartId).populate('products.product').lean();

    if (!cart) {
      res.status(404).send({ error: "Carrito no encontrado. Por favor, ingrese una Id válida." });
      return;
    }

    res.render('cart-details', { cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
}

export default {
  getProducts,
  getCarts,
  chat,
  addPaginate,
  register,
  login,
  profile,
  getProductById,
  getCartById
}