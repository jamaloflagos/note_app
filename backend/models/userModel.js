const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timeStamps: true,
    versionKey: false
})


userSchema.statics.signup = async function(email, password, name) {
    if(!email || !password || !name) {
        throw Error("All inputs must be filled")
    }
    
    if(!validator.isEmail(email)) {
        throw Error("Enter a valid email")
    }

    if(!validator.isStrongPassword) {
        throw Error("Enter a strong password")
    }

    const userExist = await this.findOne({email})

    if(userExist) {
        throw Error("User already exist")
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash, name})
    return user
}


userSchema.statics.login = async function(email, password)  {
    if(!email || !password) {
        throw Error("All inputs must be filled")
    }
    
    const user = await this.findOne({email})

    if(!user) {
        throw Error("Incorrect email")
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch) {
        throw Error("Incorrect password")
    }

    return user
    
}

const userModel = mongoose.model("user", userSchema)


module.exports = {userModel}