const { adminLogin,
    adminLogout,
     getUsersAdmin,
    getTrustsAdmin,
    getTransactions,
    deleteUsersAndTrusts } = require("../Controllers/Admin.controller")

const express = require('express')
const {adminAuth} = require('../Authentication/AdminAuth')
let adminRoute = express.Router()

adminRoute.post('/adminlogin', adminLogin)
adminRoute.post('/adminlogout', adminLogout)
adminRoute.get('/getusers/:page/:limit', adminAuth ,getUsersAdmin)
adminRoute.get('/gettrusts/:page/:limit', adminAuth , getTrustsAdmin)
adminRoute.get('/transactions', adminAuth ,getTransactions)
adminRoute.delete('/delete/:role/:id', adminAuth ,deleteUsersAndTrusts)

module.exports = adminRoute