var express = require('express');
const { isVipCheck } = require('../middlewares/permissions');
var router = express.Router();

// 当 token 没过期时返回;若过期则返回 app.js 里的错误处理函数结果
router.get('/test', async (req, res, next) => {
  res.json({
    errno: 0,
    msg: req.auth
  })
})

router.get('/test2', isVipCheck, async (req, res, next) => {
  res.json({
    errno: 0,
    msg: '进去了'
  })
})

module.exports = router;
