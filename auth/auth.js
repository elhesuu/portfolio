var fs = require('fs'),
	path = require('path'),
	session = require('express-session'),
	uniqueId = require('lodash').uniqueId,
	values = require('lodash').values,
	passport = require('passport'),
	crypter = require('./crypter'),
	HashStrategy = require('passport-hash').Strategy;

var FILE = '../data/users.json',
	threshold = 5 * 86400000, // days 
	fakeUser = { name: 'Fake' }; // @todo get real users

function readHashes () {
	var src = path.join(__dirname, FILE);
	try { 
		var contents = fs.readFileSync(src);
		return JSON.parse(contents);
	} catch (e) {
		return {};	
	}
}

function writeHashes (obj) {
	var dest = path.join(__dirname, FILE),
		data = JSON.stringify(obj);
	return fs.writeFileSync(dest, data, { flag: 'w' });
}

function createHash () {
	var expiricy = Date.now() + threshold;
	return crypter.encrypt(expiricy);
}

function saveHash (email, hash) {
	var hashes = readHashes();
	hashes[email] = hash;
	writeHashes(hashes);
	return hash;
}

function hashExists(hash) {
	var hashes = values(readHashes());
	return ~hashes.indexOf(hash);
}

function isExpired (str) {
	var then = +str;
	return isNaN(then) || Date.now() > new Date(then);
}

function isValid (hash) {
	var decrypted = crypter.decrypt(hash);
	return decrypted && !isExpired(decrypted) && hashExists(hash);
}

// 83bce5474a2890876eafc0b4f2
// Wrapper for passport

module.exports = {
	createValidHash: function (email) {
		return email ? saveHash(email, createHash()) : false;
	},

	initialize: function (app) {
		app.use(session({
			resave: true,
			secret: 'erss3port',
			saveUninitialized: false,
			genid: function () {
				return uniqueId('Coqui');
			}
		}));

		app.use(passport.initialize());
		app.use(passport.session());

		passport.use(new HashStrategy(function (hash, done) {
			return done(null, isValid(hash) ? fakeUser : null);
		}));

		passport.serializeUser(function (user, passport, done) {
			done(null, fakeUser);
		});

		passport.deserializeUser(function (id, done) {
			done(null, fakeUser);
		});
	},
	authenticate: function (failure) {
		return passport.authenticate('hash', {
			failureRedirect: failure
		});
	}
};