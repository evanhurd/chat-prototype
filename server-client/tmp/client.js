var socket = require('socket.io-client')('http://localhost');

socket.on('connect', function(){
  console.log('ha');
});
socket.on('event', function(data){});
socket.on('disconnect', function(){})
socket.on('test', function(data){ console.log(data)});