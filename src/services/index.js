import PersistenceFactory from '../dao/Factory.js';

import CartsService from './repositories/CartsRepository.js';
import ProductsService from './repositories/ProductsRepository.js';
import MessagesService from './repositories/MessagesRepository.js';
import UsersService from './repositories/UsersRepository.js';
import OrdersService from './Repositories/OrderRepository.js'
import TicketsService from './repositories/TicketRepository.js';

const persistence = await PersistenceFactory.getPersistence();

const cartsDAO = persistence.cartsDAO;
const productsDAO = persistence.productsDAO;
const messagesDAO = persistence.messagesDAO;
const usersDAO = persistence.usersDAO;
const ordersDAO = persistence.ordersDAO;
const ticketDAO = persistence.ticketsDAO;

export const cartsService = new CartsService(cartsDAO);
export const productsService = new ProductsService(productsDAO);
export const messagesService = new MessagesService(messagesDAO);
export const usersService = new UsersService(usersDAO);
export const ordersServices = new OrdersService(ordersDAO);
export const ticketsServices = new TicketsService(ticketDAO);