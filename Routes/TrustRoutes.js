const express = require('express');

const {addTrusts, loginTrusts, logoutTrusts, getUsers, getRegisteredFoods, acceptFoodOrder} = require('../Controllers/Trust.controller');
const { trustUserAuth } = require('../Authentication/TrustUserAuth');

let route = express.Router();

route.post("/addtrust",addTrusts);
route.post("/logintrust",loginTrusts);
route.post("/logouttrust",logoutTrusts);
route.get('/getusers/:page/:limit', trustUserAuth, getUsers)

route.get('/getfoodorder/:page/:limit', trustUserAuth ,getRegisteredFoods)
route.post('/acceptfoodorder/:orderId', trustUserAuth ,acceptFoodOrder)
module.exports=route;