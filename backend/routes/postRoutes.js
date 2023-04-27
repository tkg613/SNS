const express = require('express')
const {getPosts, createPost} = require('../controllers/postController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(getPosts).post(protect, createPost)

module.exports = router