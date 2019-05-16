// https://news.ycombinator.com/newest
//抓取新闻并存储数据库

const express = require('express');
const request = require('request');
const fs = require('fs');
const cherrio = require('cheerio');

const app = express();
const port = 8888;

app.get('/scrap', (req, res) => {
  const url = "https://news.ycombinator.com/newest";

  //request call
  request(url, function (error, reponse, html) {
    if (!error) {
      const $ = cherrio.load(html);
      const data = [];
      const items = $('.itemlist').find('.athing');
      console.log(items.length);
      for (let index = 0; index < items.length; index++) {
        const element = items[index];
        const node = $(element).find('.title a');
        const title = node.text();
        const url = node.attr('href');
        console.log(title, url);
        
        const obj = {
          title: title,
          url: url
        };
        data.push(obj);
      }

    }
  })

});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
