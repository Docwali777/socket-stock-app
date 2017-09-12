module.exports = (io) =>{
  io.on('connection', socket =>{
    console.log('user connected');

  socket.on('display', data =>{
    console.log(data);
    io.emit('data from server', data)
  })

  })

}
