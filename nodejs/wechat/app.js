const express = require('express');
const api = require('./api');
const path = require('path');
const app = express();
//express请求别的路由中间件
require('run-middleware')(app);

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

  app.runMiddleware('/getAccessToken', function (code, body, headers) {
    const result = JSON.parse(body);
    console.log('User token:', result.access_token);
    api.jsapiTicket(result.access_token, res);
  })
});

//获取签名
app.get('/sign', (req, res) => {
  const params = {};
  console.log(req.query)
  params.url = req.query.url;
  /***
   * runMiddleware 请求别的 endPoint 获取 jsapi_ticket
   */
  app.runMiddleware('/getTicket', function (code, body, headers) {
    const result = JSON.parse(body);
    console.log('User ticket:', result.ticket);
    params.ticket = result.ticket;
    api.getSign(params, res);
  });

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
