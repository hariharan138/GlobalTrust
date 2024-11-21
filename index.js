const express = require('express');
const mongoose = require('mongoose');
let app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require("cors")
app.use(cors())
app.use(cookieParser())
const trustRoutes = require('./Routes/TrustRoutes');
const userRoute = require('./Routes/UserRoutes');
const adminRoute = require('./Routes/AdminRoutes');
const { connectDb } = require('./Database/ConnectDB');

app.use(express.json())

app.use("/api/trust",trustRoutes )
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)

mongoose.connect('mongodb://127.0.0.1:27017/Trust').then((data) => {
    console.log("Mongodb Connected Succesfully")
}).catch((err) => {
    console.log(err)
})

// connectDb().then(()=>{
//     console.log("DB connected successfully")
// }).catch(err=> console.log(err.message))

// should keep inside this inside "then" block
app.listen(4000, () => {
    console.log("Server running in the PORT 4000")
})