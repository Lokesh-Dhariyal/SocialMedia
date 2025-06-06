import { userAuth } from "../hooks/userAuth"
import { postAuth } from "../hooks/postAuth"
import { useState } from "react"
export function CommentLayout({content,profilePhoto,username,userId,postId,postUser,commnetId,setComments,setTotalComments}) {

  const {user} = userAuth()
  const {deleteComment} = postAuth()
  
  const [deleting,setDeleting] = useState(false)

  const commentDelete = async()=>{
      setDeleting(true)
      const res = await deleteComment(postId,commnetId)
      setComments(res.data.commentCount)
      setTotalComments(res.data.comments)
      setDeleting(false)
    }

  if(!user){
    return <div>...</div>
  }

  return (
    <div className='border-b border-white/30 h-fit pb-1 text-white flex mb-5'>
        <div className='flex w-auto h-fit'>
            <a href={`/user/${userId}`}><img src={profilePhoto} alt="" className='h-10 w-10 rounded-full'/></a>
        </div>
        <div className='h-fit w-4/5 mx-3'>
            <a href={`/user/${userId}`} className='font-bold'>{username}</a>
            <div>{content}</div>
        </div>


        <button
  onClick={commentDelete}
  disabled={deleting}
  hidden={!(postUser === user._id || userId === user._id)}
  className="text-red-600 hover:text-red-800 disabled:text-red-300 disabled:cursor-not-allowed bg-transparent border-none p-1 rounded"
  type="button"
  aria-label="Delete comment"
  title="Delete comment"
>
  {deleting ? (
    "... ."
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
      />
    </svg>
  )}
</button>




    </div>
  )
}
