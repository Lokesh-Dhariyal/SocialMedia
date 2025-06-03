import { useState,useEffect } from "react"
import { userAuth } from "../hooks/userAuth"
import { LoadingPage } from './Loading.page'
import { PostLayout } from "../components/post/PostLayout"
import { motion } from 'framer-motion'
import { useNavigate, useParams } from "react-router-dom"
import { FollowButton } from "../components/buttons/FollowButton"

export function UserProfilePage() {
    const {user, loading, userPost,findUser,followUser} = userAuth()
    const [fetchedPosts, setFetchedPosts] = useState([])
    const [searchedUser,setSearchedUser] = useState(null)
    const {userId} = useParams()
    const [doesFollow,setDoesFollow] = useState(false)
    const [isfetching,setIsFetching] = useState(false)
    const [followers,setFollowers] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          setIsFetching(true)
          const userInfo = await findUser(userId)
          setSearchedUser(userInfo.data)
          setFollowers(userInfo.data.followerCount)
          const result = await userPost(userId)
            if (result?.data?.length > 0) {
              setFetchedPosts(result.data)
            } else {
              setFetchedPosts([])
          }
          const followers = userInfo.data.followers
          setDoesFollow(followers.includes(user?._id))
          setIsFetching(false)
        }
        fetchData()
      }, [userId,user])
      const sameUser = user?._id?.toString() === userId?.toString();

      const toggleFollow = async()=>{
        try {
          const response = await followUser(userId);
          setDoesFollow(response.data.following);
          setFollowers(response.data.followers);
        } catch (error) {
          console.error("Error toggling follow:", error);
        }
      }

    if (loading || !searchedUser ||!user || isfetching) {
      return <LoadingPage />
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="your-styles"
      >
      <div className='w-19/20 lg:w-11/16 mx-auto h-fit pt-5 mt-15'>
        <div className='mx-5 lg:h-50 flex justify-evenly'>
          <div className='w-1/4'>
            <div className='lg:w-10/13 h-full mx-auto'>
              <img src={searchedUser.profilePhoto} alt="img" className='rounded-full w-full h-20 lg:h-full' />
            </div>
          </div>
          <div className='w-3/4 lg:w-1/2 pl-2 lg:pl-0 flex flex-wrap text-white'>
            <div className='w-full lg:h-14 lg:p-2 flex lg:gap-10'>
              <div className='text-xl lg:text-3xl inline w-1/3'>{searchedUser.username}</div>
              <div hidden={sameUser}><FollowButton doesFollow={doesFollow} onFollowChange={toggleFollow} userId={userId}/></div>
            </div>
            <div className='lg:p-2 w-full lg:h-12 text-sm lg:text-2xl flex justify-between'>
              <div>{searchedUser.postCount} Posts</div>
              <div>{followers} Followers</div>
              <div>{searchedUser.followingCount} Following</div>
            </div>
            <div className='w-full lg:h-23 lg:p-2 text-xs lg:text-xl'>
              <div className="lg:mb-1">{searchedUser.fullName}</div>
              <div>{searchedUser.bio}</div>
            </div>
          </div>
          <button hidden={!sameUser} onClick={()=>{navigate("/settings")}} className="buttonsetting h-2 lg:h-10 opacity-80">
            <svg
              className="svg-icon h-4 w-4 lg:h-8 lg:w-8"
              fill="none"
              height="30"
              viewBox="0 0 20 20"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="white" strokeLinecap="round" strokeWidth="1.5">
                <circle cx="10" cy="10" r="3"></circle>
                <path
                  clipRule="evenodd"
                  d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z"
                  fillRule="evenodd"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        
        <div className=" border-white/10 border w-full mt-2"></div>
  
        <div className="mx-5 mt-3 h-fit">
          {fetchedPosts.map((post, index) => (
            <PostLayout
              key={post._id || index}
              username={searchedUser.username}
              likedBy={post.likes}
              postId={post._id}
              content={post.content}
              description={post.description}
              likesCount={post.likeCount}
              commentCount={post.commentCount}
              createdAt={post.createdAt}
              setting={sameUser}
              userId={searchedUser._id}
              profilePhoto={searchedUser.profilePhoto}
            />
          ))}
        </div>
      </div>
      </motion.div>
    )
  }
