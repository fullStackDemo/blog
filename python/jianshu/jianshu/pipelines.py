# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

from scrapy.exceptions import DropItem
import json

class JianshuPipeline(object):
    def process_item(self, item, spider):
        print('-----**pipeline**-------')
        print(self, item, spider)
        if(item.get('tags')):
            item['tags']= []
            return item
        else:
            raise DropItem("missing tags in item")
        # print('-----****-------')
        # return item

    def open_spider(self, spider):
        print('****open*****')
        
    def close_spider(self, spider):
        print('****close*****')