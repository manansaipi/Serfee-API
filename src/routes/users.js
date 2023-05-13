const express = require('express')
const usersController = require('../controller/users')

const router = express.Router()

// CREATE user - POST
router.post('/', usersController.createUser) 

module.exports = router