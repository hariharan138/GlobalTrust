let Trust=require('../models/Trust.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.model')

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

        if(password!==confirmPassword){
            throw new Error("Password does not match with ConfirmPassword")
        }

        let currentPassword = await bcrypt.hash(password,10)
        console.log(currentPassword)

        let trustCredentials=await Trust.create({firstName,lastName,email,phone, password: currentPassword, confirmPassword: currentPassword,trustName, trustId, address, trustEmail,trustPhoneNumber }) 

        res.status(201).json({error:false,message:"Trust Added Successfully",data:trustCredentials})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let loginTrusts = async (req, res)=>{
    try{
            let {email, password} = req.body
            const {authToken} = req.cookies
            if(authToken){
                const decodedData = jwt.verify(authToken, process.env.JWT_SECREAT_KEY)
                if(decodedData){
                    throw new Error("user is already logged in")
                }
            }
            let isExist = await Trust.findOne({email: email})
            
            if(!isExist){
                throw new Error("user is not registered")
            }

            let isMatching = await bcrypt.compare(password, isExist.password)
            if(!isMatching){
                throw new Error("incorrect password")
            }

            let token = await jwt.sign({_id: isExist._id}, process.env.JWT_SECREAT_KEY ,{expiresIn: process.env.JWT_TOKEN_EXPIRY})
        
            res.cookie("authToken", token, {expires: new Date(Date.now() + 8 * 300000)}) //in 40min cookie will expire
            res.status(200).json({msg: isExist.firstName + " login Successfull"})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let logoutTrusts = async (req, res)=>{
         res.cookie("authToken", null, {expires: new Date(Date.now())})
         res.status(200).json({msg: "user logged out successfully"})       
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

let getUsers = async (req, res)=>{
        try{
            let limit = (req.params.limit > 20 ? 10 : req.params.limit) || 10
            let page = req.params.page || 1
            let skip = (page-1) * limit

            let data = await UserModel.find({}).skip(skip).limit(limit)
            res.status(200).json({msg: "Users data fetched", data})
        }
        catch(err){
        res.status(500).json({error:true,message:err.message})
        }
}
module.exports={
    addTrusts,
    getTrusts,
    loginTrusts,
    logoutTrusts,
    getUsers
}