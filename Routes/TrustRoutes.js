const express = require('express');
const  {addTrusts,getTrusts}  = require('../Controllers/Trust.controller');



let route = express.Router();

route.post("/addtrust",addTrusts);
route.get("/gettrust",getTrusts);

module.exports=route;