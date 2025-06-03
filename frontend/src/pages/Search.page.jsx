import { SearchUser } from "../features/user/searchUser"
import { userAuth } from "../hooks/userAuth"
import { useEffect } from "react"

export function SearchPage() {
  const {fetchUser} = userAuth()
  useEffect(()=>{
      fetchUser()
    },[])
  return (
    <div><SearchUser/></div>
  )
}
