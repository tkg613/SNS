const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async function(req, res) {
  const {name, email, password} = req.body

  // Validation
  if (!name || !email || !password){
    res.status(400)
    throw new Error('Please include all fields.')
  }

  // Find if user already exists
  const userExists = await User.findOne({email: email})

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }

})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async function(req, res) {

  const {email, password} = req.body

  const user = await User.findOne({email: email})

  // Compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials.')
  }

})

// @desc    Get a user
// @route   GET /api/users/:id
// @access  Public
const getUser = asyncHandler(async function(req, res){
  
  // Do not get password and token info with this GET
  const user = await User.findById(req.params.id).select('-password -token')

  if (!user){
    res.status(404)
    throw new Error('User not found.')
  }

  res.status(200).json(user)
})


// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async function(req, res){
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(user)
})

// Generate token
const generateToken = function(id){
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getMe
}