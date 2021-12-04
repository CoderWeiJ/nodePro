const Koa = require('koa');
const userRouter = require('../router/user.route.js'); // 封装路由
const KoaBody = require('koa-body'); // 消息中间件
const app = new Koa();

// 中间件
app
  .use(KoaBody())
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

module.exports = app;