import { createContext,useState,useEffect, } from "react";
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

    const fetchUser = async()=>{
        try {
            const res = await axios.get("/user/me");
            setUser(res.data.data);
          } catch (error) {
            console.error("Fetch user error:", error.response?.data || error.message);
            setUser(null);
          }finally {
            setLoading(false);
          }
    }

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
        <AuthContext.Provider value={{user,loading,isAuthenticated,register,login,fetchUser,logout,updateToken}}>
            {children}
        </AuthContext.Provider>
    )
}

