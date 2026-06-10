const userModel=require('../models/user.model')
const jwt = require('jsonwebtoken')
const emailService = require('../services/email.service')
const tokenBlackListModel= require("../models/blackList.model")


/* 
user register controller 
POST /api/auth/register
*/

async function userRegisterController(req,res){

    const {email,name,password}=req.body

    const isExists = await userModel.findOne({
        email:email
    })

    if(isExists){
        return res.status(422).json({
            message:"Email already exists",
            status:"failed"
        })
    }

    const user = await userModel.create({
        email,
        name,
        password
    })

    const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        status:"success",
        data:{
            user:{
                _id:user._id,
                email:user.email,
                name:user.name
            },
            token
        }
    })
        
    await emailService.sendRegistrationEmail(user.email,user.name)


}

/*
user login controller 
POST /api/auth/login
*/

async function userLoginController(req,res){

    const {email,password}=req.body

    const user = await userModel.findOne({
        email
    }).select("+password") // select the password field explicitly since it's set to select:false in the user model

    if(!user){
        return res.status(401).json({
            message:"Invalid email or password",
            status:"failed"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"Invalid email or password",
            status:"failed"
        })
    }

    const token =jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        status:"success",
        data:{
            user:{
                _id:user._id,
                email:user.email,
                name:user.name
            },
            token
        }
    })  

}

/**
 * user logout controller
 * - POST /api/auth/logout
 */

async function userLogoutController(req,res) {

    const token= req.cookies.token || req.headers.authorization?.split(" ")[ 1 ] 

    if(!token){
        return res.status(200).json({
            message:" User Logout successfully"
        })
    }

    await tokenBlackListModel.create({
        token:token
    })

    res.clearCookie("token")
    
    return res.status(200).json({
        message:"User logged out successfully "
    })
    
}




module.exports={
    userRegisterController,
    userLoginController,
    userLogoutController
}
