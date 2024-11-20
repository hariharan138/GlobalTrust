const Trust = require("../models/Trust.model")

const validate = async (req)=>{
    let {firstName,email, lastName, phone, password, confirmPassword,trustName,
        trustId, address, trustEmail,trustPhoneNumber } = req.body
      if(!email){
        throw new Error("Enter the Email")
      }
     let isExists = await Trust.findOne({$or: [{email: email}, {phone: phone}, {trustId: trustId}, {trustEmail: trustEmail}, {trustPhoneNumber: trustPhoneNumber}]})

      if(isExists){
        console.log("user is already there")
            throw new Error("User Already registered")
      }

      if( phone.length!==10 || trustPhoneNumber.length!==10){
            throw new Error("Mobile Number should be 10 digits long")
        }

      if(password!==confirmPassword){
        throw new Error("Password is not matching with confirm Password")
      }
      console.log("no problem")
}

module.exports= {
    validate
}