const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

usersRouter.post('/register', async (req, res) => {
  const body = req.body
  const saltRounds = 10

  if (body.password === undefined) {
    return res.status(400).json({ error: 'password required' })
  }

  if (body.password.length < 5) {
    return res.status(400).json({ error: 'password too short' })
  }

  // if (body.username === undefined) {
  //   return res.status(400).json({ error: 'username required' })
  // }

  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash: passwordHash,
    email: body.email
  })

  const savedUser = await user.save().catch(error => {
    res.status(400).json({ error: error })
  })
  res.status(200).json(savedUser)
})

usersRouter.post('/login', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token, username: user.username, id: user.id })
})

module.exports = usersRouter