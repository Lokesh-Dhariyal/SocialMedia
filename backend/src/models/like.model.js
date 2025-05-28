import mongoose, { mongo, Schema } from "mongoose";

const likeSchema = new Schema({
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Like = mongoose.model("Like",likeSchema);