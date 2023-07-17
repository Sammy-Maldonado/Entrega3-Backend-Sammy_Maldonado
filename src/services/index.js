import PersistenceFactory from '../dao/Factory.js';

import CartsService from './Repositories/CartsRepository.js';
import ProductsService from './Repositories/ProductsRepository.js';
import MessagesService from './Repositories/MessagesRepository.js';
import UsersService from './Repositories/UsersRepository.js';
import OrderService from './Repositories/OrderRepository.js'

const persistence = await PersistenceFactory.getPersistence();

const cartsDAO = persistence.cartsDAO;
const productsDAO = persistence.productsDAO;
const messagesDAO = persistence.messagesDAO;
const usersDAO = persistence.usersDAO;
const ordersDAO = persistence.ordersDAO;

export const cartsService = new CartsService(cartsDAO);
export const productsService = new ProductsService(productsDAO);
export const messagesService = new MessagesService(messagesDAO);
export const usersService = new UsersService(usersDAO);
export const ordersServices = new OrderService(ordersDAO)