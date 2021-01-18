'use strict';

const eventEmitter = require('./events');

eventEmitter.on('pickup', (payload, id)=> consoleLogIt('pickup', payload, id));
eventEmitter.on('in-transit', (payload, id)=> consoleLogIt('in-transit', payload, id));
eventEmitter.on('delivered', payload=> thankYou(payload));

function consoleLogIt(event, payload, id) {
    let time = new Date();
    time = time.toUTCString();
    console.log({event, time, payload})
    console.log(`DRIVER: picked up ${id}`);
}

function thankYou(payload) {
    console.log(`VENDOR: Thank you for delivering ${payload}`);
}

module.exports = eventEmitter;