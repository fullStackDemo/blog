const express = require('express');
const crypto = require('crypto');
const config = require('./config.json');
const axios = require('axios');

const app = express();

//动态读取数据
const port = process.env.npm_package_config_port;

console.log("run app.js at ", process.env.npm_package_config_port)

app.get('/', (req, res) => {
  //1.获取微信服务器Get请求的参数 signature、timestamp、nonce、echostr
  var signature = req.query.signature,//微信加密签名
    timestamp = req.query.timestamp,//时间戳
    nonce = req.query.nonce,//随机数
    echostr = req.query.echostr;//随机字符串

  //2.将token、timestamp、nonce三个参数进行字典序排序
  var array = [config.token, timestamp, nonce];
  array.sort();

  //3.将三个参数字符串拼接成一个字符串进行sha1加密
  var tempStr = array.join('');
  const hashCode = crypto.createHash('sha1'); //创建加密类型 
  var resultCode = hashCode.update(tempStr, 'utf8').digest('hex'); //对传入的字符串进行加密

  //4.开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
  if (resultCode === signature) {
    res.send(echostr);
  } else {
    res.send('mismatch');
  }
});

// accessToken 获取token
app.get('/getAccessToken', (req, res) => {
  const fetchUrl = `${config.getAccessToken}/grant_type=client_credential&appid=${config.appid}&secret=${config.appsecret}`;
  axios.get(fetchUrl).then(response => {
    res.json({
      code: 0,
      data: response
    });
  }).catch(err => {
    res.json({
      code: 0,
      data: null
    });
  })
});

app.get('/test', (req, res) => {
  res.json({
    code: 0
  });
});

app.listen(port, () => {
  console.log(`Server started on localhost:%d`, port);
});

