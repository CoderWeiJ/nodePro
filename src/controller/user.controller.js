const { createUser } = require('../service/user.service.js');
class UserController {
  async register(ctx, next) {
    // 1. 提取数据
    let { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    await createUser(user_name, password);
    // 3. 返回结果
    ctx.body = ctx.request.body;
  }

  async login(ctx, next) {
    ctx.body = '登录接口';
  }
}

module.exports = new UserController();