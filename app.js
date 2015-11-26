'use strict';

var express = require('express'),
	app = express(),
	path = require('path'),
	port = process.env.PORT || 1234;

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'jade');

app
	.get('/content.json', function (req, res) {
		res.sendFile(path.join(__dirname, 'data/content.json'));
	}) 
	.get('/*', function (req, res) {
		res.render('index');
	});

app.listen(port, function () {
	console.log('Listening ' + port);
});