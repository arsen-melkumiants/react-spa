const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

const index = require('./routes/index');

const app = express();
require('./socket');

// Note: currently set a day
const MAX_AGE = 86400000;

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../dist'), { maxAge: MAX_AGE }));

app.use('/', index);


app.use((req, res) => {
	res.status(404).send('Not found');
});


app.use((err, req, res) => {
	console.error(err.stack || err);
	res.status(500).send('Internal server error');
});

module.exports = app;
