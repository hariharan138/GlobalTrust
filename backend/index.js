const express = require('express');
const mongoose = require('mongoose');
let app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require("cors")

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(cookieParser())

const trustRoutes = require('./Routes/TrustRoutes');
const userRoute = require('./Routes/UserRoutes');
const adminRoute = require('./Routes/AdminRoutes');
const { connectDb } = require('./Database/ConnectDB');

const fs = require("fs")
const path = require("path")

app.use(express.json())

const uploadsDir = path.join(__dirname, 'uploads');

// Check if the folder exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use("/api/trust",trustRoutes )
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)

// mongoose.connect('mongodb://127.0.0.1:27017/Trust').then((data) => {
//     console.log("Mongodb Connected Succesfully")
// }).catch((err) => {
//     console.log(err)
// })

connectDb().then(()=>{
    console.log("DB connected successfully")

// should keep inside this inside "then" block
app.listen(4000, () => {
    console.log("Server running in the PORT 4000")
})
}).catch(err=> console.log(err.message))