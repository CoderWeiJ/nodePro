const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize.js');

// User模型
const User = sequelize.define('zd_user', {
    // 在这里定义模型属性
    user_name: {
        // id不用自己创建，sequelize会自动创建并管理
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        // allowNull 默认为 true
        comment: '密码',
    },
    is_admin: {
        type: DataTypes.BOOLEAN, // 相当于 TINYINT(1)
        allowNull: false,
        defaultValue: 0,
        comment: '0 普通用户; 1 管理员'
    }
}, {
    // 这是其他模型参数
    // tableName: 'zd_user', // 直接给出表名
    freezeTableName: true, // 表明推断，将模型名称强制推断为表名：zd_user -> zd_user；不加就是zd_user -> zd_users  
});
// User.sync({ force: true }) // 强制同步数据库(将创建表,如果表已经存在,则将其首先删除)
module.exports = User;
// `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true