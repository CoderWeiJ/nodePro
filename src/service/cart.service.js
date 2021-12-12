const { Op } = require('sequelize');


const Cart = require('../model/cart.model.js');

class CartService {
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
}

module.exports = new CartService();