const Router = require('koa-router');
const router = new Router({
  prefix: '/address'
});

// 控制器
const {
  create,findAll,update,remove,setDefault
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

// 更新地址
router.put('/:id', auth, validator({
  consignee: {
    type: 'string',
    required: false,
  },
  phone: {
    type: 'string',
    format: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    required: false
  },
  address: {
    type: 'string',
    required: false
  }
}), update)

// 删除地址
router.delete('/:id', auth, remove);

// 修改默认地址
router.patch('/:id', auth, setDefault)
module.exports = router;