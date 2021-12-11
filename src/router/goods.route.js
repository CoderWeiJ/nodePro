const Router = require('koa-router');

const {
  validator
} = require('../middleware/goods.middleware.js');
const {
  auth,
  hadAdminPermission,
  verifyFileType
} = require('../middleware/auth.middleware.js');
const {
  upload,
  create,
  update,
  remove
} = require('../controller/goods.controller.js');
const router = new Router({
  prefix: '/goods'
});

// 图片上传接口
router.post('/upload', auth, hadAdminPermission, upload);
// 发布商品接口
router.post('/', auth, hadAdminPermission, validator, create);
// 商品信息修改
router.put('/update/:id', auth, hadAdminPermission, validator, update)
router.delete('/delete/:id', auth, hadAdminPermission, remove);
module.exports = router;