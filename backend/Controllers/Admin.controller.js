const { validateAdmin } = require("../Validation/ValidationUser")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminModel = require("../models/Admin.modle")
const UserModel = require("../models/User.model")
const TrustModel = require("../models/Trust.model")
const FoodModel = require("../models/Food.model")
const mongoose = require("mongoose")
const DeletedsModel = require("../models/Deleteds.model")



let adminLogin = async (req, res)=>{
    try{
            validateAdmin(req)
            let {email, password} = req.body
            let {admintoken} = req.cookies
            // console.log(admintoken)
            if(admintoken){
                let {_id} =  jwt.verify(admintoken, process.env.JWT_ADMIN_SECREAT_KEY)
                // console.log(decodedData)
                if(_id){
                    throw new Error("admin already loggedIn")
                }
            }

            let isExists = await AdminModel.findOne({email: email})
            
            if(!isExists){
                throw new Error("admin doesnt exist in database")
            }
            
            if(password != isExists.password){
                throw new Error("incorrect password")
            }

        //    let isMatching = await bcrypt.compare(password, isExists.password)

        //    if(!isMatching){
        //     throw new Error("incorrect password")
        //    }

            let token = await jwt.sign({_id: isExists._id}, process.env.JWT_ADMIN_SECREAT_KEY, {expiresIn: process.env.JWT_ADMIN_TOKEN_EXPIRY})
            res.cookie("admintoken", token, {expires: new Date(Date.now() + 8 * 300000)})
            res.status(200).json({msg: "admin has loggedin"})       
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let adminLogout = async (req, res)=>{
    res.cookie("admintoken", null, {expires: new Date(Date.now())})
    res.status(200).json({msg: "admin has loggedout"})       

}

let getUsersAdmin = async (req, res)=>{
    try{
let allowedFields = ["Name", "phone", "password"]
            // let user = req.user
            
            // console.log(req.params)
            let limit = (req.params.limit > 20 ? 10 : req.params.limit) || 10
            let page = req.params.page || 1
            let skip = (page-1) * limit

            let data = await UserModel.find({}).skip(skip).limit(limit).select(allowedFields)
            res.status(200).json({msg: "Users data fetched", page, limit, data})
            // res.status(200).json({msg: "Users data fetched"})
        
    }
    catch(err){
        res.status(500).json({error:true, message:err.message})
    }
}

let getTrustsAdmin = async (req, res)=>{
    let allowedFields = ["trustName", "trustEmail", "trustPhoneNumber", "address"]
    try{
        let limit = (req.params.limit > 20 ? 10 : req.params.limit) || 10
        let page = req.params.page || 1
        let skip = (page-1) * limit
        let trusts =await TrustModel.find({}).skip(skip).limit(limit).select(allowedFields)
        res.status(201).json({error:false,message:"Trust Fetched succesfully",data:trusts})
    }
    catch(err){
        res.status(500).json({error:true, message:err.message})
    }
}

let getTransactions = async (req, res)=>{
    try{
        let page = Number(req.params.page)
        let limit = parseInt(req.params.limit)
        console.log(typeof limit)
        
        if(typeof limit !== "number"){
            throw new Error("limit should be a number")
        }

        if(typeof page !== "number"){
            throw new Error("page should be a number")
        }

         limit = req.params.limit > 20 ? 10 : req.params.limit || 10
         page = req.params.page || 1
        let skip = (page - 1) * limit

        let data = await FoodModel.find({acceptedBy : {$ne: null}}).skip(skip).limit(limit)

        if(data.length==0){
            return res.status(200).json({error:false, message:"No Successfull Transaction"})  
        }
        res.status(200).json({error:false, message:"Transactions Fetched succesfully",data})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let deleteUsersAndTrusts = async (req, res)=>{
    try{
       let {id, role} = req.params
       let isExists = ""
       if(!role){
        throw new Error("select the role")
       }

        if(!id){
         throw new Error("Enter the proper Id")
        }

        if(role != "trust" && role !== "user"){
         throw new Error("role can be either trust or user")
        }

        if(role ==="user"){
             isExists = await UserModel.findById(id)
             if(!isExists){
                throw new Error("User is not registered")
             }
            
            await DeletedsModel.create({email: isExists.email, role: isExists.role})
            
            let deletedUser = await UserModel.findByIdAndDelete(isExists.id, {returnDocument: "after"})
            res.status(200).json({msg: "deleted succesffuly", data : deletedUser})
        
        }

        if(role === "trust"){
             isExists = await TrustModel.findById(id)
            
             if(!isExists){
                throw new Error("User is not registered")
            }

            await DeletedsModel.create({email: isExists.email, role: isExists.role})

            let deletedUser = await TrustModel.findByIdAndDelete(isExists.id, {returnDocument: "after"})
            res.status(200).json({msg: "deleted succesffuly", data : deletedUser})
        }
       
   
       
      }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

module.exports = {
    adminLogin,
    adminLogout,
    getUsersAdmin,
    getTrustsAdmin,
    getTransactions,
    deleteUsersAndTrusts
}