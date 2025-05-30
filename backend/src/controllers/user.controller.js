import {hashingPassword,isPasswordCorrect,generateAccessToken,generateRefreshToken} from "../services/user.service.js"
import {apiError} from '../utils/apiError.util.js'
import {apiResponse} from '../utils/apiResponse.util.js'
import {asyncHandler} from '../utils/asyncHandler.util.js'
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.util.js";
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId)=>{
  try {
    const user = await User.findById(userId)
    if(!user){
      throw new apiError(400,"User not found")
    }
    const accessToken =await generateAccessToken(userId);
    const refreshToken =await generateRefreshToken(userId);

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})

    return {refreshToken,accessToken}
  } catch (error) {
    throw new apiError(500,"Something went wrong while creating tokens")
  }
}

const options = {
  // to make it more secure
  httpOnly: true,
  secure: true,
};

//⁡⁣⁣⁢⁡⁢⁢⁢𝗥𝗲𝗴𝗶𝘀𝘁𝗲𝗿 𝗨𝘀𝗲𝗿⁡(avatar will be added in the update user section as it is not needed while registration)
const registerUser = asyncHandler(async(req,res)=>{
  const { username, email, password, fullName } = req.body;

  // if(!username || !email || !password){
  //     return apiError(400,"All fields are required")
  // }

  if (
    [fullName, username, email, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new apiError(400, "All fields are required");
  }

  const exitedUsername = await User.findOne({ username });
  if (exitedUsername) {
    throw new apiError(400, "Username alredy exist");
  }
  const exitedEmail = await User.findOne({ email });
  if (exitedEmail) {
    throw new apiError(400, "Email already exist");
  }
  //Checking if cloudinary is working
  // let coverLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.cover) &&
  //   req.files.cover.length > 0
  // ) {
  //   coverLocalPath = req.files.cover[0].path;
  // }
  // const uploadedCover = await uploadToCloudinary(coverLocalPath);

  //hash password
  const hashedPassword = await hashingPassword(password);
  const user = await User.create({
    username: username.toLowerCase(),
    fullName,
    email: email.toLowerCase(),
    password: hashedPassword,
    profilePhoto:"https://res.cloudinary.com/dhzxvjygz/image/upload/v1748512530/userImage_abfe44.png",
    cover:""
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  //OR
  /*return res.json( user: {
        id: createdUser._id,
        username: createdUser.username,
        fullName: createdUser.fullName,
        email: createdUser.email,
        avatar: createdUser.cover || null
      },) */

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        createdUser /*object*/,
        "User registered Successfully"
      )
    );
})

//⁡⁢⁢⁡⁢⁣⁡⁣⁣⁢⁡⁢⁢⁢𝗟𝗼𝗴𝗶𝗻 𝗨𝘀𝗲𝗿⁡
const loginUser = asyncHandler(async (req,res)=>{
  const {credentials,password} = req.body

  if ([credentials, password].some((field) => !field || field.trim() === "")) {
    throw new apiError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ username: credentials }, { email: credentials }],
  });

  if(!user){
    throw new apiError(400,"User does not exist")
  }

  const checkedPassword = await isPasswordCorrect(password,user.password);
  if (!checkedPassword) {
    throw new apiError(400, "Invalid Credentials");
  }
  //generate tokens
  const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(
    user._id,
    user.username
  );

  const logginedUser = await User.findById(user._id).select("-password -refreshToken")

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
        user: logginedUser,accessToken,refreshToken
        },
        "User logged In successfully"
      )
    );
})

//⁡⁢⁢⁢𝗟𝗼𝗴𝗼𝘂𝘁 𝗨𝘀𝗲𝗿⁡
const logoutUser = asyncHandler(async (req,res)=>{
  const user = req.user
  await User.findByIdAndUpdate(
    user._id,
    {
      $unset: {refreshToken : ""}
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logout successfully"));
})

//⁡⁢⁢⁢𝗨𝗽𝗱𝗮𝘁𝗲 𝗧𝗼𝗸𝗲𝗻𝘀 𝗪𝗵𝗲𝗻 𝗼𝗽𝗲𝗻𝗶𝗻𝗴 𝘁𝗵𝗲 𝗮𝗽𝗽⁡
const updateToken = asyncHandler(async(req,res)=>{
  const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken){
    throw new apiError(400,"Invalid loggin attempt")
  }

  try {
    const verifiedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    
    const user = await User.findById(verifiedToken?._id)
    if(!user){
      throw new apiError(400,"Invalid Token")
    }
  
    if(incomingRefreshToken!=user.refreshToken){
      throw new apiError(400,"Refresh Token has been expired")
    }
  
    const{updatedAccessToken,updatedRefreshToken} = generateAccessAndRefreshTokens(user._id)
  
    return res
    .status(200)
    .cookie("accessToken",updatedAccessToken,options)
    .cookie("refreshToken",updatedRefreshToken,options)
    .json(new apiResponse(200,{refreshToken:updatedRefreshToken,accessToken:updatedAccessToken},"Token is refreshed and updated"))
  } catch (error) {
    throw new apiError(400,"Something went wrong while updating tokens")
  }
})

//⁡⁢⁢⁢𝗖𝗵𝗮𝗻𝗴𝗲 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱⁡
const changePassword = asyncHandler(async(req,res)=>{
  const {newPassword,previousPassword} = req.body

  if(newPassword === previousPassword){
    throw new apiError(400,"Password cant be same")
  }

  const user = await User.findById(req.user._id) // to get the password too
  if(!user){
    throw new apiError(400,"User does not exist")
  }
  const checkPassword = await isPasswordCorrect(previousPassword,user.password)
  if(!checkPassword){
    throw new apiError(400,"Invalid password")
  }

  const updatedpassword = await hashingPassword(newPassword)

  user.password = updatedpassword;
  await user.save({validateBeforeSave:false})

  const updatedUser = await User.findById(user._id).select("-password -refreshToken")

  return res
  .status(200)
  .json(new apiResponse(200,updatedUser,"Password changed successfully"))
})

//⁡⁢⁢⁢𝗨𝗽𝗱𝗮𝘁𝗲 𝗣𝗿𝗼𝗳𝗶𝗹𝗲⁡
const updateProfile = asyncHandler(async(req,res)=>{
  const { fullName, email, bio } = req.body
  //front end will handle that these field will be filled with the already exited ones, still
  if (
    ![fullName, email].every(
      (field) => typeof field === "string" && field.trim() !== ""
    )
  ) {
    throw new apiError(400, "Full name and email are required.");
  }

  let profilePhotoLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profilePhoto) &&
    req.files.profilePhoto.length > 0
  ) {
    profilePhotoLocalPath = req.files.profilePhoto[0].path;
  }
  const profilePhoto = await uploadToCloudinary(profilePhotoLocalPath);

  let coverLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.cover) &&
    req.files.cover.length > 0
  ) {
    coverLocalPath = req.files.cover[0].path;
  }
    const cover = await uploadToCloudinary(coverLocalPath);
 
  //delete previous profilephoto and cover
    const photoInfoUser = await User.findById(req.user._id)
    if (photoInfoUser.cover !=="") {
      deleteFromCloudinary(photoInfoUser.cover);
    }
    if (photoInfoUser.profilePhoto !=="https://res.cloudinary.com/dhzxvjygz/image/upload/v1748512530/userImage_abfe44.png"){
      deleteFromCloudinary(photoInfoUser.profilePhoto); 
    }
  //not holding this in try catch as it does not matter, just to make the cloud storage cleaner

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        email,
        profilePhoto:
          profilePhoto?.url ||"https://res.cloudinary.com/dhzxvjygz/image/upload/v1748512530/userImage_abfe44.png",
        cover: cover?.url || "",
        bio: bio || "",
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  if(!user){
    throw new apiError(400,"Something went wrong while updating the user profile")
  }
    
    return res
    .status(200)
    .json(new apiResponse(200,user,"User's Profile updated successfully"))
})

//⁡⁢⁢⁢𝗗𝗲𝗹𝗲𝘁𝗲 𝗽𝗿𝗼𝗳𝗶𝗹𝗲 𝗣⁡⁢⁢⁢𝗵𝗼𝘁𝗼⁡
const deleteProfilePhoto = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.user)
  if (user.profilePhoto =="https://res.cloudinary.com/dhzxvjygz/image/upload/v1748512530/userImage_abfe44.png") {
    throw new apiError(400, "There is nothing to delete");
  }
  const result = await deleteFromCloudinary(user.profilePhoto)

  if (result.result === "not found") {
    throw new apiError(400,"Image not found")
  }
  if(result.result !== "ok"){
    throw new apiError(400,"Something went wrong while deleting profile picture")
  }
  user.profilePhoto ="https://res.cloudinary.com/dhzxvjygz/image/upload/v1748512530/userImage_abfe44.png";
  await user.save({validateBeforeSave:false})

  return res
  .status(200)
  .json(new apiResponse(200,{},"Profile Photo deleted successfully"))
})

//⁡⁢⁢⁢𝗗𝗲𝗹𝗲𝘁𝗲 𝗰𝗼𝘃𝗲𝗿⁡
const deleteCover = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if(user.cover === ""){
    throw new apiError(400,"There is nothing to delete")
  }
  const result = await deleteFromCloudinary(user.cover);

  if (result.result === "not found") {
    throw new apiError(400, "Image not found");
  }
  if (result.result !== "ok") {
    throw new apiError(
      400,
      "Something went wrong while deleting profile picture"
    );
  }

  await User.findByIdAndUpdate(user._id,
    {
      $set: {cover:""}
    },
    {
      new:true,
    }
  )
  return res
    .status(200)
    .json(new apiResponse(200, {}, "cover picture deleted successfully"));
});

//⁡⁢⁢⁢𝗖𝘂𝗿𝗿𝗲𝗻𝘁 𝗨𝘀𝗲𝗿 𝗶𝗻𝗳𝗼⁡
const currentUser = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(new apiResponse(200,req.user,"Current User fetched successfully"))
})
export {
  registerUser,
  loginUser,
  logoutUser,
  updateToken,
  changePassword,
  updateProfile,
  deleteProfilePhoto,
  deleteCover,
  currentUser,
};