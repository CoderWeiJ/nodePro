const { getUserInfo } = require('../service/user.service.js');
// 验证用户名或密码是否为空
async function userValidator(ctx, next) {
    // 1. 提取数据
    const { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    // 返回信息
    if (!user_name || !password) { // 用户名或密码为空的情况
        console.error('用户名或密码为空', ctx.request.body);
        ctx.status = 400; // 返回400状态码
        ctx.body = {
            code: '10001',
            message: '用户名或密码为空',
            result: ''
        }
        return; // 直接返回
    }
    await next();

}
// 验证用户名是否存在
async function verfiyUser(ctx, next) {
    const { user_name } = ctx.request.body;
    if (await getUserInfo({ user_name })) { // 数据库查询，用户名已被注册
        console.log('打印这里：', getUserInfo({ user_name }));
        ctx.status = 409; // 资源冲突
        ctx.body = {
            code: '10002',
            message: '用户名已存在',
            result: ''
        }
        return;
    }
    await next();
}
module.exports = { userValidator, verfiyUser }