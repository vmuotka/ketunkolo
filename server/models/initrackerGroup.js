const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
  groupname: {
    type: String,
    minlength: [2, 'Groupname is too short'],
    required: [true, 'Groupname required']
  },
  group: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
})

groupSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group