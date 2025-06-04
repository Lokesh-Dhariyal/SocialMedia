import {LoadingPage} from "../../pages/Loading.page"
import {userAuth} from "../../hooks/userAuth"
import { SearchUserLayout } from "../../components/SearchUserLayout"
import { useEffect, useState } from "react"
import { motion } from 'framer-motion'

export function SearchUser() {
    const {loading,searchUser} = userAuth()
    const [searchValue,setSearchValue] = useState("")
    const [results,setResults] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await searchUser({"search":searchValue.toString()});
                setResults(result.data || []);
                // console.log("Initial errors are due to search field empty")
            } catch (err) {
                console.error("Search error:", err);
            }
        };
        
        fetchUsers();
        
      }, [searchValue]);
      if (loading) {
          return <LoadingPage/>
        }
  return (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="your-styles"
                >
        <div className=" lg:w-1/2 mx-auto h-fit lg:pt-5 pt-5 mt-15 lg:mt-20">
            <div className="search w-10/11 lg:w-fit mx-auto">
                <input onChange={(e) => setSearchValue(e.target.value.toString())}
                placeholder="Search" className="search__input w-100 h-12 text-xl" type="text" />
                <button className="search__button">
                    <svg
                    viewBox="0 0 16 16"
                    className="bi bi-search"
                    fill="currentColor"
                    height="16"
                    width="16"
                    color="white"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                    ></path>
                    </svg>
                </button>
            </div>

            <div className="h-fit lg:p-5 w-11/12 lg:w-4/5 mx-auto"> 
                {results.map((userr,index)=>(
                    <SearchUserLayout
                    key={userr._id || index}
                    userId={userr._id}
                    username={userr.username}
                    fullName={userr.fullName}
                    profilePhoto={userr.profilePhoto}
                    />
                ))}
            </div>
        </div>
        </motion.div>
    )
}
