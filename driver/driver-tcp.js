'use strict';

require('dotenv').config();
// let eventEmitter = require('./events')
let faker = require('faker');
let net = require('net');

const HOST = process.env.HOST || 'localhost';
const PORT = 6000;
let client = new net.Socket();

client.connect(PORT, HOST, ()=>{
    console.log('DRIVER CONNECT MSG')

    client.on('data', data=>{
        // console.log(data);
        let obj = JSON.parse(data);
        if(obj.event === 'pickup') transitAndDelivered(obj.payload)
    })
})

function transitAndDelivered(payload) {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    setTimeout(()=>{
        let msg = {
            event: 'in-transit',
            payload
        }
        let strigifiedMsg = JSON.stringify(msg);
        client.write(strigifiedMsg);
        client.on('error', ()=> console.log("IN-TRANSIT ERROR ",err))
        client.on('close', ()=> console.log("DRIVER connection CLosed"));
    }, 1000)
    setTimeout(()=>{
        let msg = {
            event: 'delivered',
            payload
        }
        console.log(`Driver: delivered: ${payload.orderID}`);
        let strigifiedMsg = JSON.stringify(msg);
        client.write(strigifiedMsg);
        client.on('error', ()=> console.log("DELIVERED ERROR ",err))
        client.on('close', ()=> console.log("DRIVER connection CLosed"));
    }, 3000)
}



// let driver = (obj) =>{
//     setTimeout(()=>{
//         eventEmitter.emit('in-transit', obj, obj.orderID);
//     }, 1000)
//     setTimeout(()=>{
//         eventEmitter.emit('delivered', obj.orderID)
//     }, 3000)
// }

// module.exports = driver;
