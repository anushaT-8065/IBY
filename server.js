// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const messageRoutes = require('./routes/message');
app.use('/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('sendMessage', (messageData) => {
    io.to(messageData.chatRoom).emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/messaging-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));

// Start server
server.listen(5000, () => {
  console.log('Server running on port 5000');
});
