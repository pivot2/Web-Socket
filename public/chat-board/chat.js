// Make connection
var socket = io.connect('localhost:3000/');
var myuser = localStorage.user;
// Query DOM
var   message = document.getElementById('message'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      handle: myuser,
      message: message.value,
      time: new Date().toLocaleTimeString()
  });
  message.value = "";
});

// Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('show-history',function(chatHistory){
    for (var index in chatHistory)
    {
        output.innerHTML += '<p><strong>' + chatHistory[index].username + ': </strong>' + chatHistory[index].message + '</p>';
    }
});
