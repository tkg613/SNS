const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Post = require('../models/postModel')

// @desc    Get all posts
// @route   /api/posts
// @access  Public
const getPosts = asyncHandler(async function(req, res){
  
  const posts = await Post.find({})

  if (!posts){
    res.status(401)
    throw new Error('Posts not found.')
  }

  res.status(200).json(posts)
})

module.exports = {
  getPosts
}