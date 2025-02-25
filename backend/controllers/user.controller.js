import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/Datauri.js"
// import cloudinary from "cloudinary"
import { v2 as cloudinary } from "cloudinary"

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body
    // console.log(fullname, email, phoneNumber, password, role)
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false })
    }
    cloudinary.config({
      cloud_name: "dewir43rd",
      api_key: "688825536517274",
      api_secret: "SGNeyF0yQsD2AEXsarcHsGtUlFA",
    })
    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri)
    
    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log("hi1")
    // console.log(fullname, email, phoneNumber, password, role)
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    })

    console.log("hi2")
    return res
      .status(201)
      .json({ message: "User registered successfully", success: true })
  } catch (error) {
    console.error("Registration Error:", error) // ✅ Logs full error to backend console
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false })
    }
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false })
    }
    // return res.status(200).json({ message: "Login success", success: true })
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current roles",
        success: false,
      })
    }
    const tokenData = {
      userId: user._id,
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    })

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Loggedout successfully", success: true })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}

// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body
//     const file = req.file
//     console.log(req.file)
//     const fileUri = getDataUri(file)
//     console.log(fileUri)
//     const cloudResponse = await cloudinary.uploader.upload(fileUri)
//     console.log(cloudResponse)
//     console.log("hi2")
//     console.log("Cloudinary Upload Response:", cloudResponse)
//     console.log("File received:", req.file)
//     console.log("File URI:", getDataUri(req.file))

//     // console.log(req.body)
//     //cloudinary upload
//     let skillsArray
//     if (skills) {
//       skillsArray = skills.split(",")
//     }
//     const userId = req.id //middleware authentication
//     let user = await User.findById(userId)

//     if (!user) {
//       return res.status(400).json({ message: "User not found", success: false })
//     }
//     //updating data
//     if (fullname) user.fullname = fullname
//     if (email) user.email = email
//     if (phoneNumber) user.phoneNumber = phoneNumber
//     if (bio) user.profile.bio = bio
//     if (skills) user.profile.skills = skillsArray
//     //resume and profile photo will be updated later
//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url //save the cloudinary url
//       user.profile.resumeOriginalName = file.originalname //save the origianl file name
//     }
//     await user.save()
//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     }
//     return res
//       .status(200)
//       .json({ message: "Profile updated successfully", user, success: true })
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Something went wrong", success: false })
//   }
// }

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body
    const file = req.file

    let resumeUrl = null
    let resumeOriginalName = null

    if (file) {
      try {
        cloudinary.config({
          cloud_name: "dewir43rd",
          api_key: "688825536517274",
          api_secret: "SGNeyF0yQsD2AEXsarcHsGtUlFA",
        })
        const fileUri = getDataUri(file) // Convert file to data URI
        const cloudResponse = await cloudinary.uploader.upload(fileUri, {
          resource_type: "auto", // Automatically detect file type
        })

        resumeUrl = cloudResponse.secure_url
        console.log(resumeUrl)
        resumeOriginalName = file.originalname
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError)
        return res
          .status(500)
          .json({ message: "File upload failed", success: false })
      }
    }

    const userId = req.id // Middleware authentication
    let user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false })
    }

    // Updating user profile data
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skills.split(",")

    // If a file was uploaded, update resume details
    if (resumeUrl) {
      user.profile.resume = resumeUrl
      user.profile.resumeOriginalName = resumeOriginalName
    }

    await user.save()

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
        resume:user.profile.resume
      },
      success: true,
    })
  } catch (error) {
    console.error("Update Profile Error:", error)
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false })
  }
}
