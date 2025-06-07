import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateToken,
  changePassword,
  updateProfilePhoto,
  updateUserInfo,
  deleteProfilePhoto,
  currentUser,
  userInfo,
  searchUser,
  getPostsByUser,
  deleteUser
} from "../controllers/user.controller.js";
import {jwtVerification} from "../middlewares/auth.middleware.js"
import { followUnfollow } from "../controllers/followers.controller.js";
import { allPosts } from "../controllers/post.controller.js";
const userRoute = Router()

userRoute.route("/register").post(registerUser)
userRoute.route("/login").post(loginUser)
userRoute.route("/logout").post(jwtVerification,logoutUser)
userRoute.route("/update-token").post(updateToken);
userRoute.route("/change-password").post(jwtVerification,changePassword)
userRoute.route("/update-profilephoto").post(
  jwtVerification,
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },
  ]),
  updateProfilePhoto
);
userRoute.route("/update-userinfo").post(jwtVerification, updateUserInfo);
userRoute.route("/delete-profilephoto").post(jwtVerification,deleteProfilePhoto)
userRoute.route("/me").get(jwtVerification, currentUser);
userRoute.route("/profile/:id").get(userInfo)
//⁡⁢⁢⁢𝗙𝗼𝗹𝗹𝗼𝘄 𝗨𝗻𝗳𝗼𝗹𝗹𝗼𝘄⁡
userRoute.route("/profile/:id/follow").post(jwtVerification,followUnfollow);

//⁡⁢⁢⁢𝗛𝗼𝗺𝗲 𝗣𝗮𝗴𝗲⁡
userRoute.route("/home").get(jwtVerification,allPosts)
//⁡⁢⁢⁢𝗦𝗲𝗮𝗿𝗰𝗵 𝗨𝘀𝗲𝗿⁡
userRoute.route("/search").post(searchUser)
//User post
userRoute.route("/:id/posts").get(getPostsByUser)

//Delete User
userRoute.route("/delete-user").post(jwtVerification,deleteUser);
export { userRoute }; 