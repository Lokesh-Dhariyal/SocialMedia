import { userAuth } from '../hooks/userAuth'
import { Login } from '../features/user/login'
import { useEffect } from 'react'

function UserLoginPage() {
  const {fetchUser,updateToken} = userAuth()
  useEffect(()=>{
    fetchUser()
  },[])
  return (
      <div>
        <Login/>
      </div>
  )
}

export {UserLoginPage}