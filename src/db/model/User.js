/**
 * @description 用户数据模型
 * @author yuanke
 */

const seq = require('../seq')
const { STRING, BOOLEAN } = require('../types')

const User = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  isVip: {
    type: BOOLEAN,
    allowNull: true,
    defaultValue: false,
    comment: '是否是 vip'
  },
  avatar: {
    type: STRING,
    allowNull: true,
    defaultValue: 'https://v2.cn.vuejs.org/images/logo.svg',
    comment: '头像'
  },
  nickName: {
    type: STRING,
    allowNull: true,
    defaultValue: '不知名用户',
    comment: '昵称'
  },
  description: {
    type: STRING,
    allowNull: true,
    defaultValue: '还没有介绍自己呢~',
    comment: '个人描述'
  }
})

module.exports = User