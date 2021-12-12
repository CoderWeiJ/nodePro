
const { createOrUpdate } = require('../service/cart.service.js');
class CartController {

    // 添加购物车
    async add(ctx, next) {
        ctx.body = '购物车控制器';
        // 1. 解析user_id, goods_id
        const user_id = ctx.state.user.id;
        const { goods_id } = ctx.request.body;
        console.log(`user_id:${user_id}, goods_id:${goods_id}`);
        // 2. 操作数据库
        const res = await createOrUpdate(user_id, goods_id);
        // 3. 返回结果
        ctx.body = {
            code: '0',
            message: '添加购物车成功',
            result: res
        }

    }

}

module.exports = new CartController();

module.exports = new CartController();