import {User} from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

//register
export const register = async (req,res) =>{
  try {

    const {firstName,lastName,email,password}= req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({
          success:false,
          message:"All fields required"
        });
    }

    const emailRegex =  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // to check email or not 
    if(!emailRegex.test(email)){
      return res.status(400).json({
        sucess:false,
        message:"Invalid email"
      });
    }

    if(password < 6){
      return res.status(400).json({
        success:false,
        message:"Password must at least 6 characters"
      });
    }

    const existingUserByEmail = await User.findOne({email:email});
    if(existingUserByEmail){
      return res.status(400).json({
        success:false,
        message:"Email already existed"
      })
    }

    /// hash password
    const hashPassword = await bcryptjs.hash(password,10);
    
    await User.create({
      firstName,
      lastName,
      email,
      password:hashPassword
    });

    return res.status(201).json({
      success:true,
      message:"Account created successfully"
    })
    
  } catch (error) {
    console.log(error)
    return res
    .status(500)
    .json({
      success:false,
      message:"Failed to register"
    })
  }
}

// login
export const login = async (req,res) =>{
  try {
      const {email,password} = req.body;
      if(!email || !password) {
        return res.status(400).json({
          success:false,
          message:"All fields are required"
        });
      }

      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({
          success:false,
          message:"Incorrect email or password"
        });
      }

      const isPasswordValid = await bcryptjs.compare(password,user.password);

      if(!isPasswordValid){
        return res.status(400).json({
          success:false,
          message:"Invalid Credentials"
        });
      }
    

      const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});
      return res.status(200)
      .cookie("token",token,{
        maxAge:1 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        sameSite:"strict"
      }).json({
        success:true,
        message:`Welcome back ${user.firstName}`,
        user
      })

  } catch (error) {
     console.log(error)
    return res
    .status(500)
    .json({
      success:false,
      message:"Failed to login"
    })
  }
}

// logout 
export const logout = async (req,res) =>{
  try {
    return res.status(200).cookie("token","",{maxAge:0}).json({
      success:true,
      message:"Logout successfully"
    })
    
  } catch (error) {
    console.log(error)
    return res
    .status(500)
    .json({
      success:false,
      message:"Failed to logout"
    })
  }
}