const { Op } = require('sequelize');


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


        return {
            id: 1,
            user_id: 12,
            goods_id: 1,
            number: 4,
            selected: true,
        }
    }

    // 获取购物车列表数据 分页查询
    async findCarts(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize;
        const { count, rows } = await Cart.findAndCountAll({
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
            total: count,
            list: rows
        }
    }
}

module.exports = new CartService();