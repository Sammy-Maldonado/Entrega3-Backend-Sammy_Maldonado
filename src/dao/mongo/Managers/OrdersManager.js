import orderModel from "../models/orders.js";

export default class OrdersManager {
  getOrders = (params) => {
    return orderModel.find(params).lean();
  }

  getOrderBy = (params) => {
    return orderModel.findOne(params).lean();
  }

  addOrder = (order) => {
    return orderModel.create(order);
  }

  updateOrder = (id, order) => {
    return orderModel.findByIdAndUpdate(id, {$set:order});
  }

  deleteOrder = (id) => {
    return orderModel.findByIdAndDelete(id);
  }
}