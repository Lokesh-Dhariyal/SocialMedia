import { useEffect, useState } from "react"
import { userAuth } from "../hooks/userAuth"
import { LoadingPage } from "./Loading.page"
import { PostLayout } from "../components/post/PostLayout"

function UserHomePage() {
  const {user,loading,homePage} = userAuth()
  const [allPosts,setAllPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await homePage();
        setAllPosts(result.data.posts);
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };
  
    if (user) {
      fetchPosts();
    }
  }, [user]);
  
  if (loading || !user) {
    return <LoadingPage/>
  }
  return (
    <div className="w-19/20 lg:w-11/16 mx-auto h-fit my-15">
      <div className="mx-5 mt-3 h-fit">
              {allPosts.map((post,index)=>(
                <PostLayout
                key={post._id || index}
                username={post.owner.username}
                postId={post._id}
                likedBy={post.likes}
                content={post.content}
                description={post.description}
                likesCount={post.likeCount}
                commentCount={post.commentCount}
                createdAt={post.createdAt}
                setting={user._id === post.owner._id}
                userId={post.owner._id}
                profilePhoto={post.owner.profilePhoto}
                />
              ))}
      </div>
    </div>
  )
}

export {UserHomePage}