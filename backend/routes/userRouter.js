const express = require("express")
const {loginController, signupController} = require("../controllers/userController")
const userRouter = express.Router()

userRouter.post('/signup', signupController)
userRouter.post('/login', loginController)
userRouter.get("/", (req, res) => {
    res.send("request gotten")
})
module.exports = {userRouter}
