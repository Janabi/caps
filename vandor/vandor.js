'use strict';

require('dotenv').config();
// let eventEmitter = require('./events')
let net = require('net');
let faker = require('faker');

let storeName = process.env.STORE || '1-206-flowers';
let client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = 8080;

client.connect(PORT, HOST, ()=>{
    console.log("VANDOR CONNECT MSG");

    client.on('data', data=>{
        // console.log("The Obj>>>> ", data)
        const obj = JSON.parse(data);
        if (data.event === 'delivered') console.log(`VANDOR: thank you for delivering ${obj.payload.orderID}`)
    })
    setInterval(()=>{
        let payload = {
            store: storeName,
            orderID: faker.random.uuid(),
            customer: faker.name.findName(),
            address: faker.address.city() + ', ' + faker.address.stateAbbr()
        }
        let msg = {
            event: 'pickup',
            payload
        }
    
        let stringfiedMsg = JSON.stringify(msg);
        client.write(stringfiedMsg);
        client.on('error', (err)=> console.log("VENDOR ERROR ",err))
        client.on('close', ()=> console.log("VANDOR connection CLosed"));
    }, 5000)
})


// let simulator = () =>{
//     let obj = new Object();
//     obj.store = storeName;
//     obj.orderID = faker.random.uuid();
//     obj.customer = faker.name.findName();
//     obj.address = faker.address.city() + ', ' + faker.address.stateAbbr();
//     eventEmitter.emit('pickup', obj, obj.orderID);
//     return obj;
// }

// setInterval(simulator, 5000);

// module.exports = simulator;