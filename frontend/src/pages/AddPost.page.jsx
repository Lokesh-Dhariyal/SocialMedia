import { AddPost } from '../features/user/addPost'
import { userAuth } from "../hooks/userAuth"
import { useEffect } from 'react'

export  function AddPostPage() {
  const {fetchUser} = userAuth()
  useEffect(()=>{
      fetchUser()
    },[])
  return (
    <div className='w-full'><AddPost/></div>
  )
}
