
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:test@cluster0-f5jim.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

// 插入数据
exports.insertData = (data) => {
  client.connect(err => {
    console.log("mongodb is connecting");
    const collection = client.db("test").collection("news");
    collection.insertMany(data).then((result) => {
      console.log("insert success")
    });
    // perform actions on the collection object
    client.close();
  });
};
// 查询数据
exports.queryData = (resolve, type) => {
  client.connect(err => {
    console.log("mongodb is connecting");
    const collection = client.db("test").collection("news");
    const cursor = collection.find({});
    // perform actions on the collection object
    new Promise((r1, r2) => {
      const result = [];
      cursor.forEach(function (doc) {
        const str = JSON.stringify(doc, null, 4);
        // console.log(str);
        let obj = JSON.parse(str);
        if (type) {
          // 只取指定数据
          if (obj.hasOwnProperty(type)) {
            Object.keys(obj).forEach(n => {
              if (n != type) {
                delete obj[n];
              }
            })
          }
        }
        result.push(obj);
        r1(result);
      });
    }).then(r => {
      resolve(r);
      client.close();
    })
  });
};
