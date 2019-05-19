// https://news.ycombinator.com/newest
//抓取新闻并存储数据库

const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const { insertData, queryData } = require('./db');
const app = express();
const { config: { port: customPort } } = require('./package.json');

const port = customPort || 80;

// console.log(process.env.npm_package_config_port)

app.get('/scrap', (req, res) => {
  const url = "https://news.ycombinator.com/newest";
  //request call
  request(url, function (error, reponse, html) {
    if (!error) {
      const $ = cheerio.load(html);
      const data = [];
      const items = $('.itemlist').find('.athing');
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const node = $(element).find('.title a');
        const title = node.text();
        const url = node.attr('href');
        const obj = {
          title: title,
          url: url
        };
        data.push(obj);
      }
      res.send(data);
      // 同步数据库
      insertData(data);
    }
  })
});

app.get('/query/news', (req, res) => {
  console.log(req.query);
  const { type } = req.query;
  const p1 = new Promise((resolve, reject) => {
    queryData(resolve, type);
  });
  p1.then(result => {
    res.send(result);
  });
});

app.get('/test', (req, res) => {
  res.json({
    code: 0,
    data: "test"
  });
});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
