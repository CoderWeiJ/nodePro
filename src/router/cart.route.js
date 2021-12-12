// 购物车路由

const Router = require('koa-router');

// 中间件
const { auth } = require('../middleware/auth.middleware.js');
const { vaildator, verifyParams } = require('../middleware/cart.middleware.js')
// 控制器
const { add } = require('../controller/cart.controller.js');
const { verify } = require('jsonwebtoken');
const router = new Router({ prefix: '/carts' });

// 编写路由规则

// 添加到购物车接口: 登录校验 格式校验 用户id和商品id是否存在
router.post('/', auth, vaildator, verifyParams, add);



module.exports = router;