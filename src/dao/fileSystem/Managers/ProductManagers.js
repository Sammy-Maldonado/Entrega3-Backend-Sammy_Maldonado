import fs from 'fs';

class ProductManager {
  constructor() {
    this.path = './files/Products.json';
  }

  async getProducts(limit) {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);
      if (limit) {
        return products.slice(0, limit);
      } else {
        return products;
      }
    } else {
      return [];
    }
  }

  async addProduct({ title, description, price, code, stock, category, thumbnails, status }) {

    const product = {
      title,
      description,
      price,
      code,
      stock,
      status: true,
      category,
      thumbnails: []
    }
    //Comprobando que no falten datos o que no esten vacíos
    if (!title || !description || !code || !price || !stock || !category || !thumbnails || !(typeof status === 'boolean') || typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string' || !title.trim() || !description.trim() || !code.trim() || !category.trim()) {
      throw new Error('Datos incompletos, por favor, verifica que los datos se estén enviando correctamente');
    }

    const products = await this.getProducts();

    // Verificar que el código no esté en uso
    const productWithCode = products.find(product => product.code === code);
    if (productWithCode) {
      throw new Error("El código del producto ya está en uso. Revisa que no hayan productos con el mismo código e intenta nuevamente.");
    }

    //Generando Id automatica
    if (products.length > 0) {
      product.id = products[products.length - 1].id + 1;
    } else {
      product.id = 1;
    }

    //Pusheando el producto nuevo
    products.push(product);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    return product;
  }

  async getProductById(pId) {
    const products = await this.getProducts();
    const product = products.find(product => product.id === pId);
    if (!product) {
      throw new Error("Producto no encontrado. Por favor, ingrese una id válida.");
    }
    console.log(`El producto ${product.id} - "${product.title}" fue encontrado con éxito.`);
    return product;
  }

  async updateProduct(productId, updates) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === productId);

    if (index === -1) {
      throw new Error("Producto no encontrado. Por favor, ingrese una id válida.");
    }

    // Verificando que no se pueda actualizar a un objeto vacío
    if (Object.keys(updates).length === 0) {
      throw new Error('El objeto de actualización está vacío. Por favor, ingrese al menos una propiedad para actualizar.');
    }

    // Verificando que los tipos de datos de las propiedades actualizadas sean los correctos
    if (typeof updates.title !== 'undefined' && typeof updates.title !== 'string') {
      throw new Error('El título debe ser una cadena de texto.');
    }
    if (typeof updates.description !== 'undefined' && typeof updates.description !== 'string') {
      throw new Error('La descripción debe ser una cadena de texto.');
    }
    if (typeof updates.code !== 'undefined' && typeof updates.code !== 'string') {
      throw new Error('El código debe ser una cadena de texto.');
    }
    if (typeof updates.category !== 'undefined' && typeof updates.category !== 'string') {
      throw new Error('La categoría debe ser una cadena de texto.');
    }
    if (typeof updates.status !== 'undefined' && typeof updates.status !== 'boolean') {
      throw new Error('El estado debe ser un valor booleano.');
    }

    // Comprobación de que la nueva id no existe en otro producto
    if (updates.id && updates.id !== productId && products.some((p) => p.id === updates.id)) {
      throw new Error("Ya existe un producto con el mismo id. Por favor, actualice con una ID diferente.");
    }

    // Comprobación de que el nuevo código no existe en otro producto
    const duplicateCode = products.some(product => product.code === updates.code && product.id !== productId)
    if (duplicateCode) {
      throw new Error("Ya existe un producto con el mismo código. Por favor, ingrese otro código.");
    }

    const product = { ...products[index], ...updates };
    products[index] = product;

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
    console.log(`El producto ${product.id} - "${product.title}" fue actualizado con éxito.`);
    return product;
  }

  async deleteProduct(productId) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === productId);

    if (index === -1) {
      throw new Error("Producto no encontrado. Por favor, ingrese una id válida.");
    }

    const product = products[index];
    products.splice(index, 1);
    console.log(`El producto "${product.title}" fue eliminado con éxito.`);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
  }
}

export default ProductManager