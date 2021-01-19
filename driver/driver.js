'use strict';

const io = require('socket.io-client');
const caps = io.connect(`http://localhost:3030/caps`);

caps.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`picked up ${payload.orderId}`);
    caps.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log(`delivered up ${payload.orderId}`);
    caps.emit('delivered', payload);
  }, 3000);
});
