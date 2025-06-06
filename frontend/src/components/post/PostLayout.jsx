import { useState } from "react";
import { LikeButton } from "../buttons/LikeButton";
import { postAuth } from "../../hooks/postAuth";
import { userAuth } from "../../hooks/userAuth";
import { PostSetting } from "../buttons/PostSetting";
import { motion, AnimatePresence } from "framer-motion";
import { CommentLayout } from "../CommentLayout";
import { LoadingPage } from "../../pages/Loading.page";

export function PostLayout({
  username,
  postId,
  likedBy,
  content,
  description,
  likesCount,
  Allcomments,
  commentCount,
  createdAt,
  setting,
  userId,
  profilePhoto
}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const [likes, setLikes] = useState(likesCount);
  const { likePost, commentOnPost } = postAuth();
  const { user } = userAuth();

  const [isLiked, setIsLiked] = useState(likedBy.includes(user._id));
  const toggleLike = async () => {
    try {
      const response = await likePost(postId);
      setIsLiked(response.data.liked);
      setLikes(response.data.likeCount);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const [postComment, setPostComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState(commentCount);
  const [totalComments, setTotalComments] = useState(Allcomments);

  const toggleComment = () => setPostComment(prev => !prev);

  const handelComment = async (e) => {
    e.preventDefault();
    setCommenting(true);
    const res = await commentOnPost(postId, { content: commentText });
    setComments(res.data.commentCount);
    setTotalComments(res.data.comments);
    setCommentText("");
    setCommenting(false);
  };

  if (!user) return <LoadingPage />;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full lg:w-11/17 mx-auto h-fit p-2 lg:my-5 text-white"
    >
      {/* Header */}
      <div className="p-1 text-lg flex gap-2 lg:gap-3">
        <div className='w-12 h-12'>
          <a href={`/profile/${userId}`}>
            <img src={profilePhoto} alt="img" className='rounded-full lg:w-full w-11 h-11 lg:h-full' />
          </a>
        </div>
        <div className="pt-3 w-5/8 lg:w-5/6 font-bold">
          <a href={`/profile/${userId}`}>{username}</a>
        </div>
        {setting && (
          <div className="pt-1">
            <PostSetting postId={postId} />
          </div>
        )}
      </div>

      {/* Post Image */}
      <div className="border border-white/30 h-fit w-fit">
        <img src={content} alt="" className="w-full h-full" />
      </div>

      {/* Date + Description */}
      <div className="mt-2 text-xs lg:text-sm">{formatDate(createdAt)}</div>
      <div className="h-fit mt-2">{description}</div>

      {/* Like & Comment Buttons */}
      <div className="flex">
        <LikeButton postId={postId} isLiked={isLiked} onLikeChange={toggleLike} />
        <div className="pt-3">{likes}</div>

        <button onClick={toggleComment} className="h-8 mx-3 mt-1 hover:cursor-pointer">
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

        <div className="pt-3">{comments}</div>
      </div>

      {/* Animate Comment Section */}
      <AnimatePresence>
        {postComment && (
          <motion.div
            key="comments-section"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            {comments === 0 ? (
              <div className="h-fit text-white lg:text-2xl mb-3">No Comments</div>
            ) : (
              <div className="max-h-56 overflow-y-auto pr-2">
                {totalComments.map((cmnt, index) => (
                  <CommentLayout
                    key={cmnt._id || index}
                    content={cmnt.content}
                    username={cmnt.commentedBy.username}
                    userId={cmnt.commentedBy._id}
                    profilePhoto={cmnt.commentedBy.profilePhoto}
                    postUser={userId}
                    commnetId={cmnt._id}
                    postId={postId}
                    setComments={setComments}
                    setTotalComments={setTotalComments}
                  />
                ))}
              </div>
            )}

            {/* Comment Input Form */}
            <motion.form
              onSubmit={handelComment}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2"
            >
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-1/2 pr-12 pl-3 py-2 text-gray-300 outline-none border focus:border-gray-100 shadow-sm rounded-lg"
              />
              <button
                disabled={!commentText}
                type="submit"
                className="mx-3 py-2 px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] hover:cursor-pointer rounded-md shadow inline"
              >
                {commenting ? ". . ." : "Post"}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}




// import { useState } from "react"
// import { LikeButton } from "../buttons/LikeButton"
// import {postAuth} from "../../hooks/postAuth"
// import { userAuth } from "../../hooks/userAuth"
// import { PostSetting } from "../buttons/PostSetting"
// import { motion } from 'framer-motion'
// import { CommentLayout } from "../CommentLayout"
// import { LoadingPage } from "../../pages/Loading.page"


// export function PostLayout({username,postId,likedBy,content,description,likesCount,Allcomments,commentCount,createdAt,setting,userId,profilePhoto}) {

//     const formatDate = (dateString) => {
//         const date = new Date(dateString)
//         const day = String(date.getDate()).padStart(2, '0')
//         const month = String(date.getMonth() + 1).padStart(2, '0') 
//         const year = String(date.getFullYear()).slice(-2) 
//         const hours = String(date.getHours()).padStart(2, '0')
//         const minutes = String(date.getMinutes()).padStart(2, '0')
      
//         return `${day}/${month}/${year} ${hours}:${minutes}`
//     }

//     const [likes, setLikes, loading] = useState(likesCount);
//     const {likePost,commentOnPost} = postAuth()

//     const {user} = userAuth()
//     const [isLiked, setIsLiked] = useState(likedBy.includes(user._id));

//     const toggleLike = async () => {
//         try {
//           const response = await likePost(postId);
//           setIsLiked(response.data.liked);
//           setLikes(response.data.likeCount);
//         } catch (error) {
//           console.error("Error toggling like:", error);
//         }
//       };

//     const[postComment,setPostComment] = useState(false)//comment button
//     const [commentText, setCommentText] = useState("")//comment text
//     const toggleComment = () => {
//         setPostComment(prev => !prev)
//       }

//     // const {commentOnPost} = postAuth()
//     const [commenting,setCommenting] = useState(false) //loading if posting comment
//     const[comments,setComments] = useState(commentCount)//total comments count
//     const[totalComments,setTotalComments] = useState(Allcomments)//all comments
//     const handelComment= async(e)=>{
//         e.preventDefault()
//         setCommenting(true)
//         const res =  await commentOnPost(postId,{content:commentText})
//         setComments(res.data.commentCount)
//         setTotalComments(res.data.comments)
//         setCommentText("")
//         setCommenting(false)
//     }

//     if (loading) {
//         return <LoadingPage/>
//       }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="your-styles"
//     >
//     <div className="w-full lg:w-11/17 mx-auto h-fit p-2 lg:my-5 text-white">
//         <div className="p-1 text-lg flex gap-2 lg:gap-3">
//         <div className='w-12 h-12'>
//           <a href={`/profile/${userId}`}><img src={profilePhoto} alt="img" className='rounded-full lg:w-full w-11 h-11 lg:h-full' /></a>
//           </div>
//             <div className="pt-3 w-5/8 lg:w-5/6 font-bold"><a href={`/profile/${userId}`}>{username}</a></div>

//             <div hidden={!setting} className="pt-1"><PostSetting postId={postId}/></div>
//         </div>

//         <div className="border border-white/30 h-fit w-fit">
//             <img src={content} alt="" className="w-full h-full" />
//         </div>

//         <div className="mt-2 text-xs lg:text-sm">{formatDate(createdAt)}</div>

//         <div className=" h-fit mt-2">{description}</div>

//         <div className="flex ">
//             <LikeButton postId={postId} isLiked={isLiked} onLikeChange={toggleLike}/>
//             <div className="pt-3">{likes}</div>

//             <button onClick={toggleComment} className="h-8 mx-3 mt-1 hover:cursor-pointer">
//                 <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-9 text-white/60 hover:text-white/90"
//                     fill="none"
//                     viewBox="0 0 20 20"
//                     stroke="currentColor"
//                     strokeWidth={1.8}
//                 >
//                     <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M7 8h10M7 12h4m-4 4h10M5 5a2 2 0 00-2 2v12l4-4h10a2 2 0 002-2V7a2 2 0 00-2-2H5z"
//                     />
//                 </svg>
//             </button>

//             <div className="pt-3">{comments}</div>
//         </div>


//         <form onSubmit={handelComment} className="mt-3">
                

//           <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9 }}
//           className="your-styles"
//         >
//             {(comments==0)?(<div hidden={!postComment} className="h-fit text-white lg:text-2xl mb-3">No Comments</div>):
//             <div hidden={!postComment} className=" h-45 overflow-y-scroll ">
//               {totalComments.map((cmnt,index)=>(
//                 <CommentLayout
//                   key={cmnt.createdAt || index}
//                   content={cmnt.content}
//                   username={cmnt.commentedBy.username}
//                   userId={cmnt.commentedBy._id}
//                   profilePhoto={cmnt.commentedBy.profilePhoto}
//                   postUser={userId}
//                   commnetId={cmnt._id}
//                   postId={postId}
//                   setComments={setComments}
//                   setTotalComments={setTotalComments}
//                 />
//               ))}

//             </div>}
//             <input type="text" 
//                 value={commentText}
//                 className="w-1/2 pr-12 pl-3 py-2 text-gray-300 outline-none border focus:border-gray-100 shadow-sm rounded-lg"
//                 hidden={!postComment}
//                 onChange={(e) => setCommentText(e.target.value)}
//             />
//             <button hidden={!postComment} disabled={!commentText} type="submit" className="mx-3 py-2 px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] hover:cursor-pointer rounded-md shadow inline">
//                 {commenting?". . .":"Comment"}
//             </button>
//             </motion.div>
//         </form>
//     </div>
//     </motion.div>
//   )
// }
