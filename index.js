const express = require('express');
const mongoose = require('mongoose');
let app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')

app.use(cookieParser())
const trustRoutes = require('./Routes/TrustRoutes');

app.use(express.json())

app.use("/api/trust",trustRoutes )

mongoose.connect('mongodb://127.0.0.1:27017/Trust').then((data) => {
    console.log("Mongodb Connected Succesfully")
}).catch((err) => {
    console.log(err)
})

app.listen(4000, () => {
    console.log("Server running in the PORT 4000")
})