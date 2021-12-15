const Address = require('../model/address.model.js');

class AddressService {
  // 添加地址
  async createAddress(params) {
    return await Address.create(params);
  }

  // 获取地址列表
  async findAllAddress(user_id) {
    return await Address.findAll({
      attributes: ['id', 'user_id', 'consignee', 'phone', 'address', 'is_default'],
      where: {
        user_id
      }
    });
  }

  // 更新地址
  async updateAddress(id, params) {
    return await Address.update(params, {
      where: {
        id
      }
    });
  }
  // 删除地址
  async removeAddress(id) {
    return await Address.destroy({
      where: {
        id
      }
    });
  }

  // 修改默认地址
  async setDefaultAddress(id, user_id) {
    await Address.update({
      is_default: false
    }, {
      where: {
        user_id
      }
    });
    return await Address.update({
      is_default: true
    }, {
      where: {
        id
      }
    });
  }
}

module.exports = new AddressService();