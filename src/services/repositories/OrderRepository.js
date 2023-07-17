

export default class OrdersService {
  constructor(dao) {
    this.dao = dao;
  }

  getAllOrders = (params) => {
    return this.dao.getOrders(params);
  }

  getOrderBy = (params) => {
    return this.dao.getOrderBy(params);
  }

  createOrder = (order) => {
    return this.dao.addOrder(order);
  }

  updateOrder = (id, order) => {
    return this.dao.updateOrder(id, order);
  }

  deleteOrder = (id) => {
    return this.dao.deleteOrder(id);
  }
}