const fs = require('fs');
const router = require('koa-router');

fs.readdirSync(__dirname).forEach(file => {
  // console.log(file);
  if(file !== 'index.js') {
    let r = require('./' + file);
    console.log(r);
    router.use(r.routes())
  }
});

module.exports = router;