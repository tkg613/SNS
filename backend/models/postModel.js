const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add text.']
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Post', postSchema)