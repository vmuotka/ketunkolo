const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

// parse json bodies sent by api clients
app.use(express.json())

const usersRouter = require('./controllers/users')
app.use('/api/user', usersRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })

app.use(cors())

module.exports = app