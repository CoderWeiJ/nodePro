
const { cartFormatError } = require('../constant/err.type.js');
const { createOrUpdate, findCarts, updateCarts, removeCarts } = require('../service/cart.service.js');
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

    // 更新购物车
    async update(ctx, next) {
        // 1. 解析参数
        const { id } = ctx.request.params;
        const { number, selected } = ctx.request.body;
        if (number == null && selected == null) {
            cartFormatError.message = 'number和selected不能同时为空';
            return ctx.app.emit('error', cartFormatError, ctx);
        }
        // 2. 操作数据库
        const res = await updateCarts({ id, number, selected });
        // 3. 返回数据
        ctx.body = {
            code: '0',
            message: '更新购物车成功',
            result: res
        }
    }

    async remove(ctx, next) {
        const { ids } = ctx.request.body;
        const res = await removeCarts(ids);
        ctx.body = {
            code: '0',
            message: '删除购物车成功',
            result: res
        }
    }

}

module.exports = new CartController();