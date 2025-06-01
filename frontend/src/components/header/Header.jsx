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

  const [state, setState] = useState(false)
  const navRef = useRef()

  // Replace javascript:void(0) path with your path
  const navigation = [
      { title: "Home", path: "/home" },
      { title: "Search", path: "javascript:void(0)" },
      { title: "Add Post", path: "/addpost" },
  ]


  return (
      <nav ref={navRef} className="bg-[#000000] border-b border-white/40 w-full h-15 top-0 z-20 font-medium fixed">
          <div className="items-center px-4 max-w-screen-xl mx-auto flex">
              <div className="items-center justify-between block">
                    <a href="/">
                        <img
                            src="https://www.floatui.com/logo.svg" 
                            width={120} 
                            height={50}
                            alt="Float UI logo"
                        />
                    </a>
              </div>
              <div className={`flex-1 justify-between flex-row-reverse overflow-visible flex  h-10`}>
                    <div>
                        <ul className="flex space-x-0 lg:space-x-6 flex-row">
                            {!loading&&(isAuthenticated?(<>
                                
                                <li className="">
                                        <a href="/me"><img className="h-12 w-12 rounded-full"
                                            src={user.profilePhoto}
                                            alt="userImage1"
                                            /></a>
                                </li>
                                <li className="mt-3 ml-1">
                                    <a onClick={logoutButton} className="py-2 px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] hover:cursor-pointer rounded-md shadow inline">
                                        Logout
                                    </a>
                                    </li>
                                </>
                                ):(<><li className="mt-3">
                                    <a href="/login" className="py-2 px-4 text-center text-[#bdbcbc] hover:text-[#a8a8a8] rounded-md inline border-0">
                                        Login
                                    </a>
                                </li>
                                <li className="mt-3">
                                    <a href="/register" className="py-2 px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] rounded-md shadow inline">
                                        Sign Up
                                    </a>
                                </li></>))}
                        </ul>
                    </div>
                    <div className="flex-1 pt-3">
                        <ul className="justify-center items-center flex space-x-6 space-y-0">
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