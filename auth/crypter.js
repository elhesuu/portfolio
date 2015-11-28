var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = process.env.KEY || 'Ed4dam3els';

function encrypt (text) {
    var cipher = crypto.createCipher(algorithm, password),
        crypted = cipher.update(text + '', 'utf8', 'hex');

    crypted += cipher.final('hex');

    return crypted;
}

function decrypt (text) {
    try {
        var decipher = crypto.createDecipher(algorithm, password),
            dec = decipher.update(text + '','hex','utf8');
        
        dec += decipher.final('utf8');
        
        return dec;    
    } catch (e) {
        return '';
    }
    
}


module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
}