// 商品模块中间件

const {
  goodsFormatError
} = require('../constant/err.type.js');
// 商品参数校验
function validator(rules) {
  return async function (ctx, next) {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error('商品参数错误: ', err);
      goodsFormatError.result = err;
      return ctx.app.emit('error', goodsFormatError, ctx);
    }
    await next();
  }
}

module.exports = {
  validator
};