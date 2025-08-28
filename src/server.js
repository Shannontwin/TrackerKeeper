const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://www.tracker-keeper.com", // Update with your React app's URL
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('create-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} created and joined room ${roomId}`);
    socket.emit('room-created', roomId);
  });

  socket.on('join-room', (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room && room.size < 2) {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      io.to(roomId).emit('paired', `Devices paired in room ${roomId}`);
    } else {
      socket.emit('pairing-error', 'Room is full or does not exist');
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
