import {useState} from 'react'
import { postAuth } from '../../hooks/postAuth'
import { useNavigate } from 'react-router-dom'
export function PostSetting({postId}) {

    const {deletePost} = postAuth()
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    const PostDelete = async()=>{
        setLoading(true)
        await deletePost(postId)
        setLoading(false)
        navigate(0)
    }

  return (
        <label className="popup">
            <input type="checkbox"/>
            <div className="burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className="popup-window">
            <legend className='text-xs px-4'>Setting</legend>
                <ul>
                <hr/>
                    <li>
                        <button onClick={PostDelete} disabled={loading} className='h-5 w-20 lg:h-8 lg:w-30'>
                            <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" stroke="currentColor" fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                                <line y2="18" x2="6" y1="6" x1="18"></line>
                                <line y2="18" x2="18" y1="6" x1="6"></line>
                            </svg>
                        <span>{loading?"Loading..":"Delete"}</span>
                        </button>
                    </li>
                </ul>
    </nav>
    </label>
  )
}
