var express = require('express');
var socket = require('socket.io');
let db = require('./configs/db');
let Message = require("./model");
// App setup
var app = express();
var server = app.listen(4000, function() {
  console.log('listening for requests on port 4000');
});

// Static files
app.use(express.static('public'));
// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  Message.findHistory().then(function(chatHistory)
  {
    socket.emit('show-history',chatHistory);
  });
  // Handle chat event
  socket.on('chat', function(data) {
    Message.sendMessage(data.handle,data.message);
    io.sockets.emit('chat', data);
  });

});