import fs from 'fs';

class CartManager {
  constructor() {
    this.path = './files/Cart.json';
  }

  async getCarts() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const carts = JSON.parse(data);
      return carts;
    } else {
      return [];
    }
  }

  async addCart({ products }) {

    const cart = {
      products: products || []
    }

    //Verificando que no se puedan enviar productos vacíos
    if (!products || products.length === 0) {
      throw new Error('No se han proporcionado productos. Por favor, verifica los datos enviados.')
    }

    // Verificando si hay objetos vacíos en el arreglo de productos
    products.forEach(product => {
      if (Object.keys(product).length === 0) {
        throw new Error('Se ha proporcionado un objeto vacío en el arreglo de productos. Por favor, verifica los datos enviados');
      }

      // Validar que los campos title, description, code y category sean de tipo string y obligatorios
      if (typeof product.title !== 'string' || typeof product.description !== 'string' || typeof product.code !== 'string' || typeof product.category !== 'string' || !product.title || !product.description || !product.code || !product.category) {
        throw new Error('Los campos title, description, code y category son obligatorios y deben ser de tipo string. Por favor, verifica los datos enviados.');
      }

      // Validar que el campo status sea de tipo boolean y obligatorio
      if (typeof product.status !== 'boolean' || product.status === null || product.status === undefined) {
        throw new Error('El campo status es obligatorio y debe ser de tipo boolean. Por favor, verifica los datos enviados.');
      }

      // Verificar si el código del producto ya está en uso en otro producto en el arreglo
      products.forEach((product, index) => {
        const duplicateProduct = products.find((prod, idx) => idx !== index && prod.code === product.code);
        if (duplicateProduct) {
          throw new Error(`No se pueden agregar productos repetidos dentro del mismo carrito - codigo repetido: '${product.code}'. Verifique los datos enviados e intente nuevamente.`);
        }
      });
    });

    //Leyendo el archivo Cart.json
    const carts = await this.getCarts();

    //Verificar si hay un carrito con la misma ID
    const existingCart = carts.find(c => c.id === cart.id);
    if (existingCart) {
      throw new Error('Ya existe un carrito con el mismo ID');
    }

    //Generando Id automatica
    if (carts.length > 0) {
      cart.id = carts[carts.length - 1].id + 1;
    } else {
      cart.id = 1;
    }

    //Agregando el nuevo carrito al array de carritos
    carts.push(cart);
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))
    return carts;
  }

  async getCartById(cid) {
    //Obtenemos los carritos existentes
    const carts = await this.getCarts();

    //Buscando el carrito con el "cid" especifico
    const cart = carts.find(c => c.id === cid);

    //Verificando si se encontró el carrito
    if (!cart) {
      throw new Error('Carrito no encontrado. Por favor, ingrese una ID válida.');
    }
    console.log(`El carrito ${cart.id} fue encontrado con éxito.`);
    return cart;
  }

  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.getCarts();
    //Buscando el carrito con el ID proporcionado
    const cart = carts.find(c => c.id === cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado. Por favor, ingrese una Id válida.');
    }
    // Validando si el ID del producto es mayor que 0
    if (productId <= 0) {
      throw new Error('El ID del producto debe ser mayor que 0.');
    }
    //Buscando el producto con el ID proporcionado
    const product = cart.products.find(p => p.product === productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    //Reescribiendo los cambios
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'), 'utf-8')
    return cart;
  }

}



export default CartManager