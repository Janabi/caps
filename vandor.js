'use strict';

require('dotenv').config();
let eventEmitter = require('./events')
let faker = require('faker');
require('./caps');

let storeName = process.env.STORE;

let simulator = () =>{
    let obj = new Object();
    obj.store = storeName;
    obj.orderID = faker.random.uuid();
    obj.customer = faker.name.findName();
    obj.address = faker.address.city() + ', ' + faker.address.stateAbbr();
    eventEmitter.emit('pickup', obj, obj.orderID);
    return obj;
}

// setInterval(simulator, 5000);

module.exports = simulator;