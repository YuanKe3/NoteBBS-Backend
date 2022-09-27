const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { changeAvatar, changeNickName, changeDesc } = require('../controller/My')
const { getUserInfo } = require('../service/User')

// 存放上传头像的位置与文件名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueSuffix = file.fieldname + '-' + Date.now()
    const filename = uniqueSuffix + ext
    cb(null, filename)
  }
})
const upload = multer({ storage })

router.post('/upload/image', upload.single('avatar'), async (req, res, next) => {
  const { filename, destination } = req.file
  const userInfo = await getUserInfo({ username: req.auth.username })
  const newAvatar = `http://${req.headers.host}/${destination}/${filename}`
  const result = await changeAvatar({ newAvatar }, { userInfo })
  res.json(result)
})

router.post('/edit/nickName', async (req, res, next) => {
  const { nickName } = req.body
  const userInfo = await getUserInfo({ username: req.auth.username })
  const result = await changeNickName({ newNickName: nickName }, { userInfo })
  res.json(result)
})

router.post('/edit/desc', async (req, res, next) => {
  const { description } = req.body
  const userInfo = await getUserInfo({ username: req.auth.username })
  const result = await changeDesc({ newDesc: description }, { userInfo })
  res.json(result)
})

module.exports = router