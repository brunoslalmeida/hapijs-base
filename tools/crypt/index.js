const Crypto = require('crypto');
const algorithm = 'sha1';

var crypto = {};

var key = "kGpr&QyjJHU%NMK2n^E5%Kkm2Fcn3u";
var salt = "fxt^P26mkxy#ySwRP@$24gWec%8DM^XCHExU267fXaw!HAfENt6B3#Tg5*uRRFhr2%";

crypto.createHash = (data) => {
	hmac = Crypto.createHmac(algorithm, key);
	hmac.setEncoding('hex');
	hmac.write(data + salt);
	hmac.end();
	return hmac.read();
}

module.exports = crypto;