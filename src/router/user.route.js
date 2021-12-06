const Router = require('koa-router');
const { register, login } = require('../controller/user.controller.js');
const { userValidator, verifyUser, bcryptPassword, verifyLogin } = require('../middleware/user.middleware.js'); // 导入中间件
const userRouter = new Router({
  prefix: '/users'
});
// 注册接口，经过中间件验证后，才会执行register
userRouter.post('/register', userValidator, verifyUser, bcryptPassword, register);
// 登录接口
userRouter.post('/login', verifyLogin, login);

module.exports = userRouter;