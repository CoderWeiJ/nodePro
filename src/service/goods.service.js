const Goods = require('../model/goods.model.js');
class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }

  // 更新商品数据
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } });
    console.log(res, "ressssssss");
    return res[0] > 0 ? true : false;
  }

  // 删除商品
  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } });
    return res > 0 ? true : false;
  }
}
module.exports = new GoodsService();