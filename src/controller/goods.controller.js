const path = require('path');

const {
  createGoods
} = require('../service/goods.service.js');
const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError
} = require('../constant/err.type.js');
class GoodsController {
  async upload(ctx, next) {
    // 上传的文件会保留在 ctx.request.files
    const {
      file
    } = ctx.request.files
    if (file) {
      const fileTypes = ['image/png', 'image/jpeg'];
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }
      // console.log('file类型：', file.type);
      ctx.body = {
        code: '0',
        message: '图片上传成功！',
        result: {
          goods_img: path.basename(file.path)
        }
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }

  async create(ctx) {
    // 直接调用service的createGoods
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: '0',
        message: '发布商品成功',
        result: res
      }
    } catch (err) {
      console.error(err);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }
  }
}
module.exports = new GoodsController();