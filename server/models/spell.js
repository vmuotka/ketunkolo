const mongoose = require('mongoose')

const spellSchema = new mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  range: { type: String },
  components: { type: Array },
  material: { type: String },
  ritual: { type: Boolean },
  concentration: { type: Boolean },
  duration: { type: String },
  casting_time: { type: String },
  level: { type: String },
  school: { type: String },
  class: { type: Array },
  higher_level: { type: String },
  user: { type: String }
})

spellSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Spell = mongoose.model('Spell', spellSchema)

module.exports = Spell