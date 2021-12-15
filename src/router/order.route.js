// 订单路由

const Router = require('koa-router');
const router = new Router({
  prefix: '/orders'
});

// 控制器
const {
  create
} = require('../controller/order.controller.js');
// 中间件
const {
  auth
} = require('../middleware/auth.middleware.js');
const {
  validator
} = require('../middleware/order.middleware.js');

router.post('/', auth, validator({
  address_id: 'int',
  goods_info: 'string',
  total: 'string'
}), create);

module.exports = router;