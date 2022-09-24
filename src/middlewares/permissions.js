const { ErrorModel } = require("../model/resModel")

// 判断是否为 vip
const isVipCheck = async (req, res, next) => {
  if (!req.auth.isVip) {
    return res.status(403).json(new ErrorModel({
      errno: -1,
      message: '你不是 vip!',
      status: 403
    }))
  }
  return res.status(200)
}

module.exports = {
  isVipCheck
}