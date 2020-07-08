const trackerRouter = require('express').Router()
const Group = require('../models/initrackerGroup')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

trackerRouter.post('/upload', async (req, res) => {
  const body = req.body

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const group = new Group({
    groupname: body.groupname,
    type: body.type,
    group: body.group,
    user: user.id
  })

  const savedGroup = await group.save().catch(error => {
    res.status(400).json({ error })
  })

  res.status(200).json(savedGroup)
})

trackerRouter.get('/getall', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const groups = await Group.find({ user: decodedToken.id })

  res.status(200).json(groups)
})

module.exports = trackerRouter