const bcrypt = require("bcryptjs ")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
/**
 * @desc register user
 * @route POST /api/auth/register
 * @access public
 */
const registerUserController = async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"all fields are required"})
    }

    const userExist = await userModel.findOne({ 
        $or:[{email},{username}]
    
    })
    if(userExist){
        return res.status(400).json({message:"user already exists"})
    }

    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"})
    
    res.cookie("token",token)
    
    res.status(201).json({
        message: "user registered successfully",
        user:{
            id:user._id,
            username:user.username
        }
    })
}


/**
 * @description login user and return JWT token
 * @route POST /api/auth/login
 * @access public
 */
const userLoginController = async(req,res)=>{
    
}

module.exports={registerUserController}