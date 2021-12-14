const {
  DataTypes,
  DATE
} = require('sequelize');
const sequelize = require('../db/sequelize.js');

const Address = sequelize.define('zd_address', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人'
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '手机号码'
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货地址'
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否为默认收货地址'
  }
}, {
  tableName: 'zd_address'
});

Address.sync();

module.exports = Address;