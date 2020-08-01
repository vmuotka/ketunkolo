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


module.exports = spellRouter