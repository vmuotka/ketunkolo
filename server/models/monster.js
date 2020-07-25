const mongoose = require('mongoose')

const monsterSchema = new mongoose.Schema({
  name: { type: String },
  size: { type: String },
  type: { type: String },
  subtype: { type: String },
  alignment: { type: String },
  armor_class: { type: Number },
  hit_points: { type: Number },
  hit_dice: { type: String },
  speed: { type: Object },
  speed_types: { type: Array },
  attributes: { type: Object },
  saving_throws: { type: Object },
  skills: { type: Object },
  vulnerabilities: { type: Array },
  resistances: { type: Array },
  immunities: { type: Array },
  condition_immunities: { type: Array },
  senses: { type: Array },
  languages: { type: Array },
  challenge_rating: { type: String },
  special_abilities: { type: Array },
  actions: { type: Array },
  legendary_desc: { type: String },
  legendary_actions: { type: Array },
  armor_desc: { type: String },
  user: { type: String }
})

monsterSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Monster = mongoose.model('Monster', monsterSchema)

module.exports = Monster