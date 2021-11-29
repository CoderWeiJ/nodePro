const app = require('./app/index.js');
const {
  APP_PORT
} = require('./config/config.default.js');

app.listen(APP_PORT, () => {
  console.log(`服务器启动，监听${APP_PORT}...`)
});