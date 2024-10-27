// Modules
// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const {john, peter} = require('./3_modules_1');
const sayHi = require('./3_modules_2');
const data = require('./3_modules_3');

require('./3_modules_4');
console.log(data);

sayHi('susan');
sayHi(john);
sayHi(peter);   