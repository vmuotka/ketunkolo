const monsterRouter = require('express').Router()
const Monster = require('../models/monster')
const jwt = require('jsonwebtoken')

monsterRouter.post('/search', async (req, res) => {
  const body = req.body
  let query = {}

  if (body.searchword !== undefined && body.searchword !== '')
    query.name = { '$regex': body.searchword.trim(), '$options': 'i' }


  if (body.alignment !== undefined && body.alignment.length !== 0) {
    let regex
    body.alignment.forEach(value => {
      if (regex === undefined)
        regex = '(?=.*' + value + ')'
      else
        regex = regex + '(?=.*' + value + ')'
    })
    const alignment = new RegExp(
      regex, 'i'
    )

    query.alignment = alignment
  }

  if (body.type !== undefined && body.type.length !== 0) {
    let types = []
    body.type.forEach(type => {
      types.push(new RegExp(type, 'i'))
    })
    query.type = types
  }

  if (body.size !== undefined && body.size.length !== 0) {
    let sizes = []
    body.size.forEach(size => {
      sizes.push(new RegExp(size, 'i'))
    })
    query.size = sizes
  }

  if (body.speed !== undefined && body.speed.length !== 0) {
    let speeds = []
    body.speed.forEach(speed => {
      speeds.push(new RegExp(speed, 'i'))
    })
    query.speed_types = { $in: speeds }
  }

  if (body.cr !== undefined && body.cr.length !== 0) {
    query.challenge_rating = body.cr
  }

  const searchResults = await Monster.find(query)
  return res.status(200).json(searchResults)
})

monsterRouter.post('/upload', async (req, res) => {
  const form = req.body
  let validation = {}
  if (form.name === '')
    validation.name = true
  if (form.size === '')
    validation.size = true
  if (form.type === '')
    validation.type = true
  if (form.alignment === '')
    validation.alignment = true
  if (form.armor_class === '')
    validation.armor_class = true
  if (Object.keys(form.speed).length === 0)
    validation.speed = true
  if (form.challenge_rating === '')
    validation.challenge_rating = true
  if (Object.getOwnPropertyNames(validation).length >= 1) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  form.speed_types = Object.keys(form.speed)

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  let returnedObject = {}
  if (form.user) {
    const monster = await Monster.findById(form.id)
    if (monster.user === decodedToken.id)
      returnedObject = await Monster.findByIdAndUpdate(form.id, form, { new: true })
  } else {
    form.user = decodedToken.id
    const monster = new Monster(form)
    returnedObject = await monster.save()
  }

  return res.status(200).json(returnedObject)
})

monsterRouter.delete('/delete', async (req, res) => {
  let decodedToken = null
  if (req.token) {
    decodedToken = jwt.verify(req.token, process.env.SECRET)
  } else
    return res.status(400).json({ error: 'Token not provided' })

  const document_id = req.body.id

  const monster = await Monster.findById(document_id)
  if (monster.user === decodedToken.id) {
    await Monster.findByIdAndDelete(document_id)
    return res.status(200).json({ message: 'deleted' })
  } else {
    return res.status(401)
  }
})

monsterRouter.get('/get/:id', async (req, res) => {
  const monster = await Monster.findById(req.params.id)
  return res.status(200).json(monster)
})

monsterRouter.post('/getbyuser', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const returnArr = await Monster.find({ user: decodedToken.id })
  return res.status(200).json(returnArr)
})

module.exports = monsterRouter