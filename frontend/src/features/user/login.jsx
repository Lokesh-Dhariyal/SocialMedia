import { userAuth } from "../../hooks/userAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitButton } from "../../components/buttons/SubmitButton";
import { motion } from 'framer-motion'

const Login = ()=>{
    const navigate = useNavigate()
    const {login} = userAuth()
    const [formData,setFormData] = useState({
        credentials:"",
        password:""
    })


    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(formData)
        const res = await login(formData)
        console.log(res)
        if(!res.success){
            alert(res.message)
            throw new Error("Something went wrong while login")
        }
        if(res.success){
            navigate("/home")
        }
    }
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    return (
        <>
        <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="your-styles"
      >
            <div className="border border-[#1f1f1f] bg-[#141414] w-22/23 lg:w-4/10 mt-40 lg:mt-40 mx-auto h-120 rounded-2xl lg:rounded-3xl">
                <div className="text-5xl w-11/12 mx-auto mt-10 lg:mt-20 mb-10 text-white">Login</div>
                    <div className="w-11/12 mx-auto mt-5 ">
                        <form onSubmit={handleSubmit}>


                        <div className="relative lg:w-4/5 my-10 lg:my-6">
                            <svg
                                className="w-6 h-6 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a4 4 0 110 8 4 4 0 010-8zm0 10c-4 0-6 2-6 4v2h12v-2c0-2-2-4-6-4z" />
                            </svg>
                            <input
                                type="text"
                                name="credentials"
                                placeholder="Enter username or email"
                                className="w-full pl-12 pr-3 py-2 border text-2xl rounded-lg text-gray-500 focus:border-gray-100 outline-none"
                                onChange={handleChange}
                            />
                        </div>
        
                        <div className="relative lg:w-4/5 my-10 lg:my-6">
                            <button type="button" className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                                onClick={() => setPasswordHidden(!isPasswordHidden)}
                            >
                            {
                                isPasswordHidden ? (
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>

                                )
                            }
                            </button>
                            <input
                                type={isPasswordHidden ? "password" : "text"}
                                name="password"
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pr-12 pl-3 py-2 text-gray-500 text-2xl outline-none border focus:border-gray-100 shadow-sm rounded-lg"
                            />
                        </div>
        
                            <SubmitButton type="submit" className="font-bold">
                                Login
                            </SubmitButton>

                        <div className="text-white my-3 text-lg opacity-60">
                            Dont't have an accout? 
                            <a href="/register" className="mx-1 text-blue-500 hover:text-blue-400">Sign up</a>
                        </div>
                        </form>
                </div>
            </div>
            </motion.div>
        </>
    )

}
export {Login}