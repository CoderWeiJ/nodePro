const Order = require('../model/order.model.js');
class OrderService {
  // 创建订单
  async createOrder(params) {
    return await Order.create(params);
  }
  // 获取订单列表
  async findAllOrder(pageNum, pageSize, status) {
    const {
      count,
      rows
    } = await Order.findAndCountAll({
      attributes: ['id', 'user_id', 'address_id', 'goods_info', 'total', 'order_number', 'status'],
      where: {
        status
      },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1
    })
    return {
      total: rows.length,
      list: rows
    };
  }

  // 更新订单状态
  async updateStatus(id, status) {
    return await Order.update({
      status
    }, {
      where: {
        id
      }
    });
  }
}

module.exports = new OrderService();