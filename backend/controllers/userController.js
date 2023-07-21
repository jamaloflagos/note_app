require("dotenv").config()
const {userModel} = require("../models/userModel")
const jwt = require("jsonwebtoken")

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "60m"})
}


const generateRefreshToken = (_id) => {
    return jwt.sign({_id}, process.env.REFRESH_SECRET, {expiresIn: "7d"})

}

const signupController = async (req, res) => {
    const {email, password, name} = req.body
    try {
        const user = await userModel.signup(email, password, name)
        const token =  generateToken(user._id)
        res.status(200).json({token, name})
    } catch (error) { 
        res.status(400).json({error: error.message})
    }

    console.log("recieved");
    
}


const loginController = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.login(email, password)
        console.log(user)
        const token = generateToken(user._id)
        res.status(200).json({token, name: user.name})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}


module.exports = {signupController, loginController}