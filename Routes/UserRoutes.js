const express = require('express')
const { userRegistration,userLogin, userLogout, getTrusts } = require('../Controllers/User.controller')

let userRoute = express.Router()

userRoute.post('/registeruser',userRegistration)
userRoute.post('/loginuser', userLogin)
userRoute.post('/logoutuser', userLogout)
userRoute.get("/gettrust",getTrusts);
module.exports = userRoute