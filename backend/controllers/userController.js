const asyncHandler = require('express-async-handler')

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
})

// @desc    Login a user
// @route   /api/users/lohin
// @access  Public
const loginUser = asyncHandler(async function(req, res) {

})

module.exports = {
  registerUser,
  loginUser
}