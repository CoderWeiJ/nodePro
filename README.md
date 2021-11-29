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