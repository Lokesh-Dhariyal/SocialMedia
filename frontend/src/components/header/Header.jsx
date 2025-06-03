import { useEffect, useRef, useState } from 'react'
import { userAuth } from "../../hooks/userAuth"
import {useNavigate }  from 'react-router-dom'

export const Header = () => {

    const {isAuthenticated,logout,user,loading} = userAuth()
    // const userProfilePhoto = user.profilePhoto


    const navigate = useNavigate()
    const logoutButton = async()=>{
        await logout()
        navigate("/login")
    }

  const navigation = [
      { title: "Home", path: "/home" },
      { title: "Search", path: "/search" },
      { title: "Add Post", path: "/addpost" },
  ]


  return (
      <nav className="bg-[#000000] border-b border-white/40 w-full h-15 top-0 z-20 font-medium fixed">
          <div className="items-center w-22/23 lg:w-11/12 mx-auto flex h-15">
              <div className="items-center justify-between block">
                    <a href="/" className='flex text-white font-Cookie'>
                        <img
                            src="/logo.png" 
                            width={120} 
                            height={50}
                            alt="Float UI logo"
                            className='w-9 h-9 lg:w-12 lg:h-12 mt-2 lg:mt-1'
                        />
                        <div className='hidden sm:block text-xl lg:text-3xl p-2 pt-4 lg:pt-'>Staticgram</div>
                    </a>
              </div>
              <div className={`flex-1 justify-between flex-row-reverse overflow-visible flex  h-10`}>
                    <div>
                        <ul className="flex lg:space-x-7 flex-row">
                            {!loading&&(isAuthenticated?(<>
                                <li className="">
                                        <a href="/me"><img className="mt-1 lg:mt-0 h-9 w-10 lg:h-11 lg:w-12 rounded-full"
                                            src={user.profilePhoto}
                                            alt="userImage1"
                                            /></a>
                                </li>
                                <li className="mt-3 ml-1">
                                    <a onClick={logoutButton} className="py-1 mx-2 lg:mx-0 text-sm lg:text-lg  px-1 lg:py-2 lg:px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] rounded-md shadow inline hover:cursor-pointer">
                                        Logout
                                    </a>
                                    </li>
                                </>
                                ):(<>
                                <li className="mt-3">
                                    <a href="/login" className=" py-2 px-1 lg:px-4 text-center text-[#bdbcbc] hover:text-[#a8a8a8] rounded-md inline border-0">
                                        Login
                                    </a>
                                </li>
                                <li className="mt-3">
                                    <a href="/register" className="py-1 mx-3 lg:mx-0  px-1 lg:py-2 lg:px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] lg:rounded-md shadow inline">
                                        Sign Up
                                    </a>
                                </li>

                                <li className="mt-2 lg:mt-1">
                                <a href="https://www.lokeshdhariyal.me/" target="_blank"  className=" border-l border-white/40 font-Cookie lg:text-3xl pl-1 lg:pl-2 pt-3 text-center text-[#bdbcbc] hover:text-[#a8a8a8]">
                                        Portfolio
                                    </a>
                                </li></>))}
                        </ul>
                    </div>
                    <div className="text-sm lg:text-lg lg:pl-25 flex-1 pt-5 font-bold lg:pt-3">
                        <ul className="justify-center flex space-x-2 lg:space-x-10 ">
                            {   isAuthenticated?navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className="text-[#bdbcbc] hover:text-[#a8a8a8]">
                                            <a href={item.path}>
                                                { item.title }
                                            </a>
                                        </li>
                                    )
                                })
                                :null
                            }
                        </ul>
                    </div>
              </div>
          </div>
      </nav>
  )
}