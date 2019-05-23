
// 获取 access_token
const config = require('../config'); // 配置数据
const axios = require('axios');// 请求api
const CircularJSON = require('circular-json');

module.exports = getAccessToken = (req, res) => {
  const fetchUrl = `${config.getAccessToken}?grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
  console.log(fetchUrl, config);

  axios.get(fetchUrl).then(response => {
    let json = CircularJSON.stringify(response.data);
    res.send(json);
  }).catch(err => {
    console.log(err)
  })
};