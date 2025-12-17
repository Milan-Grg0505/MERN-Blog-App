import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

//register
export const register = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // to check email or not 
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid email"
      });
    }

    if (password < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must at least 6 characters"
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already existed"
      })
    }

    /// hash password
    const hashPassword = await bcryptjs.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully"
    })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to register"
      })
  }
}

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password"
      });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }


    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
      }).json({
        success: true,
        message: `Welcome back ${user.firstName}`,
        user
      })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to login"
      })
  }
}

// logout 
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logout successfully"
    })

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to logout"
      })
  }
}


// update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { firstName, lastName, occupation, bio, instagram, facebook, linkedin, github }
      = req.body;
    const file = req.file;
    const fileUri = getDataUri(file)
    let cloudResponse = await cloudinary.uploader.upload(fileUri);
    console.log(cloudResponse)

    const user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({
        success:false,
        message:"USer not found"
      })
    }

    // updating data
    if(firstName) user.firstName = firstName;
    if(lastName) user.lastName = lastName;
    if(occupation)  user.occupation = occupation;
    if(instagram) user.instagram = instagram;
    if(facebook) user.facebook = facebook;
    if(linkedin) user.linkedin = linkedin;
    if(github) uesr.github = github;
    if(bio) user.bio = bio;

    if(file) user.photoUrl = cloudResponse.secure_url;

    await user.save()
    return res.status(200).json({
      success:true,
      message:"Profile Updated Successfully",
      user
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Failed to update profle"
    })
  }
}