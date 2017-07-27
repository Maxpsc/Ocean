//发表内容模块
var dbConnection = require('./db');

function Post(post){
	this.username = post.username;
	this.title = post.title;
	this.content = post.content;
	this.time = post.time ? post.time : new Date();
}

module.exports = Post;

Post.prototype.save = function(callback){
	var post = {
		username: this.username,
		title: this.title,
		content: this.content,
		time: this.time
	};
	// connect mongodb
	dbConnection(function(err,db){
		if(err){
			console.log(err);
			return;
		}
		var collection = db.collection('posts');
		collection.insert(post, function(err,result){
			console.log("public success");
			db.close();
			callback(err,result);
		})
	})
};

Post.get = function(username,callback){
	dbConnection(function(err,db){
		if(err){
			console.log(err);
			return;
		}
		var collection = db.collection('posts');
		var query = username ? {username: username} : {};

		collection.find(query).sort({time:-1}).toArray().then(function(docs){
			db.close();

			console.log(docs);

			var posts = [];
			for(var i in docs){
				var post = {
					username:docs[i].username,
					title:docs[i].title,
					content:docs[i].content,
					time:docs[i].time
				};
				posts.push(new Post(post));
			}
			
			callback(posts);
		});
		
	})
}