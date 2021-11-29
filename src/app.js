const Koa = require('koa');
const app = new Koa();

const {APP_PORT} = require('./config/config.default.js');

// 中间件
app.use((ctx, next) => {
  ctx.body = 'Hello API nodemon';
});
app.listen(APP_PORT, ()=>{
  console.log(`服务器启动，监听${APP_PORT}...`)
})