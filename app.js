'user strict';

let eventEmitter = require('./events')
let vendor = require('./vandor')
let driver = require('./driver')

setInterval(()=>{
    let obj = vendor();
    driver(obj);
}, 5000);