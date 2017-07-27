var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var routes = require('./routes');

var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./Setting');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
	secret: settings.cookieSecret,
	store: new MongoStore({
		url: 'mongodb://'+ settings.host +'/'+ settings.db
	})
}))

//register routes
// app.use(express.router(routes));
routes(app);


// app.listen(3000);
module.exports = app;
