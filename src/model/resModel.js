/**
 * 基础模块
 */
 class BaseModel {
  constructor({ errno, data, message, status }) {
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
    if (status) {
      this.status = status
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message, status }) {
    super({
      errno,
      message,
      status
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}
