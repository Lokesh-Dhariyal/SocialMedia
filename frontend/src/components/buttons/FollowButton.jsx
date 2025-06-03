import { useState } from "react"
import { userAuth } from "../../hooks/userAuth"

export function FollowButton({doesFollow,onFollowChange}) {
  const [loading,setLoading] = useState(false)
  const follow = async ()=>{
    setLoading(true)
    await onFollowChange()
    setLoading(false)
  }
  return (
    <button onClick={follow} className="cursor-pointer transition-all bg-gray-500 text-white px-2 lg:px-6 py-1 lg:py-2 rounded-lg border-gray-700
        border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
        {loading?(
          <div className="loader mx-auto  w-12 h-6">
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
          <div className="bar4"></div>
          <div className="bar5"></div>
          <div className="bar6"></div>
          <div className="bar7"></div>
          <div className="bar8"></div>
          <div className="bar9"></div>
          <div className="bar10"></div>
          <div className="bar11"></div>
          <div className="bar12"></div>
      </div>
        ):doesFollow?"Following":"Follow"}
    </button>
  )
}
