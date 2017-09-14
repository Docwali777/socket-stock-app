module.exports = (io) =>{
  io.on('connection', socket =>{

  socket.on('display', data =>{

    io.emit('data from server', data)
  })

  })

}
