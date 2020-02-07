// Make connection
var socket = io.connect('nxt-007.herokuapp.com');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
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
