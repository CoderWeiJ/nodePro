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

    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereObj = {};
        // 查询条件
        id && Object.assign(whereObj, { id });
        user_name && Object.assign(whereObj, { user_name });
        password && Object.assign(whereObj, { password });
        is_admin && Object.assign(whereObj, { is_admin });

        // 查询
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'], // 查询字段名
            where: whereObj, // 查询条件
        });
        console.log("select结果：", res);
        return res ? res.dataValues : null;
    }
}

module.exports = new UserService();