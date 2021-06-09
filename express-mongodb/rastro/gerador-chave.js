const crypto = require('crypto');
const bytes = crypto.randomBytes(64);
console.log(bytes.toString('hex'));