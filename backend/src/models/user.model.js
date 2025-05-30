import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true, // this optimize searching easy in database
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    bio: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    posts:[
      {
        type:Schema.Types.ObjectId,
        ref:"Post"
      }
    ],
    postCount:{
      type:Number,
      default:0
    },
    followers:[
      {
        type:Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    followerCount:{
      type:Number,
      default:0
    },
    following:[
      {
        type:Schema.Types.ObjectId,
        ref:"User"
      }
    ],
    followingCount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
); 

export const User = mongoose.model("User",userSchema);