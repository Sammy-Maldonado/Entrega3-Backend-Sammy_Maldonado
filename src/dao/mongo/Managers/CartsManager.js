import cartsModel from "../models/carts.js"
import mongoose from "mongoose";

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartBy = (params) => {
    return cartsModel.findOne(params).lean();
  }

  getCartById = (cartId) => {
    return cartsModel.findById(cartId);
  };

  addCart = (carts) => {
    return cartsModel.create(carts);
  };

  addProductToCart = async (cartId, productId, quantity) => {
    const cart = await this.getCartById(cartId);

    if (!cart) {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }
    //Buscando el producto con el ID proporcionado
    const product = await cartsModel.findOne(
      { _id: cartId, 'products.product': productId }
    );

    if (product) {
      await cartsModel.updateOne(
        { _id: cartId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } }
      )
    } else {
      await cartsModel.updateOne(
        { _id: cartId },
        { $push: { products: { product: new mongoose.Types.ObjectId(productId), quantity: quantity } } }
      );
    }

    // Guardando los cambios en la base de datos
    cart.save();

    // Retornando el carrito actualizado
    return cart;
  }

  deleteAllProducts = async (cartId, deleteProducts) => {
    const cart = await this.getCartById(cartId);

    if (cart) {
      cart.products = deleteProducts;
      await cart.save();
    } else {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }

    return cart;
  }

  deleteProductFromCart = async (cartId, productId) => {
    const cart = await this.getCartById(cartId);

    //Buscando el producto con el ID proporcionado
    const product = await cartsModel.findOne(
      { _id: cartId, 'products.product': productId }
    );

    if (product) {
      await cartsModel.updateOne(
        { _id: cartId, 'products.product': productId },
        { $pull: { 'products': { product: productId } } }
      )
    } else {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }

    // Guardando los cambios en la base de datos
    cart.save();

    // Retornando el carrito actualizado
    return cart;
  }

  updateCart = async (cartId, updatedProducts) => {
    const cart = await this.getCartById(cartId);

    if (cart) {
      cart.products = updatedProducts;
      await cart.save();
    } else {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }

    return cart;
  }

  updateProductQuantity = async (cartId, productId, quantity) => {
    const cart = await this.getCartById(cartId);

    if (!cart) {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }
    //Buscando el producto con el ID proporcionado
    const product = await cartsModel.findOne(
      { _id: cartId, 'products.product': productId }
    );

    if (product) {
      await cartsModel.updateOne(
        { _id: cartId, 'products.product': productId },
        { $set: { 'products.$.quantity': quantity } }
      )
    } else {
      throw new Error('Producto no encontrado. Por favor, ingrese una Id válida.');
    }

    // Guardando los cambios en la base de datos
    cart.save();

    // Retornando el carrito actualizado
    return cart;
  }
}