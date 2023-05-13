const express = require('express')
const usersController = require('../controller/users')

const router = express.Router()

// CREATE user - POST
router.post('/', usersController.createUser) // path "/" will refer to /users because grouping in index.js file so no need to write'/users'

module.exports = router