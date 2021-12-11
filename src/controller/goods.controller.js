const path = require('path');

const {
  createGoods,
  updateGoods,
  removeGoods
} = require('../service/goods.service.js');
const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invaildGoodsId
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

  async create(ctx, next) {
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

  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      if (res) {
        ctx.body = {
          code: '0',
          message: '商品信息修改成功',
          result: ''
        }
      } else {
        return ctx.app.emit('商品信息修改失败', invaildGoodsId, ctx);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async remove(ctx, next) {
    const res = await removeGoods(ctx.params.id);
    console.log(res);
    if (res > 0) {
      ctx.body = {
        code: '0',
        message: '商品删除成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', '删除失败！', ctx);
    }
  }
}
module.exports = new GoodsController();