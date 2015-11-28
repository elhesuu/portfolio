	'use strict';

var express = require('express'),
	app = express(),
	auth = require('./auth/auth'),
	path = require('path'),
	port = process.env.PORT || 1234;

app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));
auth.initialize(app);

app.get('/content.json', function (req, res) {
	res.sendFile(path.join(__dirname, 'data/content.json'));
});

app.get('/hi', function (req, res) {
	res.render('hi');
});

function renderOrRedirect (req, res) {
	return req.isAuthenticated() ?
		res.render('index') :
		res.redirect('/hi');
}

app.get('/portfolio/:hash', auth.authenticate('/hi'), renderOrRedirect);
app.get('/*', function renderOrRedirect (req, res) {
	return req.isAuthenticated() ?
		res.render('index') :
		res.redirect('/hi');
});

app.listen(port, function () {
	console.log('Listening ' + port);
});

