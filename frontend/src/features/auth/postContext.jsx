import { createContext,useState,useEffect, } from "react";
import axios from "./axios.js";

export const PostContext = createContext()

export const PostProvider = ({children})=>{
    
    const uploadPost = async(formData)=>{
        try {
            const res = await axios.post(`/post/create-post`,formData)
            return res.data
        } catch (error) {
            console.error("Fetch user error:", error.response?.data || error.message);
        }
    }

    const commentOnPost = async(postId,formData)=>{
        try {
            const res = await axios.post(`/post/${postId}/comment`,formData)
            return res.data
        } catch (error) {
            console.error("Fetch user error:", error.response?.data || error.message);
        }
    }

    const fetchPost = async(postId)=>{
        try {
            const res = await axios.get(`/post/${postId}`)
            return res.data
        } catch (error) {
            console.error("Fetch user error:", error.response?.data || error.message);
        }
    }

    const likePost = async(postId)=>{
        try {
            const res = await axios.post(`/post/${postId}/like`)
            return res.data
        } catch (error) {
            console.error("Fetch user error:", error.response?.data || error.message);
        }
    }

    const deletePost = async(postId)=>{
        try {
            const res = await axios.post(`/post/delete-post/${postId}`)
            return res.data
        } catch (error) {
            console.error("Fetch user error:", error.response?.data || error.message);
        }
    }

    return (
        <PostContext.Provider value={{commentOnPost, fetchPost, likePost,uploadPost,deletePost}}>
            {children}
        </PostContext.Provider>
    )
}

