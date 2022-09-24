/**
 * @description 区分不同的环境
 * @author yuanke
 */

 module.exports = {
  isDev: process.env.NODE_ENV === 'dev',
  isNotDev: process.env.NODE_ENV !== 'dev',
  isPrd: process.env.NODE_ENV === 'production',
  isNotPrd: process.env.NODE_ENV !== 'production'
}