const Router = require('koa-router');

const {
  validator
} = require('../middleware/goods.middleware.js');

// 身份验证
const {
  auth,
  hadAdminPermission,
} = require('../middleware/auth.middleware.js');

const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll
} = require('../controller/goods.controller.js');
const router = new Router({
  prefix: '/goods'
});

// 图片上传接口
router.post('/upload', auth, hadAdminPermission, upload);
// 发布商品接口
router.post('/', auth, hadAdminPermission, validator({
  goods_name: {
    type: 'string',
    required: true
  },
  goods_price: {
    type: 'number',
    required: true
  },
  goods_num: {
    type: 'number',
    required: true
  },
  goods_img: {
    type: 'string',
    required: true
  },
}), create);
// 商品信息修改
router.put('/update/:id', auth, hadAdminPermission, 
validator({
  goods_name: {
    type: 'string',
    required: false
  },
  goods_price: {
    type: 'number',
    required: false
  },
  goods_num: {
    type: 'number',
    required: false
  },
  goods_img: {
    type: 'string',
    required: false
  },
}), update)

// 商品删除
// router.delete('/delete/:id', auth, hadAdminPermission, remove);

// 商品下架
router.post('/:id/off', auth, hadAdminPermission, remove);
// 商品上架
router.post('/:id/on', auth, hadAdminPermission, restore);

// 获取商品列表
router.get('/', auth, hadAdminPermission, findAll);

module.exports = router;