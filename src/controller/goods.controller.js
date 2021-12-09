const path = require('path');

const {
  fileUploadError,
  unSupportedFileType
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
        ctx.body = unSupportedFileType;
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
      ctx.body = fileUploadError;
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }
}
module.exports = new GoodsController();