module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinroom', data => {
      if (data.roomname) {
        socket.join(data.roomname.toLowerCase())
        socket.broadcast.to(data.roomname.toLowerCase()).emit('user-joined')
      }
    })
    socket.on('host-update-combat', data => {
      socket.broadcast.to(data.roomname.toLowerCase()).emit('host-update-combat', data)
    })
  })
}