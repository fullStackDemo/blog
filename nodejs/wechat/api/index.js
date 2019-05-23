// 第一步 服务器认证为开发者
const auth = require('./auth');

// 第二步 获取微信用户令牌 access_token
const accessToken = require('./accessToken');

// 生成签名之前必须先通过access_token来获取jsapi_ticket，
// jsapi_ticket是公众号用于调用微信JS接口的临时票据
const jsapiTicket = require('./jsapiTicket');

// 获取签名
const getSign = require('./sign');



module.exports = {
  auth: auth,
  accessToken,
  jsapiTicket,
  getSign
}
