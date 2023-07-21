const jwt = require("jsonwebtoken")
const { userModel } = require("../models/userModel")
const auth = async (req, res, next) => {
    const {authorization} = req.headers
    console.log(authorization);
    
    
    if(!authorization) {
        throw  Error("Request  authenticated")
    }

    const token = authorization.split(" ")[1]
    
    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await userModel.findOne({_id}).select("_id")
        console.log(req.user);
        
        next()
    } catch (error) {
        console.log(error);
        
        res.status(401).json({message: "Request not authenticated"})
    }
}

module.exports = {
    auth
}

