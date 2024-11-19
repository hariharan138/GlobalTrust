const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        required:true,
        type: String,
        minlength:  [8, "should be atleast 8 characters long"],
   },
    confirmPassword:{
        required:true,
        type: String,
        minlength:  [8, "should be atleast 8 characters long"],
   },
    phone:{
        required:true,
        type: String,
        minlength:  [10, "should be atleast 10 digits long"],
        maxLength: [10, "maximum only 10 digits should be entered"],
        unique: true
    }
})

module.exports = mongoose.model("UserSchema", userSchema )