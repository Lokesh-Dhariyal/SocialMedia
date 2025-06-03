import {Register} from "../features/user/register.jsx"
import { userAuth } from "../hooks/userAuth"
import { useEffect } from "react"

export const UserRegisterPage = ()=>{
    const {fetchUser} = userAuth()
  useEffect(()=>{
    fetchUser()
  },[])
    return (
        <>
            <div>
                <Register/>
            </div>
        </>
    )
}