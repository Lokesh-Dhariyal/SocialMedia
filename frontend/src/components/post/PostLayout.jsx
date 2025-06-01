import { useState } from "react"
import { LikeButton } from "../buttons/LikeButton"
import { SubmitButton } from "../buttons/SubmitButton"
import {postAuth} from "../../hooks/postAuth"
import { userAuth } from "../../hooks/userAuth"
export function PostLayout({username,postId,likedBy,content,description,likesCount,commentCount,createdAt}) {

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0') 
        const year = String(date.getFullYear()).slice(-2) 
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
      
        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    const [likes, setLikes] = useState(likesCount);
    const {likePost} = postAuth()

    const {user} = userAuth()
    const [isLiked, setIsLiked] = useState(likedBy.includes(user._id));

    const toggleLike = async () => {
        try {
          const response = await likePost(postId);
          console.log(response)
          setIsLiked(response.data.liked);
          setLikes(response.data.likeCount);
        } catch (error) {
          console.error("Error toggling like:", error);
        }
      };

    const[postComment,setPostComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const toggleComment = () => {
        setPostComment(prev => !prev)
      }

    // const {commentOnPost} = postAuth()
    const handelSubmit= async(e)=>{
        e.preventDefault()
        // await commentOnPost(postId)
        setCommentText("")
    }

  return (
    <div className=" w-11/17 mx-auto h-fit p-2 my-5 text-white">
        <div className=" h-10  p-1 text-lg flex">
            <div className="">{username}</div>
        </div>

        <div className="border border-white/30 h-120">
            <img src={content} alt="" className="w-full h-full" />
        </div>

        <div className="mt-2 text-sm">{formatDate(createdAt)}</div>

        <div className=" h-fit mt-2">{description}</div>

        <div className="flex ">
            <LikeButton postId={postId} isLiked={isLiked} onLikeChange={toggleLike}/>
            <div className="pt-3">{likes}</div>

            <button onClick={toggleComment} className="h-8 mx-3 mt-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 text-white/60 hover:text-white/90"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                    strokeWidth={1.8}
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m-4 4h10M5 5a2 2 0 00-2 2v12l4-4h10a2 2 0 002-2V7a2 2 0 00-2-2H5z"
                    />
                </svg>
            </button>

            <div className="pt-3">{commentCount}</div>
        </div>

        <form onSubmit={handelSubmit} className="mt-3">
            <input type="text" 
                value={commentText}
                className="w-1/2 pr-12 pl-3 py-2 text-gray-300 outline-none border focus:border-gray-100 shadow-sm rounded-lg"
                hidden={!postComment}
                onChange={(e) => setCommentText(e.target.value)}
            />
            <button hidden={!postComment} type="submit" className="mx-3 py-2 px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] hover:cursor-pointer rounded-md shadow inline">
                Comment
            </button>
        </form>
    </div>
  )
}
