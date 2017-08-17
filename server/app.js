import express from 'express';
import db from './db.js';
import path from 'path';
//import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import session from 'express-session';
// const MongoStore = require('connect-mongo')(session);
import settings from './Setting';
import router from './routes';

const app = express();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session
app.use(session({
	secret: settings.cookieSecret,
	resave: false,
  	saveUninitialized: true,
	cookie: {
		maxAge: 60 * 1000
	},
	// store: new MongoStore({
	// 	url: 'mongodb://'+ settings.host +'/'+ settings.db
	// })
}));
//static sources
app.use('/dist', express.static('dist'));

app.all('/*', (req,res,next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
	res.header('X-Powered-By', 'MicroBlog');
	// if (req.method === 'OPTIONS') {
	//   	res.send(200);
	// } else {
	//     next();
	// }
	next();
});
router(app);

module.exports = app;//这里注意必须用CommonJS输出
