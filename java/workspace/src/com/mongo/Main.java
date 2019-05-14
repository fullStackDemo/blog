package com.mongo;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class Main {
  public static void main(String[] args) {
    
    // 初始化 mongo url
    MongoClientURI uri = new MongoClientURI("mongodb+srv://test:test@cluster0-f5jim.mongodb.net/test?retryWrites=true");
    // 初始化 client
    MongoClient mongoClient = new MongoClient(uri);
    // 获取数据库
    MongoDatabase database = mongoClient.getDatabase("test");
    // 获取集合
    MongoCollection col = database.getCollection("demo");
    // 查询
    // 条件查询
    FindIterable q1 = col.find();
    System.out.println(q1);
    MongoCursor q1_cursor = q1.iterator();
    try {
      while (q1_cursor.hasNext()) {
        System.out.println(q1_cursor.next());
      }
    } finally {
      q1_cursor.close();
    }
    // 遍历集合
//    for (Object doc : col.find()) {
//      System.out.println(doc);
//    }
    // 新建一个 doc
    Document doc = new Document("name", "alex");
    doc.append("age", "66");
    doc.append("school", "high school");
    doc.append("info", new Document("x", 30).append("y", 40));
    doc.append("versions", Arrays.asList("v1.0", "v2.0", "v3.0"));
    //插入一个文档到集合中
//    col.insertOne(doc);
    
    // 插入多个文档
    List<Document> documents = new ArrayList<Document>();
    for (int i = 0; i < 5; i++) {
      documents.add(new Document("name", i));
    }
//    col.insertMany(documents);
    
    System.out.println(col.count());

//    FindIterable fi = demoData.find();
//
//    MongoCursor cursor = fi.iterator();
//
//    try {
//      while (cursor.hasNext()) {
//        System.out.println(cursor.next());
//      }
//    } finally {
//      cursor.close();
//    }
    
  }
}
