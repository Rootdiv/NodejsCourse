import crypto from 'node:crypto';
//import { readFile } from 'node:fs/promises';

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const algorithm = 'aes-256-cbc';
const text = 'Hello Node.js, Crypto';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('encrypted:', encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('decrypted:', decrypted);

// const randomBytes = crypto.randomBytes(16);
// console.log('randomBytes:', randomBytes);
// console.log('randomBytes(string):', randomBytes.toString());
// console.log('randomBytes(hex):', randomBytes.toString('hex'));
// console.log('randomBytes(base64):', randomBytes.toString('base64'));
// console.log('randomBytes(binary):', randomBytes.toString('latin1'));

// const data = await readFile('public/favicon.svg');
// console.log('data: ', data);

// const hash = crypto.createHash('sha256').update(data).digest('hex');
// console.log('hash: ', hash);
