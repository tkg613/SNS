const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name.']
  },
  email: {
    type: String,
    required: [true, 'Please add an email.']
  },
  password: {
    type: String,
    required: [true, 'Please add a password.']
  },
  image: {
    type: String,
    required: false,
    default: "https://img.icons8.com/ios-glyphs/90/null/person-male.png"
  }
}, {
  timestamp: true
})

module.exports = mongoose.model('User', userSchema)