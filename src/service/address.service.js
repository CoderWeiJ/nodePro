const Address = require('../model/address.model.js');

class AddressService {
  async createAddress(params) {
    return await Address.create(params);

  }
}

module.exports = new AddressService();