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
