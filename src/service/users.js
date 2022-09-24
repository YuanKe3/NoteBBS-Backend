const { User } = require('../db/model/index')

const getUserInfo = async ({ username, password }) => {
  // 查询条件
  const whereOpt = {
    username
  }
  if (password) Object.assign(whereOpt, { password })
  // 查询
  const result = await User.findOne({
    where: whereOpt
  })
  return result.toJSON()
}

const createUser = async ({ username, password }) => {
  let result = await User.create({
    username,
    password
  })
  return result.toJSON()
}

module.exports = {
  getUserInfo,
  createUser
}