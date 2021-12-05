const { getUserInfo } = require('../service/user.service.js');
const { userFormatError, userAlreadyExisted, userRegisterError } = require('../constant/err.type.js'); // 异常类型
const bcrypt = require('bcryptjs');

// 验证用户名或密码是否为空
async function userValidator(ctx, next) {
    // 1. 提取数据
    const { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    // 返回信息
    if (!user_name || !password) { // 用户名或密码为空的情况
        console.error('用户名或密码为空', ctx.request.body);
        ctx.app.emit('error', userFormatError, ctx); // 将错误信息统一处理，触发名(error)，返回对象(userFormatError)，上下文(ctx)
        return;
    }
    await next();

}
// 验证用户名是否存在
async function verfiyUser(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
        if (await getUserInfo({ user_name })) { // 数据库查询，用户名已被注册
            ctx.app.emit('error', userAlreadyExisted, ctx);
            return;
        }
    } catch (err) {
        console.error('获取用户信息失败!', err);
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    await next();
}

// 密码加密
async function bcryptPassword(ctx, next) {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10); // 加密
    // hash为密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;
    await next();
}


module.exports = { userValidator, verfiyUser, bcryptPassword }