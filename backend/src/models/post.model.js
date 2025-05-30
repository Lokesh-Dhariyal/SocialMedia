import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    discription: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post",postSchema);