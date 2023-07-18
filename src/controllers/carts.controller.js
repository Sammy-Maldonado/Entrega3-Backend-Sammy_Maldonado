import { cartsService, productsService, ticketsServices } from "../services/index.js";
import TicketsDTO from "../dtos/carts/TicketsDTO.js";

const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getAllCarts();
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", error: 'Error interno del servidor' })
  }
}

const addCart = async (req, res) => {
  try {
    const { name, email } = req.body;

    //Verificando que el campo name se envie correctamente.
    if (!name || !email) {
      throw new Error("El 'name' y el 'email' deben estar incluidos en el carrito");
    }

    //Verificando que el campo name sea de tipo string.
    if (typeof name !== 'string' || typeof email !== 'string') {
      throw new Error("El 'name' y el 'email' deben ser de tipo 'String'")
    }

    //Verificando formato válido del correo electronico.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El correo electrónico debe tener un formato válido");
    }

    const newCart = await cartsService.createCart({ name, email });
    res.status(200).send({ status: "success", cart: newCart });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
}

const getCartById = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartsService.getCartById(cartId).populate('products.product');
    if (cart) {
      res.send({ status: "success", message: `El cartito '${req.params.cid}' se ha cargado con exito`, payload: cart });
    } else {
      res.status(400).send({ status: "error", error: 'Producto no encontrado, ingrese una Id valida' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message })
  }
}

const updateCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedProducts = req.body.products;

    // Verificando si los productos existen en la base de datos
    const productIds = updatedProducts.map(product => product.product);
    const existingProducts = await productsService.getAllProducts({ _id: { $in: productIds } });

    // Validando si se encontraron todos los productos
    if (existingProducts.length !== productIds.length) {
      res.status(400).send({ error: "Una o más IDs de productos no existen en la base de datos. Por favor, ingrese IDs válidas" });
      return;
    }

    const updatedCart = await cartsService.updateCart(cartId, updatedProducts);

    res.status(200).send({ status: "success", message: `Carrito actualizado correctamente`, payload: updatedCart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
}

const deleteAllProducts = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const deleteProducts = [];

    const deleteAllProducts = await cartsService.deleteAllProducts(cartId, deleteProducts);

    res.status(200).send({ status: "success", message: `Productos del carrito eliminados con éxito`, payload: deleteAllProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message });
  }
}

const addProductToCart = async (req, res) => {
  try {
    const cid = (req.params.cid);
    const pid = (req.params.pid);
    const quantity = (req.body.quantity);

    // Validando si el ID del producto es mayor que 0
    if (pid <= 0) {
      throw new Error('El Id del producto debe ser mayor que 0.');
    }

    const updatedCart = await cartsService.addProductToCart(cid, pid, quantity);
    if (updatedCart) {
      res.status(200).send({ status: "success", message: `Producto agregado correctamente al carrito '${req.params.cid}'`, payload: updatedCart })
    } else {
      res.status(400).send({ status: "error", error: error.message })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message })
  }
}

const updateProductQuantity = async (req, res) => {
  try {
    const cid = (req.params.cid);
    const pid = (req.params.pid);
    const quantity = (req.body.quantity);

    // Validando si el ID del producto es mayor que 0
    if (pid <= 0) {
      throw new Error('El Id del producto debe ser mayor que 0.');
    }

    const updatedProductQuantity = await cartsService.updateProductQuantity(cid, pid, quantity);
    if (updatedProductQuantity) {
      res.status(200).send({ status: "success", message: `Cantidad actualizada correctamente`, payload: updatedProductQuantity })
    } else {
      res.status(400).send({ status: "error", error: error.message })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message })
  }
}

const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartsService.deleteProductFromCart(cid, pid);

    // Consulta para obtener el título del producto eliminado
    const deleteProduct = await productsService.getProductById(pid);

    res.status(200).send({ status: "success", message: `El producto '${deleteProduct.title}' ha sido eliminado con exito`, payload: deleteProduct });

  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: error.message })
  }
}

const purchaseCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productsNotPurchased = [];

    // Obteniendo el carrito de la base de datos
    const cart = await cartsService.getCartById(cartId).populate('products.product');

    for (const item of cart.products) {
      const product = item.product;
      const quantityInCart = item.quantity;

      if (quantityInCart > product.stock) {
        // El producto no tiene suficiente stock
        productsNotPurchased.push(item._id);
      } else {
        // Restar la cantidad comprada del stock del producto
        product.stock -= quantityInCart;
        await product.save();
      }
    }

    if (cart.products.length === 0) {
      return res.status(400).send({ error: "Su carrito está vacío. Por favor, ingrese al menos un producto para realizar su compra." });
    }

    // Crear un nuevo ticket con los datos de la compra
    const ticketDTO = new TicketsDTO.CreateTicketDTO(cart);
    const newTicket = { ...ticketDTO }

    // Utilizar el servicio de Tickets para generar el ticket
    const createdTicket = await ticketsServices.createTicket(newTicket);

    // Actualizar el estado del carrito y los productos no comprados
    cart.products = cart.products.filter((item) => !productsNotPurchased.includes(item._id));
    cart.status = 'completed';
    await cart.save();

    // Responder con el ticket y los productos no comprados
    if (productsNotPurchased.length > 0) {
      // Hay productos que no pudieron comprarse
      return res.send({ status: "error", message: "No se pudo realizar su compra por falta de stock en los siguientes productos", productsNotPurchased });
    } else {
      // Todos los productos se compraron con éxito
      return res.send({ status: "success", message: "Su compra se ha realizado con éxito", ticket: createdTicket });
    }
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    return res.status(500).send({ error: 'Ocurrió un error al finalizar la compra' });
  }
}

export default {
  getCarts,
  addCart,
  getCartById,
  updateCart,
  deleteAllProducts,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
  purchaseCart
}