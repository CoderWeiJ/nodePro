const {
  Op
} = require('sequelize');
const sequelize = require('../db/sequelize.js');


const Cart = require('../model/cart.model.js');
const Goods = require('../model/goods.model.js');
class CartService {
  // 添加购物车
  async createOrUpdate(user_id, goods_id) {
    // 根据user_id, goods_id同时查找，有没有记录
    const res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id
        }
      }
    })
    if (res) {
      // 已经存在一条记录
      await res.increment('number'); // number自增1
      return await res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id
      });
    }
  }

  // 获取购物车列表数据 分页查询
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const {
      count,
      rows
    } = await Cart.findAndCountAll({
      attributes: ['id', 'number', 'selected'],
      offset,
      limit: pageSize * 1,
      include: {
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
        model: Goods,
        as: 'goods_info'
      }
    });
    return {
      pageNum,
      pageSize,
      total: rows.length,
      list: rows
    }
  }

  // 更新购物车
  async updateCarts(params) {
    const {
      id,
      number,
      selected
    } = params;
    // 根据id查找
    const res = await Cart.findOne({
      attributes: ['id', 'goods_id', 'user_id', 'number', 'selected'],
      where: {
        id
      }
    });
    console.log('res', res);
    if (!res) return;
    number != null ? (res.number = number) : '';
    selected != null ? (res.selected = selected) : '';
    return await res.save(); // 保存并返回数据
  }
  // 删除购物车
  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }
  // 全选
  async selectAllCarts(user_id) {
    return await Cart.update({
      selected: true
    }, {
      where: {
        user_id,
      }
    })
  }

  // 全不选
  async unSelectAllCarts(user_id) {
    return await Cart.update({
      selected: false
    }, {
      where: {
        user_id,
      }
    })
  }

  // 购物车商品数量
  async CountShop(user_id) {
    return await Cart.sum('number');
  }
}

module.exports = new CartService();