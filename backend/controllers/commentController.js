const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const Comment = require('../models/commentModel')

// @desc    Get all comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
const getComments = asyncHandler(async function(req, res){
  
  // populate() will replace the user field with the actual user that corresponds to the reference
  const comments = await Comment.find({post: req.params.postId}).populate('user').populate('post')

  if (!comments){
    res.status(404)
    throw new Error('Comments not found.')
  }
  res.status(200).json(comments)
})

// @desc    Create comments
// @route   POST /api/posts/:postId/comments
// @access  Private
const createComments = asyncHandler(async function(req, res) {
  
  const {text} = req.body

  if (!text) {
    res.status(400)
    throw new Error('Please add text.')
  }

  // Get user
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Get post
const post = await Post.findById(req.params.postId)

  // Get post
  const comment = await Comment.create({
    text: text,
    user: req.user.id,
    post: req.params.postId
  })

  // Add user and post attributes to comment object
  comment.user = user
  comment.post = post
  
  res.status(201).json(comment)

})

module.exports = {
  getComments,
  createComments
}