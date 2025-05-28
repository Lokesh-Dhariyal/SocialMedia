import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import {jwtVerification} from "../middlewares/auth.middleware.js"
const userRoute = Router()


userRoute.route("/register").post(
  registerUser
  // upload.fields([
  //   // {
  //   //   name: "avatar",
  //   //   maxCount: 1,
  //   // },
  //   // {
  //   //   name: "cover",
  //   //   maxCount: 1,
  //   // }
  // ]),
);

userRoute.route("/login").post(loginUser)
userRoute.route("/logout").post(jwtVerification,logoutUser)

export { userRoute };