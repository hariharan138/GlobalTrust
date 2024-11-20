const { validateAdmin } = require("../Validation/ValidationUser")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const AdminModel = require("../models/Admin.modle")

let adminLogin = async (req, res)=>{
    try{
            validateAdmin(req)
            let {email, password} = req.body
            let {admintoken} = req.cookies
            console.log(admintoken)
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
        
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let getTrustsAdmin = async (req, res)=>{
    try{

    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let getTransactions = async (req, res)=>{
    try{

    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let deleteUsersAndTrusts = async (req, res)=>{
    try{

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