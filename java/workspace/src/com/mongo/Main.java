package com.mongo;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class Main {
  public static void main(String[] args) {
    
    MongoClientURI uri = new MongoClientURI("mongodb+srv://test:test@cluster0-f5jim.mongodb.net/test?retryWrites=true");
    
    MongoClient mongoClient = new MongoClient(uri);
    MongoDatabase database = mongoClient.getDatabase("test");
    
    MongoCollection demoData = database.getCollection("demo");
    
    FindIterable fi = demoData.find();
    System.out.println(fi);
    
    MongoCursor cursor = fi.iterator();
    
    try {
      while (cursor.hasNext()) {
        System.out.println(cursor.next());
      }
    } finally {
      cursor.close();
    }
    
  }
}
