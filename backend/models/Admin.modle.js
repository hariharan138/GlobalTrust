const mongoose = require("mongoose")

let adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        minlength: [8, "password should be atleast 8 characters long"]
    }
})

// adminSchema.indexes({email: 1})

module.exports = mongoose.model("AdminModel", adminSchema)