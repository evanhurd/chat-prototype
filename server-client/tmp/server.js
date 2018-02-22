var io = require('socket.io')(80);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.join('test');
});

setInterval(() =>  {
  try {
    io.to('test').emit('test', 'testing');
  } catch(err) {
    console.error(err);
  }
}, 1000);
