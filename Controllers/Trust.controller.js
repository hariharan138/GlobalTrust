let Trust=require('../models/Trust.model')
// console.log(Trusts)
let addTrusts=async(req,res,next)=>{
    try{
        let {name,email}=req.body
        // console.log(name)
        let trustCredentials=await Trust.create({name,email}) 
        res.status(201).json({error:false,message:"Trust Added Successfully",data:trustCredentials})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}
let getTrusts=async(req,res,next)=>{
    try{

        let Trust=await Trust.find({})
        res.status(201).json({error:false,message:"Trust Fetch succesfully",data:trustCredentials})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}
module.exports={
    addTrusts,
    getTrusts
}