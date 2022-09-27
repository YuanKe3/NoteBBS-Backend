const { TOKEN_KEY } = require('../conf/secretKeys')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getUserInfo, createUser } = require('../service/User')
// 用于生成 JWT 字符串
const jwt = require('jsonwebtoken')

const register = async ({ username, password }) => {
  const userInfo = await getUserInfo({ username })
  if (userInfo) {
    return new ErrorModel({
      errno: -1,
      message: '目标用户已经存在'
    })
  }
  try {
    await createUser({ username, password })
    return new SuccessModel()
  } catch {
    return new ErrorModel({
      errno: -1,
      message: '用户创建失败'
    })
  }
}

const login = async ({ username, password }) => {
  const userInfo = await getUserInfo({ username, password })
  if (!userInfo) {
    return new ErrorModel({
      errno: -1,
      message: '密码错误'
    })
  }
  const token = jwt.sign({ username, id: userInfo.id }, TOKEN_KEY, { expiresIn: '3000s' })
  return new SuccessModel({
    token,
    userInfo: {
      username: userInfo.username,
      isVip: userInfo.isVip,
      avatar: userInfo.avatar,
      nickName: userInfo.nickName,
      description: userInfo.description
    }
  })
}

module.exports = {
  register,
  login
}