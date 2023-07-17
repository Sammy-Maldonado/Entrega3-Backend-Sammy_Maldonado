import productsModel from "../models/products.js"

export default class ProductsManager {
  getProducts = (params) => {
    return productsModel.find(params);
  };
  
  getProductById = (productId) => {
    return productsModel.findById(productId);
  };

  getOneProduct = (params) => {
    return productsModel.findOne(params)
  }
  
  addProduct = (product) => {
    return productsModel.create(product);
  };
  
  updateProduct = (productId, productToUpdate) => {
    return productsModel.updateOne({ _id: productId }, { $set: productToUpdate });
  };
  
  deleteProduct = (productId) => {
    return productsModel.deleteOne({ _id: productId });
  }

  addPaginate = (query, options) => {
    return productsModel.paginate(query, options);
  }
}