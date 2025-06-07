import React, { useState, useEffect } from 'react';
import { LoadingPage } from './Loading.page';
import { userAuth } from "../hooks/userAuth";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'


export function UserSettingPage() {
  const navigate = useNavigate();
  const { loading, deleteProfilePhoto, updateProfilePhoto,updateUserInfo,changePassword,user,fetchUser,logout,deleteUser } = userAuth();

  useEffect(()=>{
    fetchUser()
  },[])

  const [showUpdateInfo, setShowUpdateInfo] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpdate = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    const formData = new FormData()
    formData.append("profilePhoto", file)
    await updateProfilePhoto(formData)
    setIsUploading(false)
    navigate("/me")
  };

  const handlePhotoDelete = async () => {
    setIsUploading(true);
    try {
      await deleteProfilePhoto();
      navigate("/me")
    } catch (err) {
      console.error("Photo delete failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  // User Info Change/ Update
  const [showUserInfo, setShowUserInfo] = useState(false);

const [formInfo, setFormInfo] = useState({})
useEffect(() => {
    if (user) {
      setFormInfo({
        fullName: user.fullName || "",
        email: user.email || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

const handleInfoChange = (e) => {
  const { name, value } = e.target;
  setFormInfo((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleInfoSubmit = async (e) => {
  e.preventDefault();
  setIsUploading(true);

  try {
    const res = await updateUserInfo(formInfo);
    if (res.success) {
      navigate("/me");
    } else {
      alert(res.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Error updating user info:", error);
    alert("An error occurred while updating. Please try again.");
  } finally {
    setIsUploading(false);
  }
};

    //Password Change
const [showUserPassword, setShowUserPassword] = useState(false);

const [formPassword, setFormPassword] = useState({
    previousPassword:"",
    newPassword:""
})

const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
    console.log("Form password input:", formPassword);
      const res = await changePassword(formPassword);
      if (res.success) {
        navigate("/me");
      } else {
        alert(res.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("An error occurred while updating. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  //Delete User
const [showDeleteUser, setShowDeleteUser] = useState(false);


  if (loading || isUploading || !user) return <LoadingPage />;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="your-styles"
    >
    <div className=" lg:w-1/2 mx-auto mt-15 text-white">
      <div className="border-b border-white/40 w-11/12 mx-auto my-5 p-3">
        <div className="text-xl lg:text-2xl mr-5 mt-2 w-1/2 inline-block">Update/Delete Profile Picture</div>
        <button
          type="button"
          onClick={() => setShowUpdateInfo(!showUpdateInfo)}
          className=" lg:ml-4 h-10 py-2 lg:w-1/4 px-4 bg-[#bdbcbc] hover:bg-[#a8a8a8] text-black rounded-md shadow hover:cursor-pointer"
        >
          Update Photo
        </button>

        {showUpdateInfo && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="your-styles"
          >
          <form onSubmit={handlePhotoUpdate} className="mt-4">
            <div className="grid max-w-xs gap-1.5">
              <label htmlFor="picture" className="text-xl text-gray-400">
                Picture
              </label>
              <input
                id="picture"
                name="content"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="h-12 w-full rounded-md border border-input bg-black px-3 py-3 text-gray-400 file:text-gray-600 file:font-medium"
              />
            </div>

            {file && (
              <button
                type="submit"
                className="mt-4 mr-2 h-10 px-4 bg-[#74b17b] hover:bg-[#5e9a64] text-black rounded-md shadow hover:cursor-pointer"
              >
                Update
              </button>
            )}

            <button
              type="button"
              onClick={handlePhotoDelete}
              className="mt-4 h-10 px-4 bg-[#ec5050] hover:bg-[#d04545] text-black rounded-md shadow hover:cursor-pointer"
            >
              Delete
            </button>
          </form>
          </motion.div>
        )}
      </div>

        {/* Update Info  */}

      <div className="border-b border-white/40 w-11/12 mx-auto my-5 p-3">
      <div className="text-xl lg:text-2xl mr-5 mt-2 w-1/2 inline-block">Update Profile Info</div>
        <button
          type="button"
          onClick={() => setShowUserInfo(!showUserInfo)}
          className="ml-4 h-10 lg:w-1/4 py-2 px-4 bg-[#bdbcbc] hover:bg-[#a8a8a8] text-black rounded-md shadow hover:cursor-pointer"
        >
          Update Info
        </button>
        {showUserInfo && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="your-styles"
          >
            <form onSubmit={handleInfoSubmit} className='mt-4'>
            <label htmlFor="fullName" className='lg:text-2xl'>Full Name :</label>
            <div className="relative w-4/5 mb-3">
                <input
                    type="text"
                    name="fullName"
                    value={formInfo.fullName}
                    className="w-full pl-3 pr-3 py-2 border lg:text-2xl rounded-lg text-gray-500 focus:border-gray-100 outline-none"
                    onChange={handleInfoChange}
                />
            </div>
            <label htmlFor="email" className='lg:text-2xl'>Email :</label>
            <div className="relative w-4/5 mb-3">
                <input
                    type="text"
                    name="email"
                    value={formInfo.email}
                    className="w-full pl-3 pr-3 py-2 text-gray-500 lg:text-2xl outline-none border focus:border-gray-100 shadow-sm rounded-lg"
                    onChange={handleInfoChange}
                />
                </div>

            <label htmlFor="bio" className='lg:text-2xl'>Bio :</label>
            <div className="relative w-4/5 mb-3">
                <input
                    type="text"
                    name="bio"
                    value={formInfo.bio}
                    placeholder="Your Bio"
                    className="w-full pl-3 pr-3 py-2 border lg:text-2xl rounded-lg text-gray-500 focus:border-gray-100 outline-none"
                    onChange={handleInfoChange}
                />
            </div>
            <button
                type="submit"
                className="ml-1 h-10 py-2 px-4 bg-[#74b17b] hover:bg-[#5e9a64] hover:cursor-pointer text-black rounded-md shadow"
                >
                Update
                </button>
            </form>
            </motion.div>
        )}
        
      </div>

        {/* Update Password  */}
      <div className="border-b border-white/40 w-11/12 mx-auto my-5 p-3">
      <div className="text-xl lg:text-2xl lg:mr-5 mt-2 w-1/2 inline-block">Update Password</div>
        <button
          type="button"
          onClick={() => setShowUserPassword(!showUserPassword)}
          className="lg:ml-4 h-10 lg:w-1/4 py-2 px-4 bg-[#bdbcbc] hover:bg-[#a8a8a8] text-black rounded-md shadow hover:cursor-pointer"
        >
          Update Password
        </button>
        {showUserPassword && (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="your-styles"
          >
            <form onSubmit={handlePasswordSubmit} className='mt-4'>
            <label htmlFor="fullName" className='lg:text-2xl'>Current Password :</label>
            <div className="relative w-4/5 mb-3">
                <input
                    type="password"
                    name="previousPassword"
                    className="w-full pl-3 pr-3 py-2 border lg:text-2xl rounded-lg [color-scheme:dark] text-gray-500 focus:border-gray-100 outline-none"
                    onChange={handlePasswordChange}
                    value={formPassword.previousPassword}
                />
            </div>
            <label htmlFor="email" className='lg:text-2xl'>New Password :</label>
            <div className="relative w-4/5 mb-3">
                <input
                    type="password"
                    name="newPassword"
                    className="w-full pl-3 pr-3 py-2 [color-scheme:dark] text-gray-500 lg:text-2xl outline-none border focus:border-gray-100 shadow-sm rounded-lg"
                    onChange={handlePasswordChange}
                    value={formPassword.newPassword}
                />
                </div>
            <button
                type="submit"
                className="ml-1 h-10 py-2 px-4 bg-[#74b17b] hover:bg-[#5e9a64] hover:cursor-pointer text-black rounded-md shadow"
                >
                Change Password
                </button>
            </form>
            </motion.div>
        )}
        
      </div>

      {/* Delete User */}
      <div className='border-b border-white/40 w-11/12 mx-auto my-5 p-3'>
      <div className="text-xl lg:text-2xl lg:mr-5 mt-2 w-1/2 inline-block">Want to delete User</div>
        <button
          type="button"
          onClick={() =>  setShowDeleteUser(!showDeleteUser)}
          className="lg:ml-4 h-10 lg:w-1/4 py-2 px-4 bg-[#ec5050] hover:bg-[#d04545] text-black rounded-md shadow hover:cursor-pointer"
        >
          Delete User
        </button>
        
            {showDeleteUser && (
              <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="your-styles"
            >
          <div className=' mt-3 text-center'>
          <div className='text-xl lg:text-2xl'>Are you sure you want to leave us?</div>
            <button
                type="button"
                onClick={async() =>{
                  await deleteUser()
                  await logout()
                  navigate("/login")
                }}
                className="mt-4 h-10 mx-10 px-4 bg-[#ec5050] hover:bg-[#d04545] text-black rounded-md shadow hover:cursor-pointer"
              >
                Yes
              </button>

            <button
              type="button"
              onClick={() =>  setShowDeleteUser(!showDeleteUser)}
              className="mt-4 mx-10 h-10 px-5 bg-[#74b17b] hover:bg-[#5e9a64] text-black rounded-md shadow hover:cursor-pointer"
            >
              No
            </button>
        </div>
        </motion.div>
        )}
      </div>
    </div>
    </motion.div>
  );
}
