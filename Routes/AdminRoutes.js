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
adminRoute.get('/getusers', adminAuth ,getUsersAdmin)
adminRoute.get('/gettrust', getTrustsAdmin)
adminRoute.get('/transactions', getTransactions)
adminRoute.delete('/delete/:role/:id', deleteUsersAndTrusts)

module.exports = adminRoute