const Router = require('koa-router');
const router = new Router({
  prefix: '/address'
});

// 控制器
const {
  create,findAll
} = require('../controller/address.controller.js');
// 中间件
const {
  auth
} = require('../middleware/auth.middleware.js');
const {
  validator
} = require('../middleware/address.middleware.js')

// 路由编写

// 添加地址
router.post('/', auth, validator({
  consignee: 'string',
  phone: {
    type: 'string',
    format: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  },
  address: 'string',
}), create);

// 获取地址列表
router.get('/addressList', auth, findAll);

module.exports = router;