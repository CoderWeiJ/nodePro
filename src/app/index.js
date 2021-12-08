const Koa = require('koa');
const router = require('../router/index.js'); // 封装路由
const KoaBody = require('koa-body'); // 消息中间件
const { errHandle } = require('./errHandle.js'); // 异常处理
const app = new Koa();

// 中间件
app
  .use(KoaBody())
  .use(router.routes())
  .use(router.allowedMethods());

// 统一的错误处理
app.on('error', errHandle);
module.exports = app;