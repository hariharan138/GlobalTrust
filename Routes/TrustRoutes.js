const express = require('express');

const {addTrusts,getTrusts, loginTrusts, logoutTrusts} = require('../Controllers/Trust.controller');

let route = express.Router();

route.post("/addtrust",addTrusts);
route.post("/logintrust",loginTrusts);
route.post("/logouttrust",logoutTrusts);
route.get("/gettrust",getTrusts);

module.exports=route;