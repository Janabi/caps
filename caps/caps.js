'use strict';

const generateUniqueId = require('generate-unique-id'); 

const randomID = generateUniqueId({
    length: 5,
    useLetters: false
});

let net = require('net');
const PORT = 8080;
const server = net.createServer();

server.listen(PORT, () => console.log(`Your are listening ${PORT}`))

let socketPool = {};

server.on('connection', (socket)=> {
    console.log("SERVER GOT A CONNECTION!");
    
    const id = `Socket-${randomID}`;
    socketPool[id] = socket;
    // client sends data
    socket.on('data', (buffer)=> dispatchEvent(buffer));
    socket.on('error', (e)=> console.log('SOCKET ERROR', e));
    socket.on('end', (e)=> delete socketPool[id]);
});



function dispatchEvent(buffer) {
    let msg = JSON.parse(buffer.toString().trim());
    
    broadcast(msg)
}
function broadcast(msg) {
    let payload = JSON.stringify(msg);
    for (let socket in socketPool) {
        socketPool[socket].write(payload);
    }
    if (msg.event=== 'pickup') consoleLogIt(msg.event, msg.payload)
    if (msg.event=== 'in-transit') consoleLogIt(msg.event, msg.payload)
    if (msg.event=== 'delivered') consoleLogIt(msg.event, msg.payload)
}


// const eventEmitter = require('./events');

// eventEmitter.on('pickup', (payload, id)=> consoleLogIt('pickup', payload, id));
// eventEmitter.on('in-transit', (payload, id)=> consoleLogIt('in-transit', payload, id));
// eventEmitter.on('delivered', payload=> thankYou(payload));

function consoleLogIt(event, payload) {
    let time = new Date();
    time = time.toLocaleString();
    console.log('EVENT',{event, time, payload})
}

// function thankYou(payload) {
//     console.log(`VENDOR: Thank you for delivering ${payload}`);
// }

// module.exports = eventEmitter;