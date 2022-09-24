const seq = require('./seq')
require('./model/User')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

// 执行同步
seq.sync({ alter: true }).then(() => {
  console.log('sync ok')
  process.exit()
})