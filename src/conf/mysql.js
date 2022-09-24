const { isPrd } = require("../utils/env")

let MYSQL_CONF

MYSQL_CONF = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'note_system'
}

// TODO
if (isPrd) {
  MYSQL_CONF = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'note_system'
  }
}

module.exports = {
  MYSQL_CONF
}