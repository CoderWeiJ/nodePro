const { DataTypes } = require('sequelize');
// 导入数据库连接
const sequelize = require('../db/sequelize.js');

const Cart = sequelize.define('zd_carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '是否选中'
    }
}, {
    tableName: 'zd_carts'
});

// 没有则创建表，有则不执行
Cart.sync();

module.exports = Cart;