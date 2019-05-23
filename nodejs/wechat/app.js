const express = require('express');
const api = require('./api');
const path = require('path');
const app = express();

// 静态资源
app.use(express.static(path.join(__dirname, "public")));

//动态读取数据
const port = process.env.npm_package_config_port;

console.log("run app.js at ", process.env.npm_package_config_port)

app.get('/', (req, res) => {
  api.auth(req, res);
});

// accessToken 获取token
app.get('/getAccessToken', (req, res) => {
  api.accessToken(res);
});

// 获取 jsapi_ticket 临时票据
app.get('/getTicket', (req, res) => {
  const p = new Promise((resolve) => {
    api.accessToken(res, resolve)
  });
  // 获取token
  p.then(result => {
    const accessToken = JSON.parse(result).access_token;
    // console.log('r1', accessToken);
    // 判断是否存在缓存
    api.jsapiTicket(accessToken, res);
  });
})

// 测试
app.get('/test', (req, res) => {
  res.json({
    code: 0
  });
});


// listen
app.listen(port, () => {
  console.log(`Server started on localhost:%d`, port);
});
