var Hashids = require('hashids'),
    hashids = new Hashids(process.env.KEY || 'Ed4dam3els', 0, 'jesuvilar19802dc');

function encrypt (text) {
    return hashids.encode(+text);
}

function decrypt (text) {
    try {
        return hashids.decode(text);
    } catch (e) {
        return '';
    }
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}