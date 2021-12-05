const { Sequelize } = require('sequelize');
const {
    MYSQL_DB,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_HOST
} = require('../config/config.default.js');


// 方法 3: 分别传递参数 (其它数据库)
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