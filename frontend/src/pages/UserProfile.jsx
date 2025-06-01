import { useEffect, useState } from "react"
import { userAuth } from "../hooks/userAuth"
import { LoadingPage } from './loading.page'
import { PostLayout } from "../components/post/PostLayout"
import { postAuth } from "../hooks/postAuth"

export function UserProfile() {
  const { user, loading } = userAuth()
  const { fetchPost } = postAuth()
  const [fetchedPosts, setFetchedPosts] = useState([])
 
  useEffect(() => {
    const fetchAllPosts = async () => {
      const results = await Promise.all(
        user.posts.map((post) => fetchPost(post))
      )
      setFetchedPosts(results)
    }
    if (user?.posts?.length > 0) {
      fetchAllPosts()
    }
  }, [user])



  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className='w-2/3 mx-auto h-fit pt-5'>
      <div className='mx-5 h-50 flex justify-evenly'>
        <div className='w-1/4'>
          <div className='w-10/13 h-full mx-auto'>
            <img src={user.profilePhoto} alt="img" className='rounded-full w-full h-full' />
          </div>
        </div>
        <div className='w-1/2 flex flex-wrap text-white'>
          <div className='w-full h-14 p-2 flex gap-10'>
            <div className='text-3xl inline'>{user.username}</div>
          </div>
          <div className='p-2 w-full h-12 text-2xl flex justify-between'>
            <div>{user.postCount} Posts</div>
            <div>{user.followerCount} Followers</div>
            <div>{user.followingCount} Following</div>
          </div>
          <div className='w-full h-23 p-2 text-xl'>
            <div className="mb-1">{user.fullName}</div>
            <div>{user.bio}</div>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-3 h-fit">
        {fetchedPosts.map((post, index) => (
          <PostLayout
            key={post.data._id || index}
            username={user.username}
            likedBy={post.data.likes}
            postId={post.data._id}
            content={post.data.content}
            description={post.data.description}
            likesCount={post.data.likeCount}
            commentCount={post.data.commentCount}
            createdAt={post.data.createdAt}
          />
        ))}
      </div>
    </div>
  )
}
