const express = require('express')
const { userRegistration,userLogin } = require('../Controllers/User.controller')

let userRoute = express.Router()

userRoute.post('/registeruser',userRegistration)
userRoute.post('/loginUser', userLogin)

module.exports = userRoute