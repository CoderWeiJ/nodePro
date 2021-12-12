// 购物车中间件
const { invaildGoodsId, GoodsNotExisted } = require('../constant/err.type.js');
const { getUserInfo } = require('../service/user.service');
const { findGoodById } = require('../service/goods.service.js');
// 参数格式校验
async function vaildator(ctx, next) {
    try {
        ctx.verifyParams({
            goods_id: {
                type: 'number',
                required: true,
            },
        });
    } catch (error) {
        console.error(error);
        return ctx.app.emit('error', invaildGoodsId, ctx);
    }
    await next();
}

// 商品id和用户id是否存在
async function verifyParams(ctx, next) {
    const user_id = ctx.state.user.id;
    const { goods_id } = ctx.request.body;
    try {
        const user_id_res = await getUserInfo(user_id);
        const goods_id_res = await findGoodById(goods_id);
        console.log(`user_id_res${user_id_res}, goods_id_res${goods_id_res}`);
        if (!(user_id_res && goods_id_res)) {
            return ctx.app.emit('error', GoodsNotExisted, ctx);
        }
    } catch (err) {
        console.error(err);
        return ctx.app.emit('error', GoodsNotExisted, ctx);
    }
    await next();
}
module.exports = { vaildator, verifyParams };