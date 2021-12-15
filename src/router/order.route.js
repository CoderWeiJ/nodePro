// 订单路由

const Router = require('koa-router');
const router = new Router({
  prefix: '/orders'
});

// 控制器
const {
  create,
  findAll
} = require('../controller/order.controller.js');
// 中间件
const {
  auth
} = require('../middleware/auth.middleware.js');
const {
  validator
} = require('../middleware/order.middleware.js');

// 生成订单
router.post('/', auth, validator({
  address_id: 'int',
  goods_info: 'string',
  total: 'string'
}), create);

// 获取订单列表
router.get('/:id', auth, validator({
  pageNum: {
    type: 'int',
    required: false
  },
  pageSize: {
    type: 'int',
    required: false
  },
  status: {
    type: 'int',
    required: false
  }
}), findAll)
module.exports = router;