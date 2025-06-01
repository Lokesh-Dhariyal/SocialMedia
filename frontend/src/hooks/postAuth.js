import { useContext } from "react";
import { PostContext } from "../features/auth/postContext";

const postAuth = ()=>{
    const context = useContext(PostContext)

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

export { postAuth };