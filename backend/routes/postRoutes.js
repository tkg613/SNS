const express = require('express')
const {getPosts, getPost, createPost} = require('../controllers/postController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(getPosts).post(protect, createPost)
router.route('/:id').get(getPost)

module.exports = router