import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";

//⁡⁢⁢⁢𝗖𝗼𝗺𝗺𝗲𝗻𝘁 𝗼𝗻 𝗮 𝗽𝗼𝘀𝘁⁡
const writeComment = asyncHandler(async(req,res)=>{
    const { content } = req.body;
    const postId = req.params.id
    const userId = req.user._id

    const comment = await Comment.create({
        content:content,
        post:postId,
        commentedBy:userId,
    })
    if(!comment){
        throw new apiError(400,"Something went wrong while commenting")
    }

    const post = await Post.findByIdAndUpdate(postId, {
        $addToSet: { comments: comment._id },
        $inc: { commentCount: 1 },
        },
        {new:true}
    );

    if(!post){
        throw new apiError(400,"no post available")
    }

    return res
    .status(200)
    .json(new apiResponse(200,{commentId:comment.id,commentCount:post.commentCount},"Commented Successfully"))
})

//⁡⁢⁢⁢⁡⁢⁢⁢𝗨𝗽𝗱𝗮𝘁𝗲⁡⁢⁢⁢ 𝗖𝗼𝗺𝗺𝗲𝗻𝘁⁡
const updateComment = asyncHandler(async(req,res)=>{
    const {content} = req.body
    const user = req.user
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new apiError(400, "Comment not found");
    }

    if(user._id.toString()!==comment.commentedBy.toString()){
        throw new apiError(400,"You cant update this comment")
    }

    comment.content = content;
    const updatedComment = await comment.save();

    return res
    .status(200)
    .json(new apiResponse(200,updatedComment,"Comment successfully updated"))
})

//⁡⁢⁢⁢𝗗𝗲𝗹𝗲𝘁𝗲 𝗖𝗼𝗺𝗺𝗲𝗻𝘁⁡
const deleteComment = asyncHandler(async(req,res)=>{
    const comment = await Comment.findById(req.params.commentId)
    if(!comment){
        throw new apiError(400,"Comment do not exist")
    }
    const post =  await Post.findById(req.params.postId)
    if (!post) {
      throw new apiError(400, "Post do not exist");
    }
    const userId = req.user._id

    if(userId.toString() !== comment.commentedBy.toString() && userId.toString() !== post.owner.toString()){
        throw new  apiError(400,"You Cant delete this comment")
    }

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
      $inc: { commentCount: -1 },
    });
    await comment.deleteOne()

    return res
    .status(200)
    .json(new apiResponse(200,{fromPost:post._id},"Comment successfully deleted from the post"))
})


export {writeComment,deleteComment,updateComment}