import MongoSingleton from '../../MongoSingleton.js';
import config from '../config.js';

const persistence = "MONGO";

//A partir de esta variable, definirá que DAO (manager) tomar.
//Se va a preguntar, ¿De que caso se trata?

export default class PersistenceFactory {

  static async getPersistence() {
    let cartsDAO;
    let messagesDAO;
    let productsDAO;
    let usersDAO;
    let ordersDAO;
    switch (config.PERSISTENCE) {
      case "MONGO":
        //Importo el archivo SOLO cuando lo necesite.
        MongoSingleton.getInstance();
        const { default: CartsManager } = await import('./mongo/Managers/CartsManager.js');
        const { default: MessagesManager } = await import('./mongo/Managers/MessagesManager.js');
        const { default: ProductsManager } = await import('./mongo/Managers/ProductsManager.js');
        const { default: UsersManager } = await import('./mongo/Managers/UsersManager.js');
        const { default: OrdersManager } = await import('./mongo/Managers/OrdersManager.js');
        cartsDAO = new CartsManager();
        messagesDAO = new MessagesManager();
        productsDAO = new ProductsManager();
        usersDAO = new UsersManager();
        ordersDAO = new OrdersManager();
        break;

      case "FS":
        const { default: CartsManagerFS } = await import('./fileSystem/Managers/CartManagers.js');
        const { default: ProductsManagerFS } = await import('./fileSystem/Managers/ProductManagers.js');
        cartsDAO = CartsManagerFS();
        productsDAO = ProductsManagerFS();
        break;
    }
    return {
      cartsDAO,
      messagesDAO,
      productsDAO,
      usersDAO,
      ordersDAO
    };
  }
}