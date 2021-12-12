
const { createOrUpdate, findCarts } = require('../service/cart.service.js');
class CartController {

    // 添加购物车
    async add(ctx, next) {
        ctx.body = '购物车控制器';
        // 1. 解析user_id, goods_id
        const user_id = ctx.state.user.id;
        const { goods_id } = ctx.request.body;
        // 2. 操作数据库
        const res = await createOrUpdate(user_id, goods_id);
        // 3. 返回结果
        ctx.body = {
            code: '0',
            message: '添加购物车成功',
            result: res
        }
    }
    // 获取购物车列表数据
    async findAll(ctx, next) {
        // 1. 解析请求参数
        const { pageNum = 1, pageSize = 10 } = ctx.request.query;
        // 2. 操作数据库
        const res = await findCarts(pageNum, pageSize);
        // 3. 返回结果
        ctx.body = {
            code: '0',
            message: '获取购物车列表成功',
            result: res,
        }
    }

}

module.exports = new CartController();