const express = require("express")
const userController = require('../controller/user')
const router = express.Router()
//const checkAuth = require("../middleware/auth")

router.get('/', userController.getAllUsrs)

router.post('/signup',userController.signup)

router.post('/login', userController.login)

module.exports = router