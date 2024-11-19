const express = require('express');

const {addTrusts,getTrusts, loginTrusts, logoutTrusts, getUsers} = require('../Controllers/Trust.controller');

let route = express.Router();

route.post("/addtrust",addTrusts);
route.post("/logintrust",loginTrusts);
route.post("/logouttrust",logoutTrusts);
route.get("/gettrust",getTrusts);
route.get('./getusers/:page/:limit', getUsers)

module.exports=route;