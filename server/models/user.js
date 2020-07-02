const mongoose = require('mongoose')
require('mongoose-type-email')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [3, 'Username is too short'],
    required: [true, 'Username required'],
    unique: true
  },
  username_lower: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password required']
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required: [true, 'Email required']
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    delete returnedObject.username_lower
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User