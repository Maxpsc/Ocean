const express = require('express');
const api = require('./routes/api');

const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const db = require('./db');
// const MongoStore = require('connect-mongo')(session);
const settings = require('./Setting');

const app = express();

// uncomment after placing your favicon in /public
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
//register routes
api(app);
module.exports = app;
