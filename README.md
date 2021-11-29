# 一、项目的初始化
## 1. npm初始化
```shell
npm init -y
```

生成`package.json`文件：
- 记录项目的依赖

## 2. git初始化
> git init

生成`.git`隐藏文件夹，git的本地仓库

## 3. 创建README.md文件
# 二、搭建项目
## 1. 安装koa框架
```shell
npm install koa
```

## 2. 创建应用
```js
// src/app.js
const Koa = require('koa');

const app = new Koa();

// 中间件
app.use((ctx, next) => {
  ctx.body = 'Hello API';
});
app.listen(3000, ()=>{
  console.log('服务器启动，监听3000...')
})
```

## 3. 启动应用
```shell
node ./src/app.js
```

# 三、项目的基本优化
## 1. 自动重启服务
安装nodemon
```shell
npm install nodemon
```
编写`package.json`脚本
```json
"scripts": {
  "dev": "nodemon ./src/app.js"
},
```
## 2. 读取配置文件
安装`dotenv`,读取根目录中的`.env`文件，将配置写在`process.env`中
```shell
npm i dotenv
```
创建`.env`
> APP_PORT = 8000

创建`src/config/config.default.js`
```js
const dotenv = require('dotenv');
// 读取.env内容
dotenv.config();
module.exports = process.env;
```
`app.js`文件使用配置项
```js
const {APP_PORT} = require('./config/config.default.js');
```

# 四、添加路由
> 根据不同的URL，调用对应处理函数

## 1. 安装`koa-router`
```shell
npm i koa-router
```
步骤：
1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件
```js
const Koa = require('koa');
const Router = require('koa-router');
const {
  APP_PORT
} = require('./config/config.default.js');
// 实例化对象
const app = new Koa();
const router = new Router();

// 路由匹配
// GET请求
router.get('/', (ctx, next) => {
  ctx.body = '首页';
});
router.get('/hello', (ctx, next) => {
  ctx.body = 'hello页面';
});

// 中间件
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
})
```
# 五、目录结构优化
## 1. 将http服务和app业务拆分
创建`src/app/index.js`
```js
const Koa = require('koa');
const userRouter = require('../router/user.route.js');

const app = new Koa();

// 中间件
app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

module.exports = app;
```
改写`app.js`
```js
const app = require('./app/index.js');
const {
  APP_PORT
} = require('./config/config.default.js');

app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
});
```
## 2. 将路由和控制器拆分
路由：解析URL，分发给控制器对应的方法
控制器：处理不同的业务

改写`user.route.js`
```js
const Router = require('koa-router');
const {
  register, login
} = require('../controller/user.controller.js');

const userRouter = new Router({
  prefix: '/users'
});
// 注册接口
userRouter.post('/register', register);
// 登录接口
userRouter.get('/login', login);

module.exports = userRouter;
```
创建`src/controller/user.controller.js`
```js
class UserController {
  async register(ctx, next) {
    ctx.body = "注册接口";
  }

  async login(ctx, next) {
    ctx.body = '登录接口';
  }
}
module.exports = new UserController();
```