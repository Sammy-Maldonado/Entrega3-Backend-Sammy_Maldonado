export default class ProductsService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllProducts = (params) => {
    return this.dao.getProducts(params);
  }

  getProductById = (productId) => {
    return this.dao.getProductById(productId);
  }

  getOneProduct = (params) => {
    return this.dao.getOneProduct(params);
  }

  createProduct = (product) => {
    return this.dao.addProduct(product);
  }

  updateProduct = (productId, productToUpdate) => {
    return this.dao.updateProduct(productId, productToUpdate);
  }

  deleteProduct = (productId) => {
    return this.dao.deleteProduct(productId);
  }

  addPaginate = (query, options) => {
    return this.dao.addPaginate(query, options);
  }
}