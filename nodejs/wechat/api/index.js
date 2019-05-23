
// 第一步 服务器认证为开发者
const auth = require('./auth');

// 第二步 获取微信用户令牌 access_token
const accessToken = require('./accessToken');




module.exports = {
  auth: auth,
  accessToken: accessToken
}