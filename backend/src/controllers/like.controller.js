import { Like } from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import {asyncHandler} from "../utils/asyncHandler.util.js"

//⁡⁢⁢⁢𝗟𝗶𝗸𝗲 𝗨𝗻𝗹𝗶𝗸𝗲 𝗣𝗼𝘀𝘁⁡
const likeUnlikePost = asyncHandler(async(req,res)=>{
    const postId = req.params.id
    const user = req.user

    const post = await Post.findById(postId);
    if (!post) {
        throw new apiError(404, "Post not found");
    }

    const alreadyLiked = await Like.findOne({
      post: postId,
      likedBy: user._id,
    })

    if (alreadyLiked) {
      // remove like
      await Like.deleteOne({ post: postId, likedBy: user._id });
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: user._id },
          $inc: { likeCount: -1 },
        },
        { new: true }
      );
      return res
      .status(200)
      .json(new apiResponse(200,{liked:false,likeCount:updatedPost.likeCount},"Unliked"));
    } else {
      // create like
      await Like.create({ post: postId, likedBy: user._id });
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $addToSet: { likes: user._id },
          $inc: { likeCount: 1 },
        },
        { new: true }
      );
      return res
      .status(200)
      .json(new apiResponse(200,{liked:true,likeCount:updatedPost.likeCount,postId:updatedPost._id},"Liked"));
    }
})

export { likeUnlikePost };