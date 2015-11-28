var fs = require('fs'),
    path = require('path'),
    session = require('express-session'),
    uniqueId = require('lodash').uniqueId,
    values = require('lodash').values,
    passport = require('passport'),
    crypter = require('./crypter'),
    HashStrategy = require('passport-hash').Strategy;

var FILE = '../data/users.json',
    SECRET = 'erss3port',
    interval = 1000 * 60, // minutes
    expirationThreshold = 5 * 86400000, // in days 
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

function writeHash (email, hash) {
    var dest = path.join(__dirname, FILE),
        hashes = readHashes(),
        data;

    hashes[email] = hash;
    data = JSON.stringify(hashes);
    fs.writeFileSync(dest, data, { flag: 'w' });

    return hash;
}

function createHash () {
    var expiration = Math.round((Date.now() + expirationThreshold) / interval);
    return crypter.encrypt(expiration);
}

function isExpired (str) {
    var then = +str;
    return isNaN(then) || Date.now() > new Date(then * interval);
}

function hashExists(hash) {
    var hashes = values(readHashes());
    return ~hashes.indexOf(hash);
}

function isValid (hash) {
    var then = crypter.decrypt(hash);
    return then && !isExpired(then) && hashExists(hash);
}

function isValidEmail (email) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);
}

// Wrapper for passport
module.exports = {
    createValidHash: function (email) {
        return isValidEmail(email) ?
                writeHash(email, createHash()) :
                'Not a valid email to create token';
    },

    initialize: function (app) {
        app.use(session({
            resave: true,
            secret: SECRET,
            saveUninitialized: false,
            genid: function () {
                return uniqueId(SECRET);
            }
        }));

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(new HashStrategy(function (hash, done) {
            return done(null, isValid(hash) ? fakeUser : false);
        }));

        passport.serializeUser(function (user, passport, done) {
            done(null, fakeUser);
        });

        passport.deserializeUser(function (id, done) {
            done(null, fakeUser);
        });

    },

    authenticate: function (failure) {
        return passport.authenticate('hash', { failureRedirect: failure});
    }
};