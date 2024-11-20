const express = require("express")
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
let userRegistration = async(req, res)=>{

    try{
            let hashedPassword = await bcrypt.hash(password, 10)

            let newUser = new UserModel({
                Name, 
                email,
                phone, 
                password: hashedPassword, 
                confirmPassword: hashedPassword
            })

            await newUser.save()

            res.status(200).json({msg: "User Added SuccessFully", data: newUser})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

module.exports= {
    userRegistration
}