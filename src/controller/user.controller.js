const { createUser, getUserInfo } = require('../service/user.service.js');
class UserController {
  async register(ctx, next) {
    // 1. 提取数据
    let { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    // 返回信息
    if (!user_name || !password) { // 用户名或密码为空的情况
      console.error('用户名或密码为空', ctx.request.body);
      ctx.status = 400; // 返回400状态码
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
      }
      return; // 直接返回
    } else if (await getUserInfo({ user_name })) { // 数据库查询，用户名已被注册
      console.log('打印这里：', getUserInfo({ user_name }));
      ctx.status = 409; // 资源冲突
      ctx.body = {
        code: '10002',
        message: '用户名已存在',
        result: ''
      }
      return;
    } else {
      let res = await createUser(user_name, password);
      ctx.body = {
        code: '10000',
        message: '注册成功！',
        result: res
      }
    }
  }

  async login(ctx, next) {
    ctx.body = '登录接口';
  }
}

module.exports = new UserController();