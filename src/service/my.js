const { User } = require("../db/model")

const updateUserInfo = async ({ newAvatar }, { username }) => {
  // 要更新的内容
  const updateData = {}
  if (newAvatar) {
    updateData.avatar = newAvatar
  }
  // 查询条件
  const whereData = {
    username
  }
  // 第一个参数 { avatar: 新的 avatar }, 第二个参数 { username: 用户的 username }
  const result = await User.update(updateData, {
    where: whereData
  })
  console.log(result)
  return result[0] > 0
}

module.exports = {
  updateUserInfo
}