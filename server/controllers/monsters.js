const monsterRouter = require('express').Router()
const Monster = require('../models/monster')

monsterRouter.post('/search', async (req, res) => {
  const body = req.body
  let query = {}

  if (body.searchword !== undefined && body.searchword !== '')
    query.name = { '$regex': body.searchword, '$options': 'i' }


  if (body.alignment !== undefined && body.alignment.length !== 0) {
    let regex
    body.alignment.forEach(value => {
      if (regex === undefined)
        regex = '(?=.*' + value + ')'
      else
        regex = regex + '(?=.*' + value + ')'
    })
    const alignment = new RegExp(
      regex
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
    query.speed = speeds
  }

  if (body.cr !== undefined && body.cr.length !== 0) {
    query.challenge_rating = body.cr
  }

  console.log(query)

  const searchResults = await (await Monster.find(query).limit(100))
  return res.status(200).json(searchResults)
})

monsterRouter.get('/get/:id', async (req, res) => {
  const monster = await Monster.findById(req.params.id)
  return res.status(200).json(monster)
})

module.exports = monsterRouter