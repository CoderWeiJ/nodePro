const {
  createAddress,
  findAllAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress
} = require('../service/address.service.js')

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

  // 获取地址列表
  async findAll(ctx, next) {
    const user_id = ctx.state.user.id;
    console.log('user_id: ', user_id);
    const res = await findAllAddress(user_id);
    ctx.body = {
      code: '0',
      message: '地址添加成功',
      result: res
    }
  }
  // 更新地址
  async update(ctx, next) {
    const id = ctx.request.params.id;
    const res = await updateAddress(id, ctx.request.body);
    ctx.body = {
      code: '0',
      message: '更新地址成功',
      result: res
    }
  }

  // 删除地址
  async remove(ctx, next) {
    const id = ctx.request.params.id;
    const res = await removeAddress(id);
    ctx.body = {
      code: '',
      message: '删除地址成功',
      result: res
    }
  }

  // 修改默认地址
  async setDefault(ctx, next) {
    const id = ctx.request.params.id;
    const user_id = ctx.state.user.id;
    const res = await setDefaultAddress(id, user_id);
    ctx.body = {
      code: '',
      message: '默认地址修改成功',
      result: res
    }
  }
}

module.exports = new AddressController();