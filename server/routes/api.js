import crypto from 'crypto';//express 核心模块之一，用于加密生成各种散列
import User from '../modules/User';
import Post from '../modules/Post';

/**
 * 包装返回的json,包含错误提示信息和错误码
 * @param {*} items - 返回主要数据
 * @param {number} [code=0] - 错误码
 * =>0:success,6:查询结果(change param's key),7:参数格式错误(change param's key),8:权限错误,9:服务器错误
 * @return {object} 包装后的json object,用于直接send
 * @method packJSON
 */
const packJSON = (items,code=0) => {
    let msgs = {
        '0':'success',
        '6':'wrong params value!',
        '7':'wrong params format!',
        '8':'wrong authority!',
        '9':'server error!'
    };
    return {
        "error_code": code,
        "error_message": msgs[code],
        "items": items
    };
};
// api settings
module.exports = (app) => {
    //cors
    app.all('/*', (req,res,next) => {
        res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Credentials", true);
        res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
        res.header('X-Powered-By', 'MicroBlog');
        next();
    });
    //get all/one posts
    app.get('/api/posts', (req,res) => {
        console.log(req.session);
        if(!req.session.user){
            req.session.destroy();
        }
        Post.get(req.query,(posts) => {
            res.status(200).json(packJSON(posts)).end();
        });
    });
    //public post
    app.post('/api/posts/public', (req,res) => {
        if(!req.body.uid || !req.body.username){
            res.send(packJSON('权限错误',8));
        }else{
            let newPost = new Post({
                uid: req.body.uid,
                username: req.body.username,
    			title: req.body.title,
    			content:req.body.content,
    			time: new Date()
            });
            //保存至mongodb
    		newPost.save(function(err){
    			if(err){
    				console.log(err);
                    res.send(packJSON(err,9));
    			}
    		    res.send(packJSON('Public success!'));
    		});
        }
    });
    //update post @admin
    app.post('/api/posts/update', (req,res) => {
        if(!req.body.uid || !req.body.username){
            res.send(packJSON('权限错误',8));
        }else{
            let newPost = new Post({
                uid: req.body.uid,
                username: req.body.username,
    			title: req.body.title,
    			content:req.body.content,
    			time: new Date()
            });
    		newPost.update(req.body._id, function(err){
    			if(err){
    				console.log(err);
                    res.send(packJSON(err,9));
    			}
    		    res.send(packJSON('Update success!'));
    		});
        }
    });
    //delete posts @admin
    app.post('/api/posts/delete', (req,res) => {
        console.log(req.session);
        if(!req.body.uid || !req.body.username){
            res.send(packJSON('权限错误',8));
        }else{
    		Post.delete(req.body.ids, function(err){
    			if(err){
    				console.log(err);
                    res.send(packJSON(err,9));
    			}
    		    res.send(packJSON('Delete success!'));
    		});
        }
    });
    //user sign up
    app.post('/api/reg', (req,res) => {
        if((req.body.password !== req.body.repassword) || req.body.username==='' || req.body.password===''){
			console.log("reg infos wrong");
			res.send(packJSON('注册信息有误',6));
		}
        //生成密码散列
        let md5 = crypto.createHash('md5');
        let password = md5.update(req.body.password).digest('hex');
        //生成User对象
        let newUser= new User({
            identity: req.body.identity,
            username: req.body.username,
            password: password
        });
        //check username's existence
        User.get(newUser.username,(err,user) => {
            if (user){
                res.send(packJSON('用户名已存在',6));return;
            }
            if (err) {
                res.send(packJSON(err,9));return;
            }
            newUser.save(function(err) {
                if (err) {
                    res.send(packJSON(err,9));return;
                }
                console.log('signup sucess');
                res.send(packJSON('注册成功'));
            });
		});
    });
    //user log in
    app.post('/api/login', (req,res) => {
        console.log(req);
        console.log(req.body);
        if(req.body.username==='' || req.body.password===''){
			console.log('login wrong');
			res.send(packJSON('登录信息有误',7));
            return;
		}
        console.log(req.body);
        //生成密码散列
        let md5 = crypto.createHash('md5');
		let password = md5.update(req.body.password).digest('hex');
        //生成用户对象
        let loginUser = {
            username:req.body.username,
            password:password
        };
        console.log(loginUser);
        User.check(loginUser,(err,user) => {
            if(err){
                res.send(packJSON(err,9));
            }
            if(user){
                req.session.user = user;
				console.log('login success');
				res.send(packJSON({
                    user:user
                }));
			}else{
				req.session.user = null;
				console.log('login fail');
                res.send(packJSON('用户名/密码错误',6));
			}
            console.log(req.session);
        });
    });
    //user log out
    app.get('/api/logout',(req,res) => {
        console.log(req.session);
        req.session.destroy();
        console.log(req.session);
        res.send(packJSON('登出成功'));
    });

    //manage users @admin
    app.get('/api/users',(req,res) => {
        let users = [1,2,3,4];
        res.json(packJSON(users));
    });
    app.post('/api/users/update',(req,res) => {
    });
    app.post('/api/users/delete',(req,res) => {

    });
};
