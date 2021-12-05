const { createUser } = require('../service/user.service.js');
const { userRegisterError } = require('../constant/err.type.js');

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    // 捕获异常
    try {
      let res = await createUser(user_name, password);
      ctx.body = {
        code: '0',
        message: '注册成功！',
        result: {
          id: res.id,
          user_name: res.user_name,
        }
      }
    } catch (err) {
      console.error('用户注册错误！', err);
      ctx.app.emit('error', userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    ctx.body = '登录接口';
  }
}

module.exports = new UserController();