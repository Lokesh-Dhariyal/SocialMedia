import { createContext,useState,useEffect,useCallback } from "react";
import axios from "./axios.js";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const isAuthenticated = !!user

    const [loading,setLoading] = useState(true)

    const register = async(formData)=>{
        try {
            const res = await axios.post("/user/register",formData)
            await fetchUser()
            return res.data
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
        }
    }
    const login = async(formData)=>{
        try {
            const res = await axios.post("/user/login",formData)
            await fetchUser()
            return res.data
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
        }
    }

    const fetchUser = useCallback(async () => {
        try {
          const res = await axios.get("/user/me")
          setUser(res.data.data)
        } catch (error) {
          console.error("Fetch user error:", error.response?.data || error.message)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }, [])

    const logout = async()=>{
        try {
            await axios.post("/user/logout")
            setUser(null)
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
        }
    }

    const updateToken = async()=>{
        try {
            const res = await axios.post("/user/update-token")
            return res.data
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
        }
    }
    const findUser = async(userId)=>{
        try {
            const res = await axios.get(`/user/profile/${userId}`)
            return res.data
        } catch (error) {
            return { success: false, message: error.response?.data?.message || error.message }
        }
    }
    
    const userPost = useCallback(async (userId) => {
        try {
          const res = await axios.get(`/user/${userId}/posts`);
          return res.data;
        } catch (error) {
          return { success: false, message: error.response?.data?.message || error.message };
        }
      }, []);

    const searchUser = async(search)=>{
      try {
        const res = await axios.post("/user/search",search)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    const followUser = async(userId)=>{
      try {
        const res = await axios.post(`/user/profile/${userId}/follow`)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    const homePage = async()=>{
      try {
        const res = await axios.get(`/user/home`)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    const updateProfilePhoto = async(formData)=>{
      try {
        const res = await axios.post(`/user/update-profilephoto`,formData)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }
    const deleteProfilePhoto = async()=>{
      try {
        const res = await axios.post(`/user/delete-profilephoto`)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    const updateUserInfo = async(formData)=>{
      try {
        const res = await axios.post(`/user/update-userinfo`,formData)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    const changePassword = async(formData)=>{
      try {
        const res = await axios.post(`/user/change-password`,formData)
        return res.data
      } catch (error) {
        return { success: false, message: error.response?.data?.message || error.message };
      }
    }

    useEffect(() => {
        const initAuth = async () => {
          try {
            await updateToken();
            await fetchUser();
          } catch (err) {
            console.error("Auto-login failed:", err);
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
      
        initAuth();
      }, []);
    return (
        <AuthContext.Provider value={{user,loading,isAuthenticated,register,login,fetchUser,logout,updateToken,findUser,userPost,searchUser,followUser,homePage,updateProfilePhoto,deleteProfilePhoto,updateUserInfo,changePassword}}>
            {children}
        </AuthContext.Provider>
    )
}

