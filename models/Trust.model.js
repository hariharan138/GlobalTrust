let mongoose= require("mongoose")
let Trustschema= new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    }
})
module.exports= mongoose.model("Trust",Trustschema);