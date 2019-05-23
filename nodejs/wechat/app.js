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
  api.accessToken(req, res);
});

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

