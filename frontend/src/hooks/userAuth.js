import { useContext } from "react";
import { AuthContext } from "../features/auth/authContext";

const userAuth = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

export {userAuth}