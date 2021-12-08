const Router = require('koa-router');
const {
  register,
  login,
  changePassword
} = require('../controller/user.controller.js');
const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
} = require('../middleware/user.middleware.js'); // 导入中间件
const {
  auth
} = require('../middleware/auth.middleware.js');
const userRouter = new Router({
  prefix: '/users'
});
// 注册接口，经过中间件验证后，才会执行register
userRouter.post('/register', userValidator, verifyUser, bcryptPassword, register);
// 登录接口
userRouter.post('/login', userValidator, verifyLogin, login);
// 修改密码接口
userRouter.patch('/', auth, bcryptPassword, changePassword);

module.exports = userRouter;