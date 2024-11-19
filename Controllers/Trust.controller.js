let Trust=require('../models/Trust.model')
// console.log(Trusts)
// Trust.syncIndexes()
//   .then(() => console.log("Indexes synced successfully"))
//   .catch(err => console.error("Error syncing indexes:", err));

let addTrusts=async(req,res)=>{
    try{
        let {firstName,email, lastName, phone, password, confirmPassword,trustName,
             trustId, address, trustEmail,trustPhoneNumber }=req.body
             
        if(phone.length!==10 && trustPhoneNumber.length!==10){
            throw new Error("Mobile Number should be 10 digits long")
        }

        let isExists = await Trust.findOne({$or: [{email: email}, {phone: phone}, {trustId: trustId}, {trustEmail: trustEmail}, {trustPhoneNumber: trustPhoneNumber}]})
        
        if(isExists){
            throw new Error("user is already exists")
        }

        let trustCredentials=await Trust.create({firstName,lastName,email,phone, password, confirmPassword,trustName, trustId, address, trustEmail,trustPhoneNumber }) 
        res.status(201).json({error:false,message:"Trust Added Successfully",data:trustCredentials})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let getTrusts=async(req,res,next)=>{
    try{

        let trusts =await Trust.find({})
        res.status(201).json({error:false,message:"Trust Fetch succesfully",data:trusts})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}
module.exports={
    addTrusts,
    getTrusts
}