//post module
const dbConnection = require('./db');

class Post{
    constructor(post) {
        this.uid = post.uid;
        this.username = post.username;
    	this.title = post.title;
    	this.content = post.content;
    	this.time = post.time ? post.time : new Date();
    }
    save(callback) {
        let post = {
            uid: this.uid,
            username: this.username,
    		title: this.title,
    		content: this.content,
    		time: this.time
        };
        dbConnection((err,db) => {
            if (err) {
                console.log(err);return;
            }
            let collection = db.collection('posts');
            collection.insert(post,(err,result) => {
                console.log('public success');
                db.close();
                callback && callback(err,result);
            });
        });
    }
    update(id,callback) {
        dbConnection((err,db) => {
            if (err) {
                console.log(err);return;
            }
            let post = {
                uid: this.uid,
                username: this.username,
        		title: this.title,
        		content: this.content,
        		time: this.time
            };
            let collection = db.collection('posts');
            collection.updateOne({'_id':id},{$set: post},function(err, result){
                console.log('edit success');
                db.close();
                callback && callback(err,result);
            });
        });
    }
}

Post.get = (query = {}, callback) => {
    dbConnection((err,db) => {
        if (err) {
            console.log(err);return;
        }
        let collection = db.collection('posts');
        console.log(query);
        collection.find(query).sort({time:-1}).toArray().then((docs) => {
            db.close();
            let posts = [];
            docs.forEach(function(doc){
                posts.push(new Post({
                    username:doc.username,
                    title:doc.title,
                    content:doc.content,
                    time:doc.time
                }));
            });
            callback && callback(posts);
        });
    });
};
Post.delete = (ids=[], callback) => {
    dbConnection((err,db) => {
        if (err) {
            console.log(err);return;
        }
        let collection = db.collection('posts');

        for(let i=0;i<ids.length;i++){
            collection.deleteOne({'_id':ids[i]}, function(err, result){
                if(i === ids.length-1){
                    console.log('delete success');
                    db.close();
                    callback && callback(err,result);
                }
            });
        }
    });
};
module.exports = Post;
