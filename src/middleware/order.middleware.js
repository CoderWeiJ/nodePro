const {
  orderFormatError
} = require('../constant/err.type.js');

function validator(rules) {
  return async function (ctx, next) {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error('订单参数格式错误: ', err);
      orderFormatError.result = err;
      return ctx.app.emit('error', orderFormatError, ctx);
    }
    await next();
  }
}

module.exports = {
  validator
}