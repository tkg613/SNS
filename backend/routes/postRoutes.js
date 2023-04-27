const express = require('express')
const {getPosts, getPost, createPost, getUserPosts} = require('../controllers/postController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(getPosts).post(protect, createPost)
router.route('/:id').get(getPost)
// /api/posts/users/:userId to get all posts of userId
router.route('/users/:userId').get(getUserPosts)

// Re-route to comment router
const commentRouter = require('./commentRoutes')
router.use('/:postId/comments', commentRouter)

module.exports = router