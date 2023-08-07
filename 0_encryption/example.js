const bcrypt = require('bcryptjs');
const saltRounds = 10;

const plainPassword1 = 'HelloWorld';

const salt = bcrypt.genSaltSync(saltRounds);

const hash1 = bcrypt.hashSync(plainPassword1, salt);

const verifyPass1 = bcrypt.compareSync(plainPassword1, hash1);

console.log(`Hash 1: ${hash1}`);
console.log('----------------------------------------');
console.log(`Is plainPassword1 corresponding to the created hash1: ${verifyPass1}`);