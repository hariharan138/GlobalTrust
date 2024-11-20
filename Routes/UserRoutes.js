const express = require('express')
const { userRegistration,userLogin, userLogout } = require('../Controllers/User.controller')

let userRoute = express.Router()

userRoute.post('/registeruser',userRegistration)
userRoute.post('/loginuser', userLogin)
userRoute.post('/logoutuser', userLogout)

module.exports = userRoute