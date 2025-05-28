import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import { apiError } from "../utils/apiError.util.js"
import {User} from "../models/user.model.js"

const jwtVerification = asyncHandler(async(req,_,next)=>{
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!accessToken){
            throw new apiError(400,"Invalid Token")
        }
    
        const checkedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)//gives the parameter that is passed
        
        const user = await User.findById(checkedToken._id).select("-password -refreshToken")
        if(!user){
            throw new apiError(400,"Invalid Access Token")
        }
        req.user = user
        next()
    } catch (error) {
        throw new apiError(400, `Token verification failed: ${error.message}`);
    }
})

export {jwtVerification}