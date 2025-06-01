import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost,updatePost,deletePost,getPost } from "../controllers/post.controller.js";
import { jwtVerification } from "../middlewares/auth.middleware.js";
import { likeUnlikePost } from "../controllers/like.controller.js";
import { deleteComment, updateComment, writeComment } from "../controllers/comment.controller.js";
const postRoute = Router()

postRoute.route("/create-post").post(
    jwtVerification,
    upload.fields(
        [{ name: "content", maxCount: 1 }]
    ),
    createPost
)
postRoute.route("/update-post/:id").post(jwtVerification,updatePost);
postRoute.route("/delete-post/:id").post(jwtVerification,deletePost)

postRoute.route("/:id/like").post(jwtVerification,likeUnlikePost);

postRoute.route("/:id/comment").post(jwtVerification,writeComment);
postRoute.route("/:postId/update-comment/:commentId").post(jwtVerification,updateComment);
postRoute.route("/:postId/delete-comment/:commentId").post(jwtVerification,deleteComment);

postRoute.route("/:id").get(getPost)
export {postRoute}