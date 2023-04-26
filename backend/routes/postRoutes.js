const express = require('express')
const {getPosts} = require('../controllers/postController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

// api/posts
router.get('/', getPosts)

module.exports = router