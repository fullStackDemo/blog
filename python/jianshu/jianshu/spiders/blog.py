# -*- coding: utf-8 -*-
import scrapy


class BlogSpider(scrapy.Spider):
    name = 'blog'
    allowed_domains = ['toscrape.com']
    start_urls = [
        'http://quotes.toscrape.com'
    ]

    def parse(self, response):
        print("-----******-------")
        list_dom=response.css('div.col-md-8 div.quote')
        list_arr=[]
        for dom in list_dom:
            yield ({
                "title": dom.css('span.text::text').get(),
                "author": dom.css('span small.author::text').get(),
                "tags": dom.xpath('.//a[@class="tag"]/@href').getall()
            })

        # nextPage = response.css('ul.pager li.next a::attr("href")').get()
        # if nextPage is not None:
        #     nextPage = response.urljoin(nextPage)
        #     yield scrapy.Request(nextPage, callback=self.parse)

        # for nextPage in response.xpath('//li[@class="next"]/a/@href').getall():
        #     print(nextPage)
        #     yield response.follow(nextPage, callback=self.parse)
        print("-----******-------")
        # yield {
        #     "list": list_arr
        # }