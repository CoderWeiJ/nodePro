const {
  createUser,
  getUserInfo,
  updateById
} = require('../service/user.service.js');
const {
  userRegisterError,
  changePasswordError
} = require('../constant/err.type.js');
const {
  JWT_SECRET
} = require('../config/config.default.js');
const jwt = require('jsonwebtoken');
class UserController {
  async register(ctx, next) {
    const {
      user_name,
      password
    } = ctx.request.body;
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
    const {
      user_name
    } = ctx.request.body;
    // 1. 获取用户信息(在token的playload中，记录id, user_name, is_admin)
    try {
      // 除了password字段，其他字段赋值给res对象
      const {
        password,
        ...res
      } = await getUserInfo({
        user_name
      });
      ctx.body = {
        code: '0',
        message: '登录成功！',
        result: jwt.sign(res, JWT_SECRET, {
          expiresIn: '1d'
        }), // 1d：过期时间：1天; 10 => 10秒
      };
    } catch (err) {

    }
  }

  async changePassword(ctx, next) {
    // 1. 获取数据
    const { id, user_name } = ctx.state.user;
    const password = ctx.request.body.password; // 加密后的新密码
    // 2. 操作数据库
    const res = await updateById({
      id,
      password
    });
    // 3. 返回结果
    if (res) {
      ctx.body = {
        code: '0',
        message: '密码修改成功',
        result: {
          id,
          user_name
        }
      }
    } else {
      return ctx.app.emit('error', changePasswordError, ctx);
    }
  }
}

module.exports = new UserController();