//user module
const dbConnection = require('./db');
class User{
    constructor(user) {
        this.username = user.username;
        this.password = user.password;
    }
    //sign up
    save(callback) {
        let user = {
            username:this.username,
    		password:this.password
        };
        dbConnection((err,db) => {
            if(err){
                console.log(err);return;
            }
            //获取users collection
            let collection = db.collection('users');
            collection.insert(user, function(err,result){
                console.log('insert success');
                db.close();
                callback && callback(err,result);
            });
        });
    }
};
//根据username获取指定user
User.get = (username,callback) => {
    dbConnection((err,db) => {
        if(err){
            console.log(err);return;
        }
        let collection = db.collection('users');
        collection.findOne({username: username}, (err,doc) => {
            db.close();
            let user = doc ? new User(doc) : null;
            callback && callback(err,user);
        });
    });
};
//login check
User.check = (user,callback) => {
    dbConnection((err,db) => {
        if (err) {
            console.log(err);return;
        }
        let collection = db.collection('users');
        collection.findOne(user, (err,doc) => {
            db.close();
            let user = doc ? new User(doc) : null;
            callback && callback(err,user);
        });
    });
};
module.exports = User;
