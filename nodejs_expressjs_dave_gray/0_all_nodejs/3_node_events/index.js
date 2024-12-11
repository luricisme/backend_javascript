const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter{};

const myEmitter = new MyEmitter();

// myEmitter inherits all the methods and properties of EvenEmitter
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted\n');
}, 2000);

