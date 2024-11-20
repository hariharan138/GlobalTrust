const express = require('express')
const { userRegistration,userLogin, userLogout, getTrusts,foodRegister } = require('../Controllers/User.controller')
const { userAuth } = require('../Authentication/UserAuth')

let userRoute = express.Router()

userRoute.post('/registeruser',userRegistration)
userRoute.post('/loginuser', userLogin)
userRoute.post('/logoutuser', userLogout)
userRoute.get("/gettrust",userAuth, getTrusts);
userRoute.post('/foodRegister', userAuth, foodRegister)
module.exports = userRoute