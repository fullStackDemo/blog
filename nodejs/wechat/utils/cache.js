// node-cache 保存和获取缓存

const NodeCache = require("node-cache");
const myCache = new NodeCache({
  stdTTL: 7200,
  checkperiod: 120
});


// 设置缓存
var setCache = function (key, value) {
  // 设置缓存
  myCache.set(key, value, function (err, success) {
    if (!err && success) {
      console.log(key + "保存成功", value);
    }
  });
};

// 获取缓存
var getCache = function (key, callback) {
  // 读取缓存
  myCache.get(key, function (err, value) {
    if (!err) {
      if (value) {
        console.log(`存在于缓存中${key}=${value}`);
        callback(value);
      } else {
        console.log(`${key} not found in node-cache`);
        callback();
      }
    } else {
      console.log('get ' + key + ' cache occurs error =', err);
    }
  });
};



module.exports = {
  setCache,
  getCache
}
