const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

const index = require('./routes/index');

const app = express();
require('./socket');

// NOTE: Cache time
const MAX_AGE = '1y';

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public'), { maxAge: MAX_AGE }));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let e = new Error('Not found');
	e.status = 404;
	next(e);
});

// error handlers
app.use((e, req, res) => {
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
