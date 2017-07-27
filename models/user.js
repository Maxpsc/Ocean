//用户模块
var dbConnection = require('./db');

function User(user){
	this.username = user.username;
	this.password = user.password;
}
module.exports = User;

//存入mongodb
User.prototype.save = function(callback){
	var user = {
		username:this.username,
		password:this.password
	};

	console.log(user);
	dbConnection(function(err,db){
		if(err){
			console.log(err);
			return;
		}
		//获取users collection
		var collection = db.collection('users');
		collection.insert(user,function(err,result){
			console.log("insert success");
			db.close();
			callback(err,result);
		});

	})
};

//获取指定user
User.get = function(username,callback){
	dbConnection(function(err,db){
		if(err){
			console.log(err);
			return;
		}
		//读取users集合
		var collection = db.collection('users');
		collection.findOne({username:username},function(err,doc){
			db.close();

			if(doc){
				var user = new User(doc);
				callback(err,user);
			}else{
				callback(err,null);
			}
		})
	})
};

//登录验证
User.check = function(user,callback){
	dbConnection(function(err,db){
		if(err){
			console.log(err);
			return;
		}
		var collection = db.collection('users');
		collection.findOne(user,function(err,doc){
			db.close();
			if(doc){
				var user = new User(doc);
				callback(err,user);
			}else{
				callback(err,null);
			}
		})
	})
};