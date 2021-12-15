const Order = require('../model/order.model.js');
class OrderService {
  async createOrder(params) {
    return await Order.create(params);
  }
}

module.exports = new OrderService();