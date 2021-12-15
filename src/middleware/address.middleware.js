const {
  addressFormatError
} = require('../constant/err.type.js');


// 参数校验
function validator(rules) { // ctx, next
  return async function (ctx, next) {
    try {
      ctx.verifyParams(rules);
    } catch (err) {
      console.error('地址格式错误', err.errors);
      addressFormatError.result = err.errors[0];
      return ctx.app.emit('error', addressFormatError, ctx);
    }
    await next();
  }
}


module.exports = {
  validator,
}