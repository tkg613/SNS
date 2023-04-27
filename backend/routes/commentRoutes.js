const express = require('express')
const {getComments, createComments} = require('../controllers/commentController')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(getComments).post(protect, createComments)

module.exports = router