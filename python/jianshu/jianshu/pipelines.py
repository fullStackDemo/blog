# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

from scrapy.exceptions import DropItem
import json
import pymongo


class JianshuPipeline(object):
    # 数据库集合名字
    collection_name = "blog_items"

    # 初始化
    def __init__(self, mongo_url, mongo_db):
        self.mongo_url = mongo_url
        self.mongo_db = mongo_db

    # 打开
    def open_spider(self, spider):
        print('****open*****')
        # 写入文件
        self.file = open('items.jl', 'w')
        # 新建数据库连接
        self.client = pymongo.MongoClient(self.mongo_url)
        self.db = self.client[self.mongo_db]
        print('数据库连接成功')

    # 关闭
    def close_spider(self, spider):
        print('****close*****')
        # 关闭文件写入
        self.file.close()
        # 关闭数据库连接
        self.client.close()
        print("数据库关闭")

    @classmethod
    def from_crawler(cls, crawler):
        print("数据库URL")
        print(crawler.settings.get('MONGO_URL'))
        return cls(
            mongo_url=crawler.settings.get('MONGO_URL'),
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

    def process_item(self, item, spider):
        print('-----**pipeline**-------')
        # 写入json文件
        line = json.dumps(dict(item)) + '\n'
        self.file.write(line)
        # 插入数据到数据库
        print("数据库开始写入")

        # 定义数据库集合
        collection = self.db[self.collection_name]

        # 数据去重，判断数据库是否已经存在
        existDocument = collection.find_one({"title": item["title"]})
        if existDocument is not None:
            print("数据库已存在该条数据")
        else:
            collection.insert_one(dict(item))
            print("插入数据成功")

        # 判断语句
        # if(item.get('tags')):
        #     item['tags']= []
        #     return item
        # else:
        #     raise DropItem("missing tags in item")


class DemoPipeline(object):

    def open_spider(self, spider):
        print("测试信息")


    def process_item(self, item, spider):
        return item