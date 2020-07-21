const monsterRouter = require('express').Router()
const Monster = require('../models/monster')

monsterRouter.get('/search/:searchword', async (req, res) => {
  const searchword = req.params.searchword.toLowerCase()
  const searchResults = await Monster.find({ name: { '$regex': searchword, '$options': 'i' } })
  return res.status(200).json(searchResults)
})

monsterRouter.get('/get/:id', async (req, res) => {
  const monster = await Monster.findById(req.params.id)
  return res.status(200).json(monster)
})

module.exports = monsterRouter