var express = require('express')
var router = express.Router()
const { register, login } = require('../controller/users')

// 登录
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const result = await login({ username, password })
  res.json(result)
})

// 注册
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body
  const result = await register({ username, password })
  res.json(result)
})

module.exports = router;
