import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

//creating encrypted passwod
const hashingPassword = async (password)=>{
  if (!password) throw new Error("Password needs to be encrypted");
  const encryptedPassword = await bcrypt.hash(password, 10); //10 is how many times bcrypt internally re-processes the data

  return encryptedPassword;
}

//checking if password is correct
const isPasswordCorrect = async (password,userPassword)=>{
  return await bcrypt.compare(password, userPassword);
}

//Generating Access token
const generateAccessToken =async(userId)=>{
  const user = await User.findById(userId)
  if (!user) throw new Error("User not found");
    return jwt.sign(
      {
        _id: user._id,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      }
    );
}

//Generating Refresh Token
const generateRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );
};

export {hashingPassword,isPasswordCorrect,generateAccessToken,generateRefreshToken}