const Koa = require('koa');
const userRouter = require('../router/user.route.js');

const app = new Koa();

// 中间件
app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

module.exports = app;