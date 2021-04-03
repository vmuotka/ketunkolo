const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const path = require('path')

const server = http.createServer(app)

const io = require('socket.io')(server)

require('./io-config')(io)


// parse json bodies sent by api clients
app.use(express.json())

app.use(middleware.tokenExtractor)

const usersRouter = require('./controllers/users')
app.use('/api/user', usersRouter)

const trackerRouter = require('./controllers/initracker')(io)
app.use('/api/initracker', trackerRouter)

const monsterRouter = require('./controllers/monsters')
app.use('/api/monsters', monsterRouter)

const spellRouter = require('./controllers/spells')
app.use('/api/spells', spellRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

app.use(cors())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
}

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})