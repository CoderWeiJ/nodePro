const Koa = require('koa');
const Router = require('koa-router');
const {
  APP_PORT
} = require('./config/config.default.js');

const app = new Koa();
const router = new Router();

// 路由匹配
router.get('/', (ctx, next) => {
  ctx.body = '首页';
});

router.get('/hello', (ctx, next) => {
  ctx.body = 'hello页面';
})


// 中间件
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
})