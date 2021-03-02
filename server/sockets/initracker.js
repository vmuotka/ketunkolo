const socketio = require('socket.io')
const url = require('url')
module.exports = (http) => {
  const io = socketio(http, {})

  io.on('connection', (socket) => {
    socket.on('joinroom', data => {
      if (data.roomname) {
        socket.join(data.roomname.toLowerCase())
      }
    })
  })

  http.on('request', (request, response) => {
    const requestUrl = url.parse(request.url, true)
    if (requestUrl.pathname === '/api/initracker/initiative' && request.method === 'GET') {
      io.to(requestUrl.query.roomname.toLowerCase()).emit('initiative', { ...requestUrl.query })
      response.writeHead(200, {
        'Content-Type': 'application/json'
      })
      response.write('{message: "success"}')
      response.end()
    }
  })

}

