import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";
const userRoute = Router()


userRoute.route("/register").post(
  upload.fields([
    // {
    //   name: "avatar",
    //   maxCount: 1,
    // },
    {
      name: "cover",
      maxCount: 1,
    }
  ]),registerUser
);

userRoute.route("/login").post(loginUser)

export { userRoute };