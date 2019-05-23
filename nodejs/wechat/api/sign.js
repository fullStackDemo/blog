/**
 * 获取签名
 * @returns:
 * 1. appId 必填，公众号的唯一标识
 * 2. timestamp 必填，生成签名的时间戳
 * 3. nonceStr 必填，生成签名的随机串
 * 4. signature 必填，签名
 */
const crypto = require('crypto');
const config = require('../config/index.json');

// sha1加密
function sha1(str) {
  let shasum = crypto.createHash("sha1")
  shasum.update(str)
  str = shasum.digest("hex")
  return str
}

/**
 * 生成签名的时间戳
 * @return {字符串}
 */
function createTimestamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}

/**
 * 生成签名的随机串
 * @return {字符串}
 */
function createNonceStr() {
  return Math.random().toString(36).substr(2, 15)
}

/**
 * 对参数对象进行字典排序
 * @param  {对象} args 签名所需参数对象
 * @return {字符串}    排序后生成字符串
 */
function raw(args) {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key]
  })

  var string = ''
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}


module.exports = getSign = (params, res) => {

  /**
   * 签名算法
   * 签名生成规则如下：
   * 参与签名的字段包括noncestr（ 随机字符串）,
   * 有效的jsapi_ticket, timestamp（ 时间戳）,
   * url（ 当前网页的URL， 不包含# 及其后面部分）。
   * 对所有待签名参数按照字段名的ASCII 码从小到大排序（ 字典序） 后，
   *  使用URL键值对的格式（ 即key1 = value1 & key2 = value2…） 拼接成字符串string1。
   * 这里需要注意的是所有参数名均为小写字符。 对string1作sha1加密， 字段名和字段值都采用原始值， 不进行URL 转义。
   */
  var ret = {
    jsapi_ticket: params.ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: params.url
  };
  console.log(params, ret);
  var string = raw(ret)
  ret.signature = sha1(string)
  ret.appId = config.appid;
  console.log('ret', ret)
  res.send(ret);
}
