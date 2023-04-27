const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Post = require('../models/postModel')

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async function(req, res){
  
  // populate() will replace the user field with the actual user that corresponds to the reference
  const posts = await Post.find({}).populate('user')

  if (!posts){
    res.status(401)
    throw new Error('Posts not found.')
  }
  res.status(200).json(posts)
})

// @desc    Get all posts for a user
// @route   GET /api/posts/users/:id
// @access  Public
const getUserPosts = asyncHandler(async function(req, res){
  
  // Get all posts of a user specified in the URL
  const posts = await Post.find({user: req.params.userId})

  if (!posts){
    res.status(401)
    throw new Error('Posts not found.')
  }
  res.status(200).json(posts)
})

// @desc    Get a post
// @route   /api/posts/:id
// @access  Public
const getPost = asyncHandler(async function(req, res){
  
  // populate() will replace the user field with the actual user that corresponds to the reference
  const post = await Post.findById(req.params.id).populate('user')

  if (!post){
    res.status(401)
    throw new Error('Post not found.')
  }
  res.status(200).json(post)
})

// @desc    Create post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async function(req, res) {
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

  const post = await Post.create({
    text: text,
    user: req.user.id
  })
  
  res.status(201).json(post)

})

module.exports = {
  getPosts,
  getUserPosts,
  getPost,
  createPost
}