import { useNavigate } from "react-router-dom"
import {postAuth} from "../../hooks/postAuth"
import { useState,useRef} from "react"

export function AddPost() {

    const navigate = useNavigate()

    const {uploadPost} = postAuth()
    const [description,setDescription] = useState("")
    const [file, setFile] = useState(null)

    const [isUploading,setIsUploading] = useState(false)

    const fileInputRef = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsUploading(true)
        const formData = new FormData()
        formData.append("content", file)
        formData.append("description", description)
    
        await uploadPost(formData)
        setDescription("")
        setFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
        setIsUploading(false)
      }

  return (
    <div className="border-b border-white/30 w-4/6 mx-auto mt-70 pl-5 pb-5">
        
            <div className="text-3xl font-bold text-white h-15 w-1/2 ">
                Upload your file And description
            </div>

        <form action="">
            <div className="grid w-full max-w-xs items-center gap-1.5 ">
                <label className="text-xl mb-2 text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Picture</label>
                <input 
                name="content"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files[0])}
                id="picture" 
                type="file" 
                className="flex h-15 w-full rounded-md border border-input bg-black px-3 py-3 text-xl text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"/>
            </div>

            <div className="w-full flex">
            <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="write post description"
                className="w-full my-5 h-10 pr-3 pl-3 py-2 text-gray-500 text-xl border focus:border-gray-100 shadow-sm rounded-lg"
            />
            <button
            type="submit"
            onClick={handleSubmit}
            className="w-60 h-10 my-5 ml-10 mr-60 py-2 px-4 text-center text-black bg-[#bdbcbc] hover:bg-[#a8a8a8] hover:cursor-pointer rounded-md shadow inline">
                {isUploading ? "Uploading..." : "Post"}
            </button>
            </div>
        </form>
    </div>
  )
}
