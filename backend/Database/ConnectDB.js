const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        let res = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("database is connected successfully")
    }
    catch(err){
        console.log("ERROR OCCURED: "+err.message)
    }
}

module.exports = {
    connectDb
}