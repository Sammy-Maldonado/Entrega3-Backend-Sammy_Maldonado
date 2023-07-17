export default class CartsService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllCarts = (params) => {
    return this.dao.getCarts(params);
  }

  getCartBy = (params) => {
    return this.dao.getCartBy(params);
  }

  getCartById = (cartId) => {
    return this.dao.getCartById(cartId);
  }

  createCart = (carts) => {
    return this.dao.addCart(carts);
  }

  addProductToCart = (cartId, productId, quantity) => {
    return this.dao.addProductToCart(cartId, productId, quantity);
  }

  deleteAllProducts = (cartId, deleteProducts) => {
    return this.dao.deleteAllProducts(cartId, deleteProducts);
  }

  deleteProductFromCart = (cartId, productId) => {
    return this.dao.deleteProductFromCart(cartId, productId);
  }

  updateCart = (cartId, updatedProducts) => {
    return this.dao.updateCart(cartId, updatedProducts);
  }

  updateProductQuantity = (cartId, productId, quantity) => {
    return this.dao.updateProductQuantity(cartId, productId, quantity);
  }
}