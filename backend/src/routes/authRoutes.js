const express = require("express")
const controller = require("../controller/authController")
const authRouter = express.Router()

// @route POST /api/auth/register
// @desc Register a new user

authRouter.post("/register",controller.registerUserController)

// @route POST /api/auth/login
// @desc Login user and return JWT token

authRouter.post("/login",LoginUser)




module.exports = authRouter