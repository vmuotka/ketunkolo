const monsterRouter = require('express').Router()
const Monster = require('../models/monster')

monsterRouter.post('/search', async (req, res) => {
  const body = req.body
  let query = {}

  if (body.searchword !== '')
    query.name = { '$regex': body.searchword, '$options': 'i' }


  if (body.alignment.length !== 0) {
    let alignments = []
    body.alignment.forEach(alignment => {
      alignments.push(new RegExp(alignment, 'i'))
    })
    query.alignment = alignments
  }

  if (body.type.length !== 0) {
    let types = []
    body.type.forEach(type => {
      types.push(new RegExp(type, 'i'))
    })
    query.type = types
  }

  if (body.size.length !== 0) {
    let sizes = []
    body.size.forEach(size => {
      sizes.push(new RegExp(size, 'i'))
    })
    query.size = sizes
  }

  if (body.cr.length !== 0) {
    query.challenge_rating = body.cr
  }

  console.log(query)

  const searchResults = await (await Monster.find(query))
  return res.status(200).json(searchResults)
})

monsterRouter.get('/get/:id', async (req, res) => {
  const monster = await Monster.findById(req.params.id)
  return res.status(200).json(monster)
})

module.exports = monsterRouter