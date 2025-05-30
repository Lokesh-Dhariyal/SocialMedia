import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Post } from "../models/post.model.js";
import { uploadToCloudinary,deleteFromCloudinary } from "../utils/cloudinary.util.js";
import { User } from "../models/user.model.js";

//⁡⁢⁢⁢𝗖𝗿𝗲𝗮𝘁𝗲 𝗣𝗼𝘀𝘁⁡
const createPost = asyncHandler(async(req,res)=>{
    const {discription} = req.body
    const userId = req.user._id

    let postLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.content) &&
      req.files.content.length > 0
    ) {
        postLocalPath = req.files.content[0].path;
    }

    if (!postLocalPath) {
      throw new apiError(400, "No file provided for upload");
    }
      
    const postContent = await uploadToCloudinary(postLocalPath);
    if(!postContent){
        throw new apiError(400,"Uploading failed")
    }
    const post = await Post.create({
        content:postContent?.url,
        discription: discription || "",
        owner: userId,
    })
    if(!post){
        throw new apiError(400,"Something went wrong while creating post")
    }

    //⁡⁢⁣⁣Update the posts for the user too⁡
    await User.findByIdAndUpdate(userId, {
      $addToSet: { posts: post._id }, // push and also avoids duplicates
      $inc: {postCount:1}
    });

    return res
    .status(200)
    .json(new apiResponse(200,post,"Post has been uploaded successfully"))
})

//⁡⁢⁢⁢𝗨𝗽𝗱𝗮𝘁𝗲 𝗣𝗼𝘀𝘁⁡
const updatePost = asyncHandler(async(req,res)=>{
    const {discription} = req.body
    const postId = req.params.id
    if (!postId) {
      throw new apiError(400, "Invalid url");
    }
    const post = await Post.findById(postId)
    if(!post){
        throw new apiError(400,"Cant find the post")
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      throw new apiError(400, "You're not allowed to update this post");
    }
    post.discription = discription;
    await post.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new apiResponse(200,post,"post updated Successfully"))
})

//⁡⁢⁢⁢𝗗𝗲𝗹𝗲𝘁𝗲 𝗣𝗼𝘀𝘁⁡
const deletePost = asyncHandler(async(req,res)=>{
    const postId = req.params.id
    if(!postId){
        throw new apiError(400,"Invalid url")
    }
    const post = await Post.findById(postId)
    if(!post){
        throw new apiError(400,"Cant find the post")
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      throw new apiError(400, "You're not allowed to delete this post");
    }

    await deleteFromCloudinary(post.content)
    //Delete postId from user too
    await User.findByIdAndUpdate(post.owner, {
      $pull: { posts: post._id },
      $inc:{postCount:-1}
    });
    await post.deleteOne();

    return res
    .status(200)
    .json(new apiResponse(200,{},"Post deleted Successfully"))
})
export {createPost,updatePost,deletePost}