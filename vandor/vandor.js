'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3030;
const faker = require('faker');
const caps = io.connect(`http://localhost:3030/caps`);
const STORE_NAME = `1-206-flowers`;
let channel = STORE_NAME;
console.log(channel);
caps.emit('join', channel);

caps.on('joined', (joinedChannel) => {
  console.log(`Joined Room: ${joinedChannel}`);
  channel = joinedChannel;
});


caps.on('delivered', (payload) => {
  console.log(`Thank you for delivering ${payload.orderId}`);
});


const generateOrder = () => {
  let payload = {
      storeName: STORE_NAME,
      orderId: faker.random.uuid(),
      customerName: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  caps.emit('pickup' ,payload);
};

setInterval(generateOrder, 5000);