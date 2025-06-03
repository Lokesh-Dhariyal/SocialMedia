import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Follower } from "../models/followers.model.js";
import {User} from "../models/user.model.js"

//⁡⁢⁢⁢𝗙𝗼𝗹𝗹𝗼𝘄 𝗮𝗻𝗱 𝗨𝗻𝗳𝗼𝗹𝗹𝗼𝘄⁡
const followUnfollow = asyncHandler(async (req, res) => {
  const toUser = await User.findById(req.params.id);
  if (!toUser) {
    throw new apiError(400, "The user dont exist");
  }
  const fromUser = req.user;

  if (toUser._id.toString() === fromUser._id.toString()) {
    throw new apiError(400, "You cant follow yourself");
  }

  const alreadyFollowed = await Follower.findOne({
    user: fromUser._id,
    followedTo: toUser._id,
  });

  if (!alreadyFollowed) {
    await Follower.create({ user: fromUser._id, followedTo: toUser._id });

    await User.findByIdAndUpdate(toUser._id, {
      $addToSet: { followers: fromUser._id },
      $inc: { followerCount: 1 },
    });

    const updatedUser = await User.findByIdAndUpdate(
      fromUser._id,
      {
        $addToSet: { following: toUser._id },
        $inc: { followingCount: 1 },
      },
      { new: true }
    );

    const newtoUser = await User.findById(toUser._id)

    return res
      .status(200)
      .json(new apiResponse(200, { following: true, UserId:updatedUser._id, FollowedTo:toUser._id, followers:newtoUser.followerCount},"You Followed"));
  }
  if (alreadyFollowed) {
    await Follower.deleteOne({ user: fromUser._id, followedTo: toUser._id });

    await User.findByIdAndUpdate(toUser._id, {
      $pull: { followers: fromUser._id },
      $inc: { followerCount: -1 },
    });

    const updatedUser = await User.findByIdAndUpdate(
        fromUser._id,
      {
        $pull: { following: toUser._id },
        $inc: { followingCount: -1 },
      },
      { new: true }
    );
    const newtoUser = await User.findById(toUser._id);

    return res
      .status(200)
      .json(new apiResponse(200, { following: false, UserId:updatedUser._id, FollowedTo:toUser._id,followers:newtoUser.followerCount },"You Unfollowed")
      );
  }
});

export { followUnfollow };