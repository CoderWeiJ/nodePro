const User = require('../model/user.model.js')
class UserService {
  async createUser(user_name, password) {
    // 添加user表的记录
    const res = await User.create({
      user_name,
      password
    });
    return res;
  }

  // 查询用户信息
  async getUserInfo({
    id,
    user_name,
    password,
    is_admin
  }) {
    const whereObj = {};
    // 查询条件
    id && Object.assign(whereObj, {
      id
    });
    user_name && Object.assign(whereObj, {
      user_name
    });
    password && Object.assign(whereObj, {
      password
    });
    is_admin && Object.assign(whereObj, {
      is_admin
    });

    // 查询
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'], // 查询字段名
      where: whereObj, // 查询条件
    });
    return res ? res.dataValues : null;
  }

  // 更新用户信息
  async updateById({
    id,
    user_name,
    password,
    is_admin
  }) {
    const whereOpt = {
      id
    };
    const newUser = {};
    // 更改选项
    user_name && Object.assign(newUser, {
      user_name
    });
    password && Object.assign(newUser, {
      password
    })
    is_admin && Object.assign(newUser, {
      is_admin
    });
    // 更新
    const res = await User.update(newUser, {
      where: whereOpt
    });
    console.log("更新结果：", res);
  }
}

module.exports = new UserService();