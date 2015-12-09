'use strict';

require('dotenv').load();

var express = require('express'),
	app = express(),
	auth = require('./auth/auth'),
	path = require('path'),
	cookieParser = require('cookie-parser'),
	isProduction = process.env.NODE_ENV === 'production',
	port = process.env.PORT,
	secret = process.env.COOKIE_SECRET;

app.set('views', './views');
app.set('view engine', 'jade');
app.use(cookieParser(secret));
app.use(express.static('public'));
auth.initialize(app);

app.get('/content.json', function (req, res) {
	res.sendFile(path.join(__dirname, 'data/content.json'));
});

app.get('/hi', function (req, res) {
	res.render('hi');
});

function renderOrRedirect (req, res) {
	return req.isAuthenticated() || !isProduction ?
		res.render('index') :
		res.redirect('/hi');
}

app.get('/cv', function (req, res) {
	return res.sendFile(path.join(__dirname, 'data/cv.pdf'));
});

app.get('/portfolio/:hash/:route?', auth.authenticateOr('/hi'), function (req, res) {
	
	return res.render('index', { base: '/portfolio/' + req.params.hash });	
});

app.get('/*', renderOrRedirect);

app.listen(port, function () {
	console.log('Listening ' + port);
});

