const spellRouter = require('express').Router()
const Spell = require('../models/spell')
const jwt = require('jsonwebtoken')

spellRouter.post('/search', async (req, res) => {
  const body = req.body
  let query = {}

  if (body.searchword !== undefined && body.searchword !== '')
    query.name = { '$regex': body.searchword.trim(), '$options': 'i' }


  if (body.level !== undefined && body.level.length !== 0) {
    let arr = []
    body.level.forEach(val => {
      arr.push(new RegExp(val, 'i'))
    })
    query.level = arr
  }

  if (body.class !== undefined && body.class.length !== 0) {
    let arr = []
    body.class.forEach(val => {
      arr.push(new RegExp(val.toLowerCase(), 'i'))
    })
    query.class = { $in: arr }
  }

  if (body.school !== undefined && body.school.length !== 0) {
    let arr = []
    body.school.forEach(val => {
      arr.push(new RegExp(val, 'i'))
    })
    query.school = arr
  }

  if (body.casting_time !== undefined && body.casting_time.length !== 0) {
    let arr = []
    body.casting_time.forEach(val => {
      arr.push(new RegExp(val, 'i'))
    })
    query.casting_time = arr
  }

  if (body.ritual !== undefined && body.ritual !== '') {
    query.ritual = body.ritual
  }

  if (body.concentration !== undefined && body.concentration !== '') {
    query.concentration = body.concentration
  }

  const searchResults = await Spell.find(query)
  return res.status(200).json(searchResults)
})


spellRouter.get('/get/:id', async (req, res) => {
  const monster = await Spell.findById(req.params.id)
  return res.status(200).json(monster)
})

spellRouter.post('/getbyuser', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const returnArr = await Spell.find({ user: decodedToken.id })
  return res.status(200).json(returnArr)
})

spellRouter.post('/upload', async (req, res) => {
  const form = req.body
  let validation = {}
  if (form.name === '')
    validation.name = true
  if (form.desc === '')
    validation.desc = true
  if (form.range === '')
    validation.range = true
  if (form.components.length === 0)
    validation.components = true
  if (form.components.includes('M') && form.material === '')
    validation.material = true
  if (form.duration === '')
    validation.duration = true
  if (form.casting_time === '')
    validation.casting_time = true
  if (form.level === '')
    validation.level = true
  if (form.school === '')
    validation.school = true
  if (form.class.length === 0)
    validation.class = true

  if (Object.getOwnPropertyNames(validation).length >= 1)
    return res.status(400).json({ error: 'Missing required fields.' })


  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  let returnedObject = {}
  if (form.user) {
    const spell = await Spell.findById(form.id)
    if (spell.user === decodedToken.id)
      returnedObject = await Spell.findByIdAndUpdate(form.id, form, { new: true })
  } else {
    form.user = decodedToken.id
    const spell = new Spell(form)
    returnedObject = await spell.save()
  }

  return res.status(200).json(returnedObject)
})

spellRouter.delete('/delete', async (req, res) => {
  let decodedToken = null
  if (req.token) {
    decodedToken = jwt.verify(req.token, process.env.SECRET)
  } else
    return res.status(400).json({ error: 'Token not provided' })

  const document_id = req.body.id

  const spell = await Spell.findById(document_id)
  if (spell.user === decodedToken.id) {
    await Spell.findByIdAndDelete(document_id)
    return res.status(200).json({ message: 'deleted' })
  } else {
    return res.status(401)
  }
})


module.exports = spellRouter