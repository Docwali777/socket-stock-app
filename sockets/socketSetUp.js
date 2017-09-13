module.exports = (io) =>{
  io.on('connection', socket =>{

  socket.on('display', data =>{
    console.log(data);
    io.emit('data from server', data)
  })

  })

}
