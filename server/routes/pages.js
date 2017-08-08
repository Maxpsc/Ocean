// route pages setting
module.exports = function(app){
	//as dynaticHelpers
	app.use(function(req,res,next){
		res.locals.user = req.session.user;
		next();
	})

	app.get('/',function(req,res){
		// console.log(req.session);

		//get all users' comments
		var comments = [];
		Post.get('',function(posts){
			res.render('index', { title: 'home', comments: posts});
		})
	});

	app.get('/public',function(req,res){
		res.render('public', { title: 'public' });
	})
	app.get('/user',function(req,res){
		//get user's comment
		var comments = [];
		Post.get(req.session.user.username,function(posts){
			res.render('user', { title: 'user', comments: posts});
		})

	})
	app.get('/login',function(req,res){
		res.render('login', { title: 'login' });
	})
	app.get('/logout',function(req,res){
		req.session.user = null;
		res.redirect('/');
	})
	app.get('/reg',function(req,res){
		res.render('reg', { title: 'reg' });
	})
	//注册功能
	app.post('/reg',function(req,res){
		if((req.body.password != req.body.repassword) || req.body.username=='' || req.body.password==''){
			console.log("reg wrong");
			return res.redirect('/reg');
		}
		//生成密码散列
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');

		//生成用户对象
		var newUser = new User({
			username: req.body.username,
			password: password
		})

		//检查用户名是否存在
		User.get(newUser.username, function(err, user) {
			if (user)
				err = 'Username already exists.';
			if (err) {
				return res.redirect('/reg');
			}

			newUser.save(function(err) {
				if (err) {
					return res.redirect('/reg');
				}
				console.log('signup sucess');
				req.session.user = newUser;
				return res.redirect('/');
			});
		});

	})

	//登录功能
	app.post('/login',function(req,res){
		if(req.body.username=='' || req.body.password==''){
			console.log('login wrong');
			return;
		}
		//生成密码散列
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('base64');

		//生成用户对象
		var loginUser = {
			username:req.body.username,
			password:password
		};

		console.log(loginUser);
		//连接数据库查询
		User.check(loginUser,function(err,user){
			if(user){
				req.session.user = user;
				console.log('login success');
				return res.redirect('/');
			}else{
				req.session.user = null;
				console.log('login fail');
				return res.redirect('/login');
			}
		})
	})

	//发表功能
	app.post('/public',function(req,res){
		var newPost = new Post({
			username: req.session.user.username,
			title: req.body.title,
			content:req.body.content,
			time: new Date()
		});

		//保存至mongodb
		newPost.save(function(err){
			if(err){
				console.log(err);
			}
			console.log("public success");
			return res.redirect('/');
		})
	})
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
};
