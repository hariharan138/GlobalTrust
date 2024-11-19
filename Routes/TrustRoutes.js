const express = require('express');

const {addTrusts,getTrusts, loginTrusts, logoutTrusts, getUsers} = require('../Controllers/Trust.controller');
const { trustUserAuth } = require('../Authentication/TrustUserAuth');

let route = express.Router();

route.post("/addtrust",addTrusts);
route.post("/logintrust",loginTrusts);
route.post("/logouttrust",logoutTrusts);
route.get("/gettrust",getTrusts);
route.get('/getusers/:page/:limit', trustUserAuth, getUsers)

module.exports=route;