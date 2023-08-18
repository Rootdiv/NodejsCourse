const { sayHello, user, Car, map } = require('./modules/toExport.js');

const promises = require('node:fs/promises');

console.log(require);

sayHello();

console.log(user.firstname);

console.log(map);

console.log(new Car('mini', 'cooper').showTitle());
