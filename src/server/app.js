var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');

var index = require('./routes/index');

var app = express();
require('./socket');

var oneDay = 86400000;

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public'), { maxAge: oneDay }));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var e = new Error('Not found');
	e.status = 404;
	next(e);
});

// error handlers
app.use(function(e, req, res, next) {
	if (!e.status) {
		console.error(e.stack || e);
		res.status(500);
		res.end('Internal server error');
	} else {
		res.status(e.status);
		res.end(e.message);
	}

});

module.exports = app;
