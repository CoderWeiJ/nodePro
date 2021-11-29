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