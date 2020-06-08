var express = require('express');
var socket = require('socket.io');
let db = require('./configs/db');
let bodyparser=require("body-parser");
let Message = require("./model");
require("dotenv").config();
// App setup
var app = express();
let port=process.env.PORT||3000;
var server = app.listen(port, function() {
  console.log('listening for requests on port 3000');
});

// Static files
app.use(bodyparser.json());
app.use('/chat-board',express.static('public/chat-board'));
app.use('/login',express.static('public/login'));
app.use('/signup',express.static('public/signup'));
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
    Message.sendMessage(data.handle,data.message,data.time);
    io.sockets.emit('chat', data);
  });

});
app.get('/',(req,res)=>
{
  res.redirect('/login');
});

app.post('/signup/api/',(req,res)=>{
  let {username,password}=req.body;
  Message.createAccount(username,password).then(function(){
    res.status(201).send({
      register:'true'
    });
  }).catch(function(err){
    res.status(400).send(JSON.stringify({
      register: 'false',
      message: err.detail
    }))
  });
});
app.post('/login/api/',(req,res)=>{
  let {username,password}=req.body;
  Message.checkAccount(username,password).then(function(user){
    res.status(200).send(user);
  })
  .catch(function(err){
    res.status(400).send(JSON.stringify({
      login: 'false',
      message: err.detail
    }))
  });
});