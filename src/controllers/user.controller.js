import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary, uploadToCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res) =>{
  //get user details from frontend 
  // validation - !empty
  // check if user already exists: username and email
  // check for images  , avatar
  //upload avatar to cloudinary
  // create user object  - create entry in db
  // remove password and refresh token field from response
  // check for user creation 
  //return res



  const{username,fullname,email,password} = req.body
  console.log("Email",email);

  if(fullname === "" || email === "" || username === "" || password === ""){
    throw new ApiError(400,"All fields are required");
  }

  const existedUser = await User.findOne({
    $or:[
      { email },{ username }]
  })

  if(existedUser){
    throw new ApiError(409,"User already exists with this email or username");
  }


  const avatarLocalPAth = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPAth){
    throw new ApiError(400,"Avatar file is required");
  }


  const avatar = await uploadOnCloudinary(avatarLocalPAth);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(500,"Error uploading images to cloudinary");
  }

  const user = await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500,"Error creating user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully");
  )
})


export {registerUser};