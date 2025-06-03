import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function SearchUserLayout({profilePhoto,username,fullName,userId}) {

    const navigate = useNavigate()
    const searchUser = ()=>{
      navigate(`/profile/${userId}`)
    }
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="your-styles"
    >
    <div onClick={()=>searchUser()} className='lg:ml-20 w-full lg:w-1/2 h-15 my-2 lg:my-5  flex text-white text-xl lg:text-2xl hover:cursor-pointer'>
        <img src={profilePhoto} alt="" className='rounded-full w-11 h-10 lg:w-16 lg:h-15'/>
        <div className='h-full w-full lg:pt-2 my-auto ml-4'>
            <div>{fullName}</div>
            <div className='text-xs lg:text-sm font-bold'>{username}</div>
        </div>
    </div>
    </motion.div>
  )
}
