# -*- coding: utf-8 -*-
import scrapy


class BlogSpider(scrapy.Spider):
    name = 'blog'
    allowed_domains = ['jiangshu.com']
    start_urls = [
        'http://quotes.toscrape.com/page/1/'
    ]

    def parse(self, response):
        print("-----******-------")
        list_dom=response.css('div.col-md-8 div.quote')
        list_arr=[]
        for dom in list_dom:
            list_arr.append({
                "title": dom.css('span.text::text').get(),
                "author": dom.css('span small.author::text').get()
            })
        print(list_arr)
        print("-----******-------")