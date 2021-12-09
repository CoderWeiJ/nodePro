const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = require('../config/config.default.js');
const {
  TokenExpiredError,
  invaildToken,
  hasNotAdminPermission
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

// 判断用户是否有管理员权限
async function hadAdminPermission(ctx, next) {
  const {
    is_admin
  } = ctx.state.user;

  if (!is_admin) {
    console.error('该用户没有管理员权限', ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }
  await next();
}

module.exports = {
  auth,
  hadAdminPermission
};