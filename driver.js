'use strict';

require('dotenv').config;
let eventEmitter = require('./events')
let faker = require('faker');

let driver = (obj) =>{
    setTimeout(()=>{
        eventEmitter.emit('in-transit', obj, obj.orderID);
    }, 1000)
    setTimeout(()=>{
        eventEmitter.emit('delivered', obj.orderID)
    }, 3000)
}

module.exports = driver;
