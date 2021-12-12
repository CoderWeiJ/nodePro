// 购物车中间件
const { GoodsNotExisted, cartFormatError } = require('../constant/err.type.js');
const { getUserInfo } = require('../service/user.service');
const { findGoodById } = require('../service/goods.service.js');
// 参数格式校验
// 使用闭包，更加灵活
function validator(rules) { // ctx, next
    return async function (ctx, next) {
        try {
            ctx.verifyParams(rules);
        } catch (err) {
            console.error(err);
            cartFormatError.result = err;
            return ctx.app.emit('error', cartFormatError, ctx);
        }
        await next();
    }
}

// 商品id和用户id是否存在
async function verifyParams(ctx, next) {
    const user_id = ctx.state.user.id;
    const { goods_id } = ctx.request.body;
    try {
        const user_id_res = await getUserInfo(+user_id);
        const goods_id_res = await findGoodById(+goods_id);
        if (!(user_id_res && goods_id_res)) {
            return ctx.app.emit('error', GoodsNotExisted, ctx);
        }
    } catch (err) {
        console.error(err);
        return ctx.app.emit('error', GoodsNotExisted, ctx);
    }
    await next();
}
module.exports = { validator, verifyParams };