// 购物车路由

const Router = require('koa-router');

// 中间件
const { auth } = require('../middleware/auth.middleware.js');
const { validator, verifyParams } = require('../middleware/cart.middleware.js')
// 控制器
const { add, findAll, update } = require('../controller/cart.controller.js');
const { verify } = require('jsonwebtoken');
const { route } = require('./user.route.js');
const router = new Router({ prefix: '/carts' });

// 编写路由规则

// 添加到购物车接口: 登录校验 格式校验 用户id和商品id是否存在
router.post('/', auth, validator({ goods_id: 'number' }), verifyParams, add);

// 获取购物车列表数据
router.get('/cartList', auth, findAll);

// 更新购物车
router.patch('/:id', auth, validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false }
}), update);

module.exports = router;