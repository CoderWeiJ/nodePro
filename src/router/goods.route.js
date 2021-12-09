const Router = require('koa-router');
const {
  auth,
  hadAdminPermission,
  verifyFileType
} = require('../middleware/auth.middleware.js');
const {
  upload
} = require('../controller/goods.controller.js');

const router = new Router({
  prefix: '/goods'
});

router.post('/upload', auth, hadAdminPermission, upload);

module.exports = router;