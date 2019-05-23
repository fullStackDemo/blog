// 获取 access_token
const config = require('../config/index.json'); // 配置数据
const axios = require('axios'); // 请求api
const CircularJSON = require('circular-json');
// const NodeCache = require("node-cache");
// const myCache = new NodeCache({
//   stdTTL: 7200, //过期时间
//   checkperiod: 120, //检查周期
// });
// (设置 | 获取)缓存方法
const cache = require('../utils/cache');

module.exports = getAccessToken = (res, resolve) => {

  const fetchUrl = `${config.getAccessToken}?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
  // console.log(fetchUrl, config);

  // 获取缓存
  cache.getCache('access_token', function (cacheValue) {
    // 缓存存在
    if (cacheValue) {
      const result = CircularJSON.stringify({
        access_token: cacheValue,
        from: 'cache'
      });
      // promise
      if (resolve) {
        resolve(result);
      } else {
        res.send(result);
      }
    } else {
      // 调取微信api
      axios.get(fetchUrl).then(response => {
        let json = CircularJSON.stringify(response.data);
        // promise
        if (resolve) {
          resolve(json);
        } else {
          res.send(json);
        }

        // 设置缓存
        if (response.data.access_token) {
          cache.setCache('access_token', response.data.access_token)
        }
      }).catch(err => {
        console.log('axios occurs ', err);
      });
    }
  });



  // 先判断是否 access_token 存在于 缓存中
  // myCache.get('access_token', function (err, value) {
  //   if (!err) {
  //     if (value){
  //       console.log('存在于缓存中access_token=', value);
  //       res.send({
  //         access_token: value
  //       });
  //     } else{
  //       console.log('access_token not found in cache')
  //       axios.get(fetchUrl).then(response => {
  //         let json = CircularJSON.stringify(response.data);
  //         res.send(json);
  //         // 设置缓存
  //         myCache.set('access_token', response.data.access_token, function(err, success){
  //           if(!err && success){
  //             console.log("保存成功", response.data.access_token);
  //           }
  //         });
  //       }).catch(err => {
  //         console.log(err)
  //       });
  //     }
  //   } else {
  //     console.log('get access_token cache occurs error =', err);
  //   }
  // });

};
