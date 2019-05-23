// 通过 access_token 获取 jsapi_ticket 临时票据
const axios = require('axios'); // 请求api
const CircularJSON = require('circular-json');
const config = require('../config/index.json');
const cache = require('../utils/cache');


module.exports = get_jsapi_ticket = (access_token, res) => {

  const fetchUrl = config.getJsapiTicket + access_token;
  console.log('>>>>', fetchUrl)
  // 判断是否存在于缓存中
  const cacheName = "jsapi_ticket";
  cache.getCache(cacheName, function (cacheValue) {
    if (cacheValue) {
      const result = CircularJSON.stringify({
        ticket: cacheValue,
        from: 'cache'
      });
      res.send(result);
    } else {
      // 调取微信api
      axios.get(fetchUrl).then(response => {
        let json = CircularJSON.stringify(response.data);
        // promise
        res.send(json);
        // 设置缓存
        if (response.data.ticket) {
          cache.setCache(cacheName, response.data.ticket)
        }
      }).catch(err => {
        // console.log('axios occurs ', err);
      });
    }
  });

}
