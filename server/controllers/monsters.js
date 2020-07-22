const monsterRouter = require('express').Router()
const Monster = require('../models/monster')

monsterRouter.post('/search', async (req, res) => {
  const body = req.body
  let query = {}

  if (body.searchword !== '')
    query.name = { '$regex': body.searchword, '$options': 'i' }

  if (body.alignment !== '')
    query.alignment = { '$regex': body.alignment, '$options': 'i' }

  if (body.type !== '')
    query.type = { '$regex': body.type, '$options': 'i' }

  if (body.size !== '')
    query.size = { '$regex': body.size, '$options': 'i' }

  if (body.cr !== '')
    query.challenge_rating = body.cr

  const searchResults = await Monster.find(query)
  return res.status(200).json(searchResults)
})

monsterRouter.get('/get/:id', async (req, res) => {
  const monster = await Monster.findById(req.params.id)
  return res.status(200).json(monster)
})

module.exports = monsterRouter