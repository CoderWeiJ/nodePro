module.exports = {
  // 用户错误
  userFormatError: {
    code: '10001',
    message: '用户名或密码为空',
    result: ''
  },
  userAlreadyExisted: {
    code: '10002',
    message: '用户名已存在',
    result: ''
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册错误！',
    result: ''
  },
  userNotExist: {
    code: '10004',
    message: '用户不存在!',
    result: ''
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败！',
    result: ''
  },
  invaildPassword: {
    code: '10006',
    message: '密码错误',
    result: ''
  },
  // 授权(token)错误
  TokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    result: ''
  },
  invaildToken: {
    code: '10102',
    message: '无效的token',
    result: ''
  }
}