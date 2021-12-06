const { getUserInfo } = require('../service/user.service.js');
const { userFormatError, userAlreadyExisted, userRegisterError, userNotExist, userLoginError, invaildPassword } = require('../constant/err.type.js'); // 异常类型
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
async function verifyUser(ctx, next) {
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

// 验证login
async function verifyLogin(ctx, next) {
    const { user_name, password } = ctx.request.body;
    try {
        console.log(user_name);
        const res = await getUserInfo({ user_name });

        console.log('匹配结果', res);
        // 1. 查询用户名是否存在数据库
        if (!res) {
            console.error('用户名不存在！', { user_name });
            ctx.app.emit('error', userNotExist, ctx);
            return;
        }
        // 2. 密码匹配
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('密码错误');
            ctx.app.emit('error', invaildPassword, ctx);
            return;
        }
        await next();
    } catch (err) {
        console.error('用户登录失败！', err);
        ctx.app.emit('error', userLoginError, ctx);
    }
}

module.exports = { userValidator, verifyUser, bcryptPassword, verifyLogin }