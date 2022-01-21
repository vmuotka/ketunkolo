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
        socket.on('combat-log-submit-entry', data => {
            data.value = 0
            for (let i = 0; i < data.roll.count; i++)
                data.value += Math.floor(Math.random() * data.roll.die + 1)

            io.to(data.roomname.toLowerCase()).emit('combat-log-new-entry', data)
        })
    })
}