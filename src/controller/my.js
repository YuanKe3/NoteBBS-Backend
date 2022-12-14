const { SuccessModel, ErrorModel } = require("../model/resModel")
const { updateUserInfo } = require('../service/My')
const fs = require('fs/promises')
const path = require("path")

// 更改头像
const changeAvatar = async ({ newAvatar }, { userInfo }) => {
  const username = userInfo.username
  const uploadsPath = path.join(__dirname, '../', '../', 'uploads')
  // 删除原先的头像
  const matchRes = userInfo.avatar.match(/.+(\/\/|\\\\|\/|\\)(.+\.(svg|png|jpe?g|bmp|wbmp))$/i)
  const oldAvatar = matchRes[2]
  try {
    const statRes = await fs.stat(`${uploadsPath}/${oldAvatar}`)
    if (statRes.isFile()) {
      await fs.rm(`${uploadsPath}/${oldAvatar}`)
    }
  } catch (err) {
    console.error(err)
  }
  const result = await updateUserInfo({ newAvatar }, { username })
  if (result) {
    return new SuccessModel({
      newAvatar
    })
  }
  return new ErrorModel({
    errno: -1,
    message: '更改头像失败'
  })
}

// 更改昵称
const changeNickName = async ({ newNickName }, { userInfo }) => {
  const username = userInfo.username
  const result = await updateUserInfo({ newNickName }, { username })
  if (result) {
    return new SuccessModel({
      newNickName
    })
  }
  return new ErrorModel({
    errno: -1,
    message: '更改昵称失败'
  })
}

// 更改描述
const changeDesc = async ({ newDesc }, { userInfo }) => {
  const username = userInfo.username
  const result = await updateUserInfo({ newDesc }, { username })
  if (result) {
    return new SuccessModel({
      newDesc
    })
  }
  return new ErrorModel({
    errno: -1,
    message: '更改描述失败'
  })
}

module.exports = {
  changeAvatar,
  changeNickName,
  changeDesc
}