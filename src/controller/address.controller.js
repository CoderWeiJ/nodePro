const {createAddress} = require('../service/address.service.js')

class AddressController {
  // 添加地址
  async create(ctx, next) {
    const user_id = ctx.state.user.id;
    const {
      consignee,
      address,
      phone
    } = ctx.request.body;
    const res = await createAddress({
      user_id,
      consignee,
      phone,
      address
    });

    ctx.body = {
      code: '0',
      message: '地址添加成功',
      result: res
    }
  }
}

module.exports = new AddressController();