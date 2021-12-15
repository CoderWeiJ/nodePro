const {
  createOrder,
  findAllOrder,
  updateStatus
} = require('../service/order.service.js');
class OrderController {
  // 生成订单
  async create(ctx, next) {
    // 准备数据
    const user_id = ctx.state.user.id;
    const {
      address_id,
      goods_info,
      total
    } = ctx.request.body;
    const order_number = 'zd_' + Date.now();
    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number
    });
    ctx.body = {
      code: '0',
      message: '生成订单成功',
      result: res
    }

  }

  // 获取订单列表
  async findAll(ctx, next) {
    const user_id = ctx.state.user.id;
    const {
      pageNum = 1, pageSize = 10, status = 0
    } = ctx.request.query;
    const res = await findAllOrder(pageNum, pageSize, status);
    ctx.body = {
      code: '0',
      message: '获取订单列表成功',
      result: res
    }
  }

  // 更新订单状态
  async update(ctx, next) {
    const id = ctx.request.params.id;
    const {status} = ctx.request.body;
    const res = await updateStatus(id, status);

    ctx.body = {
      code: '0',
      message:'订单状态更新成功',
      result: res
    }
  }
}


module.exports = new OrderController();