'use strict';

require('dotenv').config();
let port = process.env.PORT || 3030
const io = require('socket.io')(port);
capsNamespace(io);
io.on('connection', (socket) => {
  console.log('Welcome to Global Connection ! ');
  console.log('Default Namespace');

  socket.on('error', (err) => {
    io.emit('error', err);
  });

  socket.on('action', (payload) => {
    io.emit('action', payload);
  });
});

function capsNamespace (io){
  const caps = io.of('/caps');
  let currentRoom = '';
  caps.on('connection', (socket) => {
    console.log('Caps Namespace');
    socket.on('join', (room) => {
      socket.leave(currentRoom);
      socket.join(room);
      currentRoom = room;

      io.emit('action', `Someone Joined Room : ${room}`);
      caps.to(`${socket.id}`).emit('joined', room);
    });

    socket.on('pickup', (payload) => {
      let obj = {
        event: 'pickup',
        time: new Date().toLocaleTimeString(),
        payload
      }
      console.log('EVENT ', obj);
      caps.emit('pickup', payload);
    });

    socket.on('in-transit', (payload) => {
      let obj = {
        event: 'in-transit',
        time: new Date().toLocaleTimeString(),
        payload
      }
      console.log('EVENT ', obj);
      caps.to(currentRoom).emit('in-transit', payload);
    });

    socket.on('delivered', (payload) => {
      let obj = {
        event: 'delivered',
        time: new Date().toLocaleTimeString(),
        payload
      }
      console.log('EVENT ', obj);
      caps.to(currentRoom).emit('delivered', payload);
    });
  });
};
