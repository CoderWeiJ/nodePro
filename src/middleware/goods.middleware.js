// 商品模块中间件

const {
  goodsFormatError
} = require('../constant/err.type.js');
// 商品参数校验
async function validator(ctx, next) {
  try {
    ctx.verifyParams({
      goods_name: {
        type: 'string',
        required: true
      },
      goods_price: {
        type: 'number',
        required: true
      },
      goods_num: {
        type: 'number',
        required: true
      },
      goods_img: {
        type: 'string',
        required: true
      },
    });
  } catch (err) {
    console.error('商品参数错误: ', err);
    goodsFormatError.result = err;
    return ctx.app.emit('error', goodsFormatError, ctx);
  }
  await next();
}

module.exports = {
  validator
};