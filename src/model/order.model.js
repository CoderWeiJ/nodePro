const {
  DataTypes
} = require('sequelize');
const sequelize = require('../db/sequelize');

const Order = sequelize.define('zd_orders', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '地址id'
  },
  goods_info: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '商品信息'
  },
  total: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
    comment: '订单总金额'
  },
  order_number: {
    type: DataTypes.CHAR(16),
    allowNull: false,
    comment: '订单编号'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '订单状态',
    defaultValue: 0,

  }
})

Order.sync();
module.exports = Order;