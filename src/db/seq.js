const { MYSQL_CONF } = require('../conf/mysql')
const { isPrd } = require('../utils/env')
const { Sequelize } = require('sequelize')

const { host, user, password, database } = MYSQL_CONF
const conf = {
  host,
  dialect: 'mysql'
}

if (isPrd) {
  // 线上环境，使用连接池
  conf.pool = {
    max: 5, // 连接池最大的连接数量
    min: 0,
    idle: 10000, // 如果一个连接池 10s 之内没有被使用则释放
  }
}

const seq = new Sequelize(database, user, password, conf)
module.exports = seq