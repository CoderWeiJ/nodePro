const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = require('../config/config.default.js');
const {
  TokenExpiredError,
  invaildToken
} = require('../constant/err.type.js');

// token验证
async function auth(ctx, next) {
  const {
    authorization
  } = ctx.request.header;
  const token = authorization.replace('Bearer ', ''); // 获取token
  console.log('解析出的token: ', token);
  try {
    //user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET);
    console.log("user: ", user);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', TokenExpiredError, ctx);

      case 'JsonWebTokenError':
        console.error('无效的token', err);
        return ctx.app.emit('error', invaildToken, ctx);
    }
  }
  await next();
}

module.exports = {
  auth
};