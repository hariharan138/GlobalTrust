const express = require('express')
const { userRegistration,userLogin, userLogout, getTrusts,foodRegister } = require('../Controllers/User.controller')
const { userAuth } = require('../Authentication/UserAuth')
const upload = require('../utils/multer')

let userRoute = express.Router()

// in postman the key name should be "image" when sendning the file 
userRoute.post('/registeruser',upload.single('profile'),userRegistration)
userRoute.post('/loginuser', userLogin)
userRoute.post('/logoutuser', userLogout)
userRoute.get("/gettrust",userAuth, getTrusts);
userRoute.post('/foodRegister', userAuth, foodRegister)
module.exports = userRoute