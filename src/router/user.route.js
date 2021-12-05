const Router = require('koa-router');
const { register, login } = require('../controller/user.controller.js');
const { userValidator, verfiyUser } = require('../middleware/user.middleware.js'); // 导入中间件
const userRouter = new Router({
  prefix: '/users'
});
// 注册接口，经过中间件验证后，才会执行register
userRouter.post('/register', userValidator, verfiyUser, register);
// 登录接口
userRouter.get('/login', login);

module.exports = userRouter;