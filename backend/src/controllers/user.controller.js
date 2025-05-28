import {hashingPassword,isPasswordCorrect,generateAccessToken,generateRefreshToken} from "../services/user.service.js"
import {apiError} from '../utils/apiError.util.js'
import {apiResponse} from '../utils/apiResponse.util.js'
import {asyncHandler} from '../utils/asyncHandler.util.js'
import { uploadToCloudinary } from "../utils/cloudinary.util.js";
import {User} from "../models/user.model.js"


const generateAccessAndRefreshTokens = async (userId)=>{
  try {
    const user = await User.findById(userId)
    if(!user){
      throw new apiError(400,"User not found")
    }
    const accessToken = generateAccessToken();
    const refreshToken = generateRefreshToken();

    user.refreshToken = refreshToken
    user.save({validateBeforeSave:false})

    return {refreshToken,accessToken}
  } catch (error) {
    throw new apiError(400,"Something went wrong while creating tokens")
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

  const exitedUsername = await User.findOne({username});
  if (exitedUsername) {
    throw new apiError(400, "Username alredy exist");
  }
  const exitedEmail = await User.findOne({email});
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
    profilePicture:"https://res.cloudinary.com/dhzxvjygz/image/upload/v1747562532/userImage_bwcuxg.png",
    cover:"",
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
    .json(new apiResponse(200,createdUser/*object*/,"User registered Successfully"))
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
  const {refreshToken,accessToken} = generateAccessAndRefreshTokens(user._id);

  const logginedUser = await User.findById(user._id).select("-password -refreshToken")

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new apiResponse(200,logginedUser,"User loggined successfully"))
})

//⁡⁢⁢⁢Logout User⁡
const logoutUser = asyncHandler(async (req,res)=>{
  
})
export {registerUser,loginUser}