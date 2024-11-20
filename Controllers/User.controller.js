const express = require("express")
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const { validateUser } = require('../Validation/ValidationUser')
const jwt = require('jsonwebtoken')

let userRegistration = async(req, res)=>{

    try{

            await validateUser(req)
            let {Name,email, phone, password, confirmPassword} = req.body

            let hashedPassword = await bcrypt.hash(password,10)
            
            let newUser = new UserModel({
                Name, 
                email,
                phone, 
                password: hashedPassword, 
                confirmPassword: hashedPassword
            })

            await newUser.save()
            res.status(200).json({msg: "User Registered SuccessFully", data: newUser})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let userLogin = async (req, res)=>{
    try{
        
        let {Name,email, phone, password, confirmPassword } = req.body
        let {userlogintoken} = req.cookies

        if(userlogintoken){
            let decodedData = jwt.verify(userlogintoken, process.env.JWT_USER_SECREAT_KEY)
            if(decodedData){
                throw new Error("user is already loggedin")
            }
        }

        if(!email){
            throw new Error("Enter the Email")
          }

          if(!password){
            throw new Error("Enter Password")
          }

         let isExists = await UserModel.findOne({email: email})

         if(!isExists){
            throw new Error("User is not a registered")
         }

        let isMatching = await bcrypt.compare(password, isExists.password)

        if(!isMatching){
            throw new Error("password is not matching")
        }

         let token = await jwt.sign({_id: isExists._id}, process.env.JWT_USER_SECREAT_KEY, {expiresIn: process.env.JWT_USER_TOKEN_EXPIRY})
         res.cookie("userlogintoken", token, {expires: new Date(Date.now() + 8 * 300000)})
          res.status(200).json({msg: isExists.Name + " has loggedin"})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let userLogout = async (req, res)=>{
    res.cookie("userlogintoken", null, {expires: new Date(Date.now())})
    res.status(200).json({msg: "user has logged out"})
}

module.exports= {
    userRegistration,
    userLogin,
    userLogout
}