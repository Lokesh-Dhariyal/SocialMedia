import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateToken,
  changePassword,
  updateProfile,
  deleteProfilePhoto,
  deleteCover,
  currentUser,
} from "../controllers/user.controller.js";
import {jwtVerification} from "../middlewares/auth.middleware.js"
import { followUnfollow } from "../controllers/followers.controller.js";
const userRoute = Router()

userRoute.route("/register").post(registerUser)
userRoute.route("/login").post(loginUser)
userRoute.route("/logout").post(jwtVerification,logoutUser)
userRoute.route("/update-token").post(updateToken)
userRoute.route("/change-password").post(jwtVerification,changePassword)
userRoute.route("/update-profile").post(jwtVerification,
  upload.fields([
      {
        name: "profilePhoto",
        maxCount: 1,
      },
      {
        name: "cover",
        maxCount: 1,
      }
    ]),updateProfile)
userRoute.route("/delete-profilephoto").post(jwtVerification,deleteProfilePhoto)
userRoute.route("/delete-cover").post(jwtVerification,deleteCover)
userRoute.route("/current-user").post(jwtVerification,currentUser)

//⁡⁢⁢⁢𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝗻𝗳𝗼𝗹𝗹𝗼𝘄⁡
userRoute.route("/:id").post(jwtVerification,followUnfollow);
export { userRoute }; 