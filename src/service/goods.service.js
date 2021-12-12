const Goods = require('../model/goods.model.js');
class GoodsService {
  // 创建商品记录
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  // 查询某条商品记录
  async findGoodById(id) {
    // 这里不包含被软删除的数据
    const res = await Goods.findOne({ where: { id } });
    return res ? res.dataValues : null;
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

  // 商品上架
  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } });
    return res > 0 ? true : false;
  }

  // 获取商品列表
  async findGoods(pageNum, pageSize) {
    // // 1. 获取统计数量，这里不包含软删除的数据
    // const total = await Goods.count();
    // // 2. 获取所有数据
    // // 偏移量
    const offset = (pageNum - 1) * pageSize;
    // const rows = await Goods.findAll({ offset, limit: pageSize * 1, attributes: ['id', 'goods_name', 'goods_price', 'goods_num', 'goods_img'] });
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: ['id', 'goods_name', 'goods_price', 'goods_num', 'goods_img']
    })
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }
}
module.exports = new GoodsService();