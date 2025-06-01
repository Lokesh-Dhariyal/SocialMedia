import { userAuth } from "../hooks/userAuth"
import { LoadingPage } from "./loading.page"

function UserHome() {
  const {loading} = userAuth()
  
      if (loading) {
          return <LoadingPage/>
        }
  return (
    <div> Your Home</div>
  )
}

export {UserHome}