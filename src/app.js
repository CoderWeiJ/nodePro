const Koa = require('koa');

const app = new Koa();

// 中间件
app.use((ctx, next) => {
  ctx.body = 'Hello API';
});
app.listen(3000, ()=>{
  console.log('服务器启动，监听3000...')
})