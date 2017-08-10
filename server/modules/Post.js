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
module.exports = Post;
