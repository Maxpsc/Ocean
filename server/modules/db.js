const MongoClient = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/microblog';

//数据库连接
const connection = function(callback){
	MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("mongodb连接成功！");
    callback(err,db);
	});
};

module.exports = connection;
