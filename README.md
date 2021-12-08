# 一、项目的初始化
## 1. npm初始化
```shell
npm init -y
```

生成`package.json`文件：
- 记录项目的依赖

## 2. git初始化
> git init

生成`.git`隐藏文件夹，git的本地仓库

## 3. 创建README.md文件
# 二、搭建项目
## 1. 安装koa框架
```shell
npm install koa
```

## 2. 创建应用
```js
// src/app.js
const Koa = require('koa');

const app = new Koa();

// 中间件
app.use((ctx, next) => {
  ctx.body = 'Hello API';
});
app.listen(3000, ()=>{
  console.log('服务器启动，监听3000...')
})
```

## 3. 启动应用
```shell
node ./src/app.js
```

# 三、项目的基本优化
## 1. 自动重启服务
安装nodemon
```shell
npm install nodemon
```
编写`package.json`脚本
```json
"scripts": {
  "dev": "nodemon ./src/app.js"
},
```
## 2. 读取配置文件
安装`dotenv`,读取根目录中的`.env`文件，将配置写在`process.env`中
```shell
npm i dotenv
```
创建`.env`
> APP_PORT = 8000

创建`src/config/config.default.js`
```js
const dotenv = require('dotenv');
// 读取.env内容
dotenv.config();
module.exports = process.env;
```
`app.js`文件使用配置项
```js
const {APP_PORT} = require('./config/config.default.js');
```

# 四、添加路由
> 根据不同的URL，调用对应处理函数

## 1. 安装`koa-router`
```shell
npm i koa-router
```
步骤：
1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件
```js
const Koa = require('koa');
const Router = require('koa-router');
const {
  APP_PORT
} = require('./config/config.default.js');
// 实例化对象
const app = new Koa();
const router = new Router();

// 路由匹配
// GET请求
router.get('/', (ctx, next) => {
  ctx.body = '首页';
});
router.get('/hello', (ctx, next) => {
  ctx.body = 'hello页面';
});

// 中间件
app
  .use(router.routes())
  .use(router.allowedMethods());
  
app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
})
```
# 五、目录结构优化
## 1. 将http服务和app业务拆分
创建`src/app/index.js`
```js
const Koa = require('koa');
const userRouter = require('../router/user.route.js');

const app = new Koa();

// 中间件
app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

module.exports = app;
```
改写`app.js`
```js
const app = require('./app/index.js');
const {
  APP_PORT
} = require('./config/config.default.js');

app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
});
```
## 2. 将路由和控制器拆分
路由：解析URL，分发给控制器对应的方法
控制器：处理不同的业务

改写`user.route.js`
```js
const Router = require('koa-router');
const {
  register, login
} = require('../controller/user.controller.js');

const userRouter = new Router({
  prefix: '/users'
});
// 注册接口
userRouter.post('/register', register);
// 登录接口
userRouter.get('/login', login);

module.exports = userRouter;
```
创建`src/controller/user.controller.js`
```js
class UserController {
  async register(ctx, next) {
    ctx.body = "注册接口";
  }

  async login(ctx, next) {
    ctx.body = '登录接口';
  }
}
module.exports = new UserController();
```

# 六、解析body
## 1. 安装`koa-body`
## 2. 注册中间件
改写`app/index.js`

![image-20211204155808770](https://tuchuang-1257620510.cos.ap-guangzhou.myqcloud.com/202112041558816.png)

## 3. 解析请求
改写`controller/user.controller.js`
```js
const { createUser } = require('../service/user.service.js');
class UserController {
  async register(ctx, next) {
    // 1. 提取数据
    let { user_name, password } = ctx.request.body;
    // 2. 操作数据库
    await createUser(user_name, password);
    // 3. 返回结果
    ctx.body = ctx.request.body;
  }

  async login(ctx, next) {
    ctx.body = '登录接口';
  }
}

module.exports = new UserController();
```

## 4. 拆分service层
service层主要做一个数据库处理
创建`service/user.service.js`
```js
class UserService {
    async createUser(user_name, password) {
        todo: 写入数据库
    }
}

module.exports = new UserService();
```

# 七、操作数据库
`sequelize` `ORM数据库工具`
ORM: 对象关系映射
  - 数据表映射(对应)一个类
  - 数据表中的数据行(记录)对应一个对象
  - 数据表字段对应对象的属性
  - 数据表的操作对应数据表的方法
## 1. 安装`sequelize`
```shell
npm i --save sequelize mysql2
```
## 2. 创建数据库连接对象
创建`db/sequelize.js`
```js
const { Sequelize } = require('sequelize');
const {
    MYSQL_DB,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
} = require('../config/config.default.js');
// 分别传递参数 (其它数据库)
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});
module.exports = sequelize;
// 测试数据库连接
// sequelize.authenticate().then(res => {
//     console.log('数据表连接成功！');
// }).catch(err => {
//     console.log("数据表连接失败：", err);
// })
```


# 八、创建User模型
## 1. 拆分model层
sequelize主要通过`model`对应数据表
创建`src/model/user.model.js`
```js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize.js');

const User = sequelize.define('zd_user', {
    // 在这里定义模型属性
    user_name: {
        // id不用自己创建，sequelize会自动创建并管理
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名，唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        // allowNull 默认为 true
        comment: '密码',
    },
    is_admin: {
        type: DataTypes.BOOLEAN, // 相当于 TINYINT(1)
        allowNull: false,
        defaultValue: 0,
        comment: '0 普通用户; 1 管理员'
    }
}, {
    // 这是其他模型参数
    // tableName: 'zd_user', // 直接给出表名
    freezeTableName: true, // 表明推断，将模型名称强制推断为表名：zd_user -> zd_user；不加就是zd_user -> zd_users  
});
User.sync({ force: true }) // 强制同步数据库(将创建表,如果表已经存在,则将其首先删除)
module.exports = User;
// `sequelize.define` 会返回模型
// console.log(User === sequelize.models.User); // true
```




# 九、添加用户入库
## 1. 修改service层
实现`service/user.service.js`具体功能
```js
const User = require('../model/user.model.js')
class UserService {
    async createUser(user_name, password) {
        // 添加user表的记录
        const res = await User.create({
            user_name,
            password
        });
        return res;
    }

    async getUserInfo({ id, user_name, password, is_admin }) {
        const whereObj = {};
        // 查询条件
        id && Object.assign(whereObj, { id });
        user_name && Object.assign(whereObj, { user_name });
        password && Object.assign(whereObj, { password });
        is_admin && Object.assign(whereObj, { is_admin });

        // 查询
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'], // 查询字段名
            where: whereObj, // 查询条件
        });
        console.log("select结果：", res);
        return res ? res.dataValues : null;
    }
}

module.exports = new UserService();
```

## 2. 修改model层
修改``model/user.model.js``的register方法
```js
  async register(ctx, next) {
    // 1. 提取数据
    let { user_name, password } = ctx.request.body;
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
    } else if (await getUserInfo({ user_name })) { // 数据库查询，用户名已被注册
      console.log('打印这里：', getUserInfo({ user_name }));
      ctx.status = 409; // 资源冲突
      ctx.body = {
        code: '10002',
        message: '用户名已存在',
        result: ''
      }
      return;
    } else {
      let res = await createUser(user_name, password);
      ctx.body = {
        code: '10000',
        message: '注册成功！',
        result: res
      }
    }
  }
```


# 十，错误处理
写在九里面了

# 十一、拆分中间件

# 十二、密码加密
## 1. 下载`bcryptjs`
```shell
npm i bcryptjs
```
## 2. 注册中间件
修改`middleware/user.middleware.js`
```js
async function bcryptPassword(ctx, next) {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10); // 加密
    // hash为密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash;
    await next();
}
```

# 十三、登录验证
## 1. 添加中间件
```js
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
```


# 十四、颁发token
登录成功后，给用户颁发一个令牌`token`，用户在以后的每一次请求中携带这个令牌。
jwt: jsonwebtoken
- header: 头部
- playload: 载荷
- signature: 签名
## 1. 安装`jsonwebtoken`
```shell
npm i jsonwebtoken
```

# 十五、用户认证
## 1. token验证
新增``middleware/auth.middleware.js``

```js
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = require('../config/config.default.js');
const {
  TokenExpiredError,
  invaildToken
} = require('../constant/err.type.js');
// token验证
async function auth(ctx, next) {
  const {
    authorization
  } = ctx.request.header;
  const token = authorization.replace('Bearer ', ''); // 获取token
  console.log('解析出的token: ', token);
  try {
    //user中包含了payload的信息(id, user_name, is_admin)
    const user = jwt.verify(token, JWT_SECRET);
    console.log("user: ", user);
    ctx.state.user = user;
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err);
        return ctx.app.emit('error', TokenExpiredError, ctx);

      case 'JsonWebTokenError':
        console.error('无效的token', err);
        return ctx.app.emit('error', invaildToken, ctx);
    }
  }
  await next();
}

module.exports = {
  auth
};
```
# 十六、修改密码
## 1. 添加路由
``router/user.route.js``
```js
userRouter.patch('/', auth, bcryptPassword, changePassword);
```

