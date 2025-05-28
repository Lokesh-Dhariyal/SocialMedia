import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    aboutPost:{
        type:String
    },
    content:{
        type:String,
        require:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Post = mongoose.model("Post",postSchema);