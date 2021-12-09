const Goods = require('../model/goods.model.js');
class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
}
module.exports = new GoodsService();